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
| bulgaro-suspensao | 270 | 38 | 0 | 2 |
| extensao-triceps-peso-corpo | 273 | 34 | 0 | 5 |
| flexao | 225 | 34 | 0 | 6 |
| flexao-bola | 246 | 36 | 0 | 2 |
| flexao-elastico | 225 | 37 | 0 | 6 |
| flexao-fechada | 225 | 34 | 0 | 6 |
| flexao-joelho-deslizante | 288 | 32 | 0 | 1 |
| flexao-joelho-elastico | 270 | 36 | 0 | 3 |
| flexao-joelho-suspensao | 288 | 33 | 0 | 2 |
| flexao-pes-elevados | 255 | 36 | 0 | 7 |
| goblet | 279 | 34 | 0 | 3 |
| pike | 225 | 34 | 0 | 2 |
| ponte-gluteo | 282 | 36 | 0 | 1 |
| ponte-gluteo-halter | 282 | 37 | 0 | 2 |
| ponte-kettlebell | 282 | 37 | 0 | 1 |
| puxada-unilateral | 240 | 34 | 0 | 4 |
| remada-suspensao | 279 | 39 | 0 | 2 |
| rosca-suspensao | 255 | 38 | 0 | 2 |
| stiff | 285 | 36 | 0 | 2 |
| stiff-elastico | 285 | 35 | 0 | 2 |
| stiff-kettlebell | 285 | 36 | 0 | 2 |
| stiff-unilateral | 291 | 36 | 0 | 2 |
| supino-reto | 291 | 33 | 0 | 2 |
| triceps-suspensao | 243 | 38 | 0 | 1 |
| yt-suspensao | 279 | 38 | 0 | 2 |

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

270 quadros conferidos. 0 falha(s), 2 aviso(s).

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
| Amplitudes | flexão plantar do tornozelo | 52° | média 56,7°, máximo observado 90° (cdc) | ok |
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
| Ficha | o peso fica na perna da frente (consenso) | o centro de massa (corpo + carga) fica de 60,9% a 63,7% do caminho entre o tornozelo de trás e o da frente | como a ficha pede | ok |
| Ficha | o peito do pé de trás fica no berço da alça, com o cadarço para baixo (consenso) | o peito do pé de trás fica a no máximo 0 cm do fundo do berço, com a sola para cima | como a ficha pede | ok |
| Ficha | a alça fica na altura do meio da canela (consenso) | o fundo do berço fica de 28,3 a 28,3 cm do chão (o meio da canela do corpo: 28,3 cm; o fabricante: 20,3 a 30,5 cm) | como a ficha pede | ok |
| Ficha | na descida, o pé de trás vai para trás com a fita, que não estica (consenso) | na descida, o pé de trás anda 6,7 cm para trás e -0,2 cm para cima; da âncora ao fundo do berço, de 154,6 a 154,7 cm | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.tornozeloAtrasDoQuadril, fita.alcaAFrenteDaAncora, fita.peVaiParaTras, fita.contatoAteOTornozelo, fita.flexaoPlantarEmCima, fita.bercoFolga, fita.giroDaFita, maos.naCintura.acima | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
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

246 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 6 a 90; cotovelo 21 a 25; quadril 8 a 11; ombro 47 a 66; dorsiflexao -62 a -0; punho 20 a 23; pronacao -13 a -12; clavicula 12 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 90° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 24,7° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 11,1° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 66° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 61,8° | média 56,7°, máximo observado 90° (cdc) | AVISO |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 12,9° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 22,8° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,3 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,3 cm (Quadril encosta no chão na volta) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 8,1% da velocidade de pico (joelho direito, Puxada · concêntrica); pico de 98 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | começo: ombros, quadril e calcanhares em linha (consenso) | no começo, ombro, quadril e calcanhar fazem 180° de lado (180° = linha reta) | como a ficha pede | ok |
| Ficha | fim: ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 170,8° (180° = em linha); o joelho dobra 90° | como a ficha pede | ok |
| Ficha | fim: joelhos a ~90° (consenso) | no fim, o joelho dobra 90° | como a ficha pede | ok |
| Ficha | a puxada sobe ainda mais o quadril (consenso) | o centro da pelve sobe de 28,2 para 52,2 cm do chão | como a ficha pede | ok |
| Ficha | o quadril não encosta no chão (consenso) | o ponto mais baixo da bacia fica a no mínimo 16,8 cm do chão | como a ficha pede | ok |
| Ficha | deitado de costas: as costas e a cabeça ficam apoiadas no chão, e os ombros não escorregam (consenso) | o ponto mais baixo das costas e da nuca fica de -0,3 a 0,2 cm do chão e o da cabeça de 0 a 0 cm; o ombro anda 0,2 cm na direção do corpo | como a ficha pede | ok |
| Ficha | calcanhares em cima da bola no começo; pés apoiados em cima dela no fim (consenso) | o pé fica de 0,9 a 1,4 cm para dentro da superfície da bola (a bola cede um pouco) | como a ficha pede | ok |
| Ficha | coxas e canelas não atravessam a bola (consenso) | nenhum ponto das pernas entra na bola | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | bracos.alcance, pe.afundaNaBola, ombro.z, bola.alemDoCalcanhar | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | quina: 85 cm² (padrão); de lado: 67 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

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
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,4 cm (Cotovelos abertos para os lados) | não pode passar de −1,5 cm | ok |
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

288 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 10 a 120; cotovelo 17 a 19; quadril -7 a 10; ombro 18 a 32; dorsiflexao -0 a 0; punho 9 a 10; pronacao -15 a -14; clavicula 11 a 12.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 120° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 18,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 9,6° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 7,4° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 32,3° | média 170°, máximo observado 192° (cdc) | ok |
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
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7,6% da velocidade de pico (quadril, Puxada · concêntrica); pico de 68,9 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o quadril fica fora do chão o tempo todo (consenso) | a pele do glúteo fica de 5 a 19,5 cm do chão | como a ficha pede | ok |
| Ficha | os ombros ficam no chão, sem sair do lugar, e a cabeça apoiada (consenso) | o ponto mais baixo das costas fica de 0 a 0,4 cm do chão e o da cabeça de 0 a 0 cm; o centro do ombro anda 1,8 cm | como a ficha pede | ok |
| Ficha | com os joelhos dobrados, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 176,8° (180° = em linha); o joelho dobra 120° | como a ficha pede | ok |
| Ficha | os calcanhares deslizam na toalha: ficam apoiados nela e andam para perto do glúteo (consenso) | o pé fica de 0 a 0 cm do tampo da toalha; o calcanhar desliza 64,7 cm na direção do corpo (0 cm para o lado) e termina 28,5 cm à frente do centro do quadril | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.fim, quadril.folgaNoInicio, ombro.z, maos.abaixoDoOmbro, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 67 cm² (padrão); quina: 41 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Flexão de joelho com elástico (`flexao-joelho-elastico`)

270 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 12 a 115; cotovelo 121 a 121; quadril -3 a -3; ombro 161 a 161; dorsiflexao -55 a -55; punho 34 a 34; pronacao 18 a 18; clavicula 17 a 17.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 115° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 121,4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | -2,7° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 2,7° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 160,6° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -55° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 55° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 18,3° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 33,8° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pelve | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,1 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,1 cm (Quadril sobe do chão) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | elástico: quanto estica no ciclo (1 = comprimento em repouso) | de 1,2 a 2,2 vezes (146,3 a 264,8 cm); em cima, 1,2 vezes | nunca frouxo (1 ou mais), mais esticado em cima e nunca além de 3 vezes (o máximo do fabricante) | AVISO |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 0% da velocidade de pico (sem movimento); pico de 0 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | deitado de bruços, o quadril encostado no colchonete e a testa apoiada nos braços (consenso) | de bruços; a bacia fica de 0 a 0 cm do tampo do colchonete e o peito de -1,4 a -1,4 cm; a testa fica de 0 a 0 cm do alto das mãos | como a ficha pede | ok |
| Ficha | no fim, joelhos bem dobrados, calcanhares em direção ao glúteo (consenso) | no fim, o joelho dobra 115° e o calcanhar fica 43,7 cm acima do chão | como a ficha pede | ok |
| Ficha | o elástico estica mais com os joelhos dobrados e já está um pouco esticado com as pernas estendidas (consenso) | o elástico estica 1,2 vez com as pernas estendidas e 2,2 vezes no fim (de 1,2 a 2,2 no caminho) | como a ficha pede | ok |
| Ficha | as pontas do elástico ficam em volta dos dois tornozelos, por trás, logo acima do calcanhar (consenso) | o tubo sai da fita do pegador de 6,6 a 6,6 cm atrás do centro do tornozelo e de 4 a 4 cm acima dele, ao longo da canela | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.fim, tornozelo.flexaoPlantar, lombar.deitado, escapulas.protracao, testa.altura, maos.meiaDistancia, colchonete.z, elastico.noQuadro, ancora.altura | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de cima: 645 cm² (padrão); de lado: 67 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão de joelho na suspensão (`flexao-joelho-suspensao`)

288 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 10 a 110; cotovelo 27 a 31; quadril 10 a 12; ombro 23 a 52; dorsiflexao -0 a 0; punho 15 a 16; pronacao -14 a -13; clavicula 11 a 12.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 110° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 31,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 12° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 52,3° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 14,4° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 16,2° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,2 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,2 cm (Quadril encosta no chão) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita: não estica | comprimento de 151,3 a 151,3 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 20,2% da velocidade de pico (cabeça, Puxada · concêntrica); pico de 87,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o quadril fica fora do chão o tempo todo (consenso) | a pele do glúteo fica de 6,5 a 34,3 cm do chão | como a ficha pede | ok |
| Ficha | os ombros ficam no colchonete, sem sair do lugar, e a cabeça apoiada (consenso) | o ponto mais baixo das costas (ou da base da nuca) fica de -0,1 a 0,2 cm do tampo do colchonete e o da cabeça de 0 a 0 cm; o centro do ombro escorrega 0,2 cm e sobe 4,1 cm (a escápula rola) | como a ficha pede | ok |
| Ficha | com os joelhos dobrados, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 171° (180° = em linha); o joelho dobra 110° | como a ficha pede | ok |
| Ficha | os calcanhares nos berços da fita, que pende da âncora sobre os pés: no início os pés ficam embaixo da âncora, e os calcanhares andam num arco em volta da âncora até perto do glúteo (consenso) | o pé passa do fundo do berço de -0,6 a 0,7 cm (positivo = o pé sai do berço, para longe da âncora); no início a fita fica a 9,4° do prumo da âncora e o berço a 33,9 cm do chão; o calcanhar anda 55,3 cm na direção do corpo e sobe 1,1 cm, sempre de 151,3 a 151,3 cm da âncora (em linha reta), e termina 45,7 cm à frente do centro do quadril | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.fim, quadril.folgaNoInicio, quadril.fim, pe.angulo, fita.ancoraParaACabeca, fita.tronco, ombro.z, colchonete.z, maos.alcance, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 67 cm² (padrão); quina: 55 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Flexão com os pés elevados (`flexao-pes-elevados`)

255 quadros conferidos. 0 falha(s), 7 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 125; quadril 2 a 2; ombro 52 a 82; dorsiflexao 27 a 27; punho 60 a 93; pronacao 40 a 42; clavicula 12 a 14.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 4° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 125,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 81,5° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 27° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 42,4° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 93° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 80,3° | média 70°, máximo observado 90° (aaos) | AVISO |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril caído ou alto demais) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 15,4% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 66,4 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito quase toca o chão (consenso) | embaixo, o peito fica a 8,5 cm do chão | como a ficha pede | ok |
| Ficha | cotovelos a ~45° do corpo (consenso) | embaixo, o braço faz 50,4° com o tronco, visto de cima | como a ficha pede | ok |
| Ficha | pés no apoio firme, sem sair do lugar (consenso) | o ponto mais baixo dos pés fica de 0 a 0 cm do tampo do apoio | como a ficha pede | ok |
| Ficha | a cabeça fica abaixo do quadril, sem bater no chão (consenso) | embaixo, o ponto mais baixo da cabeça fica a 5 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.abaixoDoOmbro, tornozelo.dorsiflexao, escapula.retracaoEmbaixo, pes.daBordaDoBanco, banco.pontaNoQuadro, pescoco.extensao, cabeca.extensao, cabeca.aoChao, pescoco.extensaoEmbaixo | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
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

225 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 5 a 5; cotovelo 10 a 98; quadril 91 a 105; ombro 88 a 140; dorsiflexao -5 a 13; punho 61 a 71; pronacao 33 a 41; clavicula 14 a 16.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 5° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 97,5° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 105° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 140,2° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 12,6° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 5,5° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 41,1° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 71° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 35° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril desce e vira flexão) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 12,9% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 49,4 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o quadril continua alto: fica acima dos ombros e os ombros não passam à frente das mãos (consenso) | o quadril fica no mínimo 31,4 cm acima dos ombros; os ombros ficam no mínimo 1,2 cm atrás do centro das palmas; a flexão do quadril vai de 105° a 90,8° | como a ficha pede | ok |
| Ficha | embaixo, a cabeça fica perto do chão, sem encostar, na linha das mãos e entre elas (consenso) | embaixo, o ponto mais baixo da cabeça fica a 5 cm do chão, 13,2 cm à frente da linha dos punhos (a ponta dos dedos fica a 19,2), entre as mãos; no caminho, nunca abaixo de 5 cm | como a ficha pede | ok |
| Ficha | pernas estendidas o ciclo inteiro (consenso) | os joelhos dobram de 5° a 5° | como a ficha pede | ok |
| Ficha | cotovelos para trás, a meio caminho entre o tronco e os lados (consenso) | embaixo, o plano do braço abre 48,3° do plano do meio do corpo; o cotovelo aponta para trás (para os pés) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.aFrenteDosPes, calcanhar.sobe, quadril.cima, cabeca.aoChao, cabeca.naLinhaDasMaos, pescoco.flexao | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: ombro_anterior; secundário: ombro_lateral, triceps) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | quina: 60 cm² (padrão); de lado: 52 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Ponte de glúteo (`ponte-gluteo`)

282 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 116 a 134; cotovelo 27 a 28; quadril 0 a 55; ombro 23 a 35; dorsiflexao -16 a 0; punho 10 a 11; pronacao -14 a -14; clavicula 11 a 12.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 133,6° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 27,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 54,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 35,5° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 16,5° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 14,4° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 11,2° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,2 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,2 cm (Arquear a lombar no topo) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7% da velocidade de pico (quadril, Subida · concêntrica); pico de 30,8 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso) | o ponto mais baixo das costas fica de 0 a 0,4 cm do chão e o da cabeça de 0 a 0 cm; o centro do ombro anda 2 cm | como a ficha pede | ok |
| Ficha | embaixo, o quadril quase encosta no chão (consenso) | embaixo, a pele do glúteo fica a 1,5 cm do chão | como a ficha pede | ok |
| Ficha | em cima, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 180° (180° = em linha); o joelho dobra 116,2° | como a ficha pede | ok |
| Ficha | sem arquear a lombar no topo (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | empurra pelos calcanhares: o pé inteiro fica no chão (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão e o calcanhar (o ponto do osso) de 0 a 0 cm | como a ficha pede | ok |
| Ficha | pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso) | embaixo, o calcanhar fica a 15,4 cm da pele do glúteo; no topo, a canela fica a 0° da vertical; os tornozelos a 16,7 cm um do outro (quadris a 16,7 cm) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | quadril.folgaEmbaixo, ombro.z, maos.alcance, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: gluteos; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 155 cm² (padrão); quina: 115 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Ponte de glúteo com halter (`ponte-gluteo-halter`)

282 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 116 a 134; cotovelo 96 a 99; quadril 0 a 55; ombro 38 a 58; dorsiflexao -16 a 0; punho -0 a 0; pronacao -67 a -31; clavicula 12 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 133,6° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 99,3° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 54,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 57,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 16,5° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 67,4° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,2 cm (Halter rolando) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 16,6 a 16,6 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,8% da velocidade de pico (mão direita, Subida · concêntrica); pico de 37,5 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso) | o ponto mais baixo das costas fica de 0 a 0,4 cm do chão e o da cabeça de 0 a 0 cm; o centro do ombro anda 1,6 cm | como a ficha pede | ok |
| Ficha | embaixo, o quadril quase encosta no chão (consenso) | embaixo, a pele do glúteo fica a 1,5 cm do chão | como a ficha pede | ok |
| Ficha | em cima, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 179,3° (180° = em linha); o joelho dobra 116,2° | como a ficha pede | ok |
| Ficha | sem arquear a lombar no topo (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | empurra pelos calcanhares: o pé inteiro fica no chão (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão e o calcanhar (o ponto do osso) de 0 a 0 cm | como a ficha pede | ok |
| Ficha | pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso) | embaixo, o calcanhar fica a 15,4 cm da pele do glúteo; no topo, a canela fica a 0° da vertical; os tornozelos a 16,7 cm um do outro (quadris a 16,7 cm) | como a ficha pede | ok |
| Ficha | as duas mãos seguram o halter o tempo todo, pelas pontas (consenso) | o centro de cada mão fica a no máximo 0 cm do ponto da carga que ela segura; as duas pegadas a 33 cm uma da outra | como a ficha pede | ok |
| Ficha | o halter deitado de través na dobra do quadril, apoiado (sem atravessar a barriga nem as coxas), sobe e desce com o quadril (consenso) | a carga fica de 0 a 0 cm acima da barriga, do quadril e das coxas (negativo = dentro); o centro dela fica de 26,2 a 26,3 cm do meio dos dois quadris | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | quadril.folgaEmbaixo, ombro.z, maos.naCabeca.acima, maos.naCabeca.diam, maos.poloFora, maos.poloCabeca, maos.alcance, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: gluteos; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 155 cm² (padrão); de cima: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Ponte de glúteo com kettlebell (`ponte-kettlebell`)

282 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 116 a 134; cotovelo 100 a 103; quadril 0 a 55; ombro 18 a 51; dorsiflexao -16 a 0; punho -0 a 0; pronacao -17 a 7; clavicula 11 a 12.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 133,6° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 102,5° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 54,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 50,6° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 16,5° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 6,7° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 16,9° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Arquear a lombar no topo) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: kettlebell | distância da mão ao centro do objeto de 6,1 a 6,2 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 10,5% da velocidade de pico (mão direita, Subida · concêntrica); pico de 63,7 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso) | o ponto mais baixo das costas fica de 0 a 0,4 cm do chão e o da cabeça de 0 a 0 cm; o centro do ombro anda 1,3 cm | como a ficha pede | ok |
| Ficha | embaixo, o quadril quase encosta no chão (consenso) | embaixo, a pele do glúteo fica a 1,5 cm do chão | como a ficha pede | ok |
| Ficha | em cima, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 179,5° (180° = em linha); o joelho dobra 116,2° | como a ficha pede | ok |
| Ficha | sem arquear a lombar no topo (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | empurra pelos calcanhares: o pé inteiro fica no chão (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão e o calcanhar (o ponto do osso) de 0 a 0 cm | como a ficha pede | ok |
| Ficha | pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso) | embaixo, o calcanhar fica a 15,4 cm da pele do glúteo; no topo, a canela fica a 0° da vertical; os tornozelos a 16,7 cm um do outro (quadris a 16,7 cm) | como a ficha pede | ok |
| Ficha | as duas mãos seguram o kettlebell o tempo todo, uma de cada lado da alça (consenso) | o centro de cada mão fica a no máximo 0 cm do ponto da carga que ela segura; as duas pegadas a 12,3 cm uma da outra | como a ficha pede | ok |
| Ficha | o kettlebell deitado de lado sobre o quadril, apoiado (sem atravessar a barriga nem as coxas), sobe e desce com o quadril (consenso) | a carga fica de 0 a 0 cm acima da barriga, do quadril e das coxas (negativo = dentro); o centro dela fica de 26,5 a 26,5 cm do meio dos dois quadris | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | quadril.folgaEmbaixo, ombro.z, kettlebell.tomba, maos.cotoveloNoChao, maos.poloCabeca, maos.alcance, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: gluteos; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 155 cm² (padrão); quina: 115 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

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

## Remada na suspensão (`remada-suspensao`)

279 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 0 a 137; quadril 2 a 2; ombro 9 a 74; dorsiflexao -28 a -5; punho -0 a 0; pronacao 5 a 11; clavicula 10 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 3,9° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 137,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 73,8° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -4,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 28,1° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 10,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Não estender os braços) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita direita: não estica | comprimento de 96,5 a 96,5 cm | não pode variar mais de 0,3 cm | ok |
| Cabos | fita esquerda: não estica | comprimento de 96,5 a 96,5 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 17,3% da velocidade de pico (mão direita, Puxada · concêntrica); pico de 212,5 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto, do calcanhar à cabeça (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177° (180° = linha reta) | como a ficha pede | ok |
| Ficha | calcanhares no chão, parados (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão; a ponta do pé, a 11,3 cm ou mais | como a ficha pede | ok |
| Ficha | as mãos seguram os pegadores o ciclo inteiro (consenso) | o centro da pegada fica a no máximo 0 cm do centro do pegador, com a mão fechada nele | como a ficha pede | ok |
| Ficha | a fita não estica: o corpo sobe enquanto as mãos vêm ao corpo (consenso) | o corpo vai de 55° a 32,7° da vertical (do tornozelo ao ombro) | como a ficha pede | ok |
| Ficha | no fim, as mãos chegam ao lado do peito (consenso) | no fim, a pegada fica 28,3 cm abaixo da base do pescoço (o mamilo fica a 22,1 cm), 17,3 cm à frente da linha da coluna (o peito tem 22,6 cm de fundo) e 16,4 cm do meio do corpo | como a ficha pede | ok |
| Ficha | cotovelos rentes ao corpo (consenso) | no fim, o braço se afasta 14° do lado do tronco | como a ficha pede | ok |
| Ficha | o antebraço fica na linha da fita, que puxa a mão (consenso) | da metade da puxada em diante, o antebraço desvia no máximo 0° da linha da fita | como a ficha pede | ok |
| Ficha | as escápulas se juntam no fim (consenso) | a clavícula vai para trás 11° do começo ao fim (a escápula se junta à coluna) | como a ficha pede | ok |
| Ficha | palmas viradas uma para a outra (consenso) | o antebraço fica de 94,6° a 100,6° (90° = polegar para cima, palmas uma para a outra) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | pes.meiaDistancia, pes.alemDaAncora, pe.pontaSobe, corpo.inicio, maos.polegarParaDentro, pescoco.flexao, braco.fim.atras, escapula.prot.inicio, escapula.retr.fim, escapula.elev.fim | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: costas; secundário: biceps, ombro_posterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de trás: 390 cm² (padrão); de lado: 176 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Rosca na suspensão (`rosca-suspensao`)

255 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 0 a 115; quadril 2 a 2; ombro 74 a 74; dorsiflexao -28 a -9; punho -0 a 0; pronacao -85 a -67; clavicula 13 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 3,9° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 115° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 73,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -8,8° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 28,1° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 85,1° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Cotovelos descem) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita direita: não estica | comprimento de 97,7 a 97,7 cm | não pode variar mais de 0,3 cm | ok |
| Cabos | fita esquerda: não estica | comprimento de 97,7 a 97,7 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,6% da velocidade de pico (mão direita, Subida · concêntrica); pico de 109,9 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto, do calcanhar à cabeça (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 178,4° (180° = linha reta) | como a ficha pede | ok |
| Ficha | calcanhares no chão, parados (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão; a ponta do pé, a 11,3 cm ou mais | como a ficha pede | ok |
| Ficha | as mãos seguram os pegadores o ciclo inteiro (consenso) | o centro da pegada fica a no máximo 0 cm do centro do pegador, com a mão fechada nele | como a ficha pede | ok |
| Ficha | palmas para cima (consenso) | o antebraço fica de 4,9° a 22,9° (0° = palma para cima, supinado) | como a ficha pede | ok |
| Ficha | a fita não estica: o corpo sobe enquanto as mãos vêm à testa (consenso) | o corpo vai de 55,6° a 36,4° da vertical (do tornozelo ao ombro) | como a ficha pede | ok |
| Ficha | os cotovelos ficam altos e parados (consenso) | o braço gira no máximo 0° no tronco; no fim, o cotovelo fica 9,4 cm acima do ombro | como a ficha pede | ok |
| Ficha | no fim, as mãos chegam perto da testa (consenso) | no fim, a pegada fica a 12,4 cm da cabeça, 23,6 cm à frente do centro dela e 4,6 cm acima | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | pes.meiaDistancia, pes.alemDaAncora, pe.pontaSobe, corpo.inicio, maos.polegarParaCima, pescoco.flexao, cotovelo.fim | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: biceps; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Músculos do antebraço aparece como "só ajuda a firmar", fora da lista do conteúdo | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de cima: 141 cm² (padrão); de lado: 51 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Stiff com halteres (`stiff`)

285 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 15; cotovelo 4 a 4; quadril 7 a 112; ombro 17 a 73; dorsiflexao -11 a 1; punho -0 a 0; pronacao 17 a 44; clavicula 11 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 15° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 112,1° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 72,5° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 10,7° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 43,8° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Coluna arredondada) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 12,9% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 144 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a lombar não arredonda (coluna neutra) (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso) | do alto até embaixo, o quadril dobra 104,8° e vai 20,9 cm para trás; o joelho de apoio fica entre 8° e 15° | como a ficha pede | ok |
| Ficha | em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso) | em pé, o quadril dobra 7,3° e o peito fica 1,3° à frente da vertical | como a ficha pede | ok |
| Ficha | os halteres descem rentes às coxas e às canelas, sem atravessar as pernas (consenso) | da carga (ou da mão) à pele da coxa ou da canela, de 0,6 a 3,9 cm na descida | como a ficha pede | ok |
| Ficha | embaixo, os halteres chegam perto do meio da canela (consenso) | embaixo, o centro da pegada fica a 28,2 cm do chão, a 50,9% da canela (0% = tornozelo, 100% = joelho) | como a ficha pede | ok |
| Ficha | o centro de massa (corpo + halteres) fica sobre o meio do pé (consenso) | o centro de massa (corpo + carga) fica a no máximo 0 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.cima, joelho.baixo, maos.meiaDistancia, cotovelo, cotovelo.paraFora, carga.folga, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de três quartos, de trás: 394 cm² (padrão); de lado: 67 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Stiff com elástico (`stiff-elastico`)

285 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 15; cotovelo 4 a 4; quadril 4 a 114; ombro 12 a 70; dorsiflexao -9 a 4; punho -0 a 0; pronacao 20 a 45; clavicula 11 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 15° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 113,9° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 69,5° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 3,8° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 9° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 45° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Coluna arredondada) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | elástico: quanto estica no ciclo (1 = comprimento em repouso) | de 1,1 a 1,9 vezes (133 a 232,1 cm); em cima, 1,9 vezes | nunca frouxo (1 ou mais), mais esticado em cima e nunca além de 3 vezes (o máximo do fabricante) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,7% da velocidade de pico (mão direita, Subida · concêntrica); pico de 151,3 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a lombar não arredonda (coluna neutra) (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso) | do alto até embaixo, o quadril dobra 109,7° e vai 22,8 cm para trás; o joelho de apoio fica entre 8° e 15° | como a ficha pede | ok |
| Ficha | em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso) | em pé, o quadril dobra 4,2° e o peito fica 1,3° à frente da vertical | como a ficha pede | ok |
| Ficha | as mãos descem rentes às coxas e às canelas, sem atravessar as pernas (consenso) | da carga (ou da mão) à pele da coxa ou da canela, de 0,8 a 3,5 cm na descida | como a ficha pede | ok |
| Ficha | o centro de massa (corpo) fica sobre o meio do pé (consenso) | o centro de massa (corpo + carga) fica a no máximo 0 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.cima, joelho.baixo, maos.meiaDistancia, cotovelo, cotovelo.paraFora, carga.folga, mao.raio, elastico.voltaNaMao, elastico.folgaNaPerna | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de três quartos, de trás: 406 cm² (padrão); de lado: 67 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Stiff com kettlebell (`stiff-kettlebell`)

285 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 15; cotovelo 4 a 4; quadril 6 a 105; ombro 21 a 68; dorsiflexao -10 a 2; punho -0 a 0; pronacao 24 a 46; clavicula 11 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 15° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 105,3° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 68,4° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 1,6° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 10,2° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 46° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Coluna arredondada) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: kettlebell | distância da mão ao centro do objeto de 6,1 a 6,2 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,2% da velocidade de pico (mão direita, Subida · concêntrica); pico de 131,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a lombar não arredonda (coluna neutra) (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso) | do alto até embaixo, o quadril dobra 99° e vai 21,7 cm para trás; o joelho de apoio fica entre 8° e 15° | como a ficha pede | ok |
| Ficha | em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso) | em pé, o quadril dobra 6,4° e o peito fica 1,3° à frente da vertical | como a ficha pede | ok |
| Ficha | o kettlebell desce perto das pernas, sem bater nas canelas, sem atravessar as pernas (consenso) | da carga (ou da mão) à pele da coxa ou da canela, de 1,6 a 3,7 cm na descida | como a ficha pede | ok |
| Ficha | o kettlebell não bate nas pernas nem nos pés (segurança: segurar firme e não deixar o kettlebell bater nas canelas) (consenso) | embaixo, a carga fica a 5,2 cm da pele do pé | como a ficha pede | ok |
| Ficha | o centro de massa (corpo + kettlebell) fica sobre o meio do pé (consenso) | o centro de massa (corpo + carga) fica a no máximo 0 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.cima, joelho.baixo, maos.embaixo, cotovelo, cotovelo.paraFora, carga.folga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de três quartos, de trás: 397 cm² (padrão); de lado: 67 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Stiff unilateral com halter (`stiff-unilateral`)

291 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 10 a 16; cotovelo 4 a 4; quadril 6 a 97; ombro 16 a 59; dorsiflexao -3 a 4; punho -0 a 0; pronacao 26 a 44; clavicula 11 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 62° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 97,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 78,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 4,2° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 10° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 45° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Abrir o quadril) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7,2% da velocidade de pico (mão direita, Subida · concêntrica); pico de 119,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a coluna fica reta (a lombar não arredonda) (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Ficha | o quadril vai para trás, com o joelho de apoio levemente dobrado e fixo (consenso) | do alto até embaixo, o quadril dobra 91,6° e vai 15,1 cm para trás; o joelho de apoio fica entre 10° e 16° | como a ficha pede | ok |
| Ficha | em pé numa perna, o quadril estendido (consenso) | em pé, o quadril dobra 5,9° e o peito fica 1,3° à frente da vertical | como a ficha pede | ok |
| Ficha | fim: tronco quase paralelo ao chão (consenso) | embaixo, o peito fica a 10,7° da horizontal | como a ficha pede | ok |
| Ficha | fim: a perna livre na mesma linha do tronco (consenso) | embaixo, a perna livre (do quadril ao tornozelo) faz 2° com a linha do tronco (da base do pescoço à bacia) | como a ficha pede | ok |
| Ficha | quadril nivelado o tempo todo (consenso) | a diferença de altura entre os dois quadris chega a 0 cm | como a ficha pede | ok |
| Ficha | halter perto da perna, sem atravessá-la (consenso) | da carga (ou da mão) à pele da coxa ou da canela, de 0,3 a 3,9 cm na descida | como a ficha pede | ok |
| Ficha | o centro de massa (corpo + halter) cai sobre o pé de apoio (consenso) | o centro de massa (corpo + halter) fica a no máximo 0 cm do meio do pé de apoio, para a frente ou para trás, e 0 cm de lado (pé de 19,9 cm do calcanhar à bola e 9,9 cm de largura) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | pes.meiaDistancia, joelho.cima, joelho.baixo, livre.coxa.cima, livre.joelho.cima, livre.joelho.baixo, livre.tornozelo, cotovelo, cotovelo.paraFora, carga.folga, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de três quartos, de trás: 218 cm² (padrão); de lado: 64 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

## Tríceps na suspensão (mãos à testa) (`triceps-suspensao`)

243 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 0 a 100; quadril 2 a 2; ombro 115 a 115; dorsiflexao -8 a 9; punho -0 a 0; pronacao 70 a 70; clavicula 15 a 15.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 3,9° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 100° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 115° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 8,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 8,1° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 70° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 35° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril cai) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita direita: não estica | comprimento de 82 a 82 cm | não pode variar mais de 0,3 cm | ok |
| Cabos | fita esquerda: não estica | comprimento de 82 a 82 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 10,6% da velocidade de pico (mão direita, Extensão · concêntrica); pico de 84,1 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto como numa prancha (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177,3° (180° = linha reta) | como a ficha pede | ok |
| Ficha | os pés apoiam na ponta, parados (desenho) | a bola do pé fica a no máximo 0 cm do chão; o calcanhar, a 11,4 cm ou mais | como a ficha pede | ok |
| Ficha | as mãos seguram os pegadores o ciclo inteiro (consenso) | o centro da pegada fica a no máximo 0 cm do centro do pegador, com a mão fechada nele | como a ficha pede | ok |
| Ficha | palmas para baixo (consenso) | o polegar aponta para dentro, no tronco, com no mínimo 94% do comprimento (100% = todo para dentro) no começo; a pronação do antebraço fica de 160° a 160° | como a ficha pede | ok |
| Ficha | a fita não estica: o corpo vai à frente enquanto as mãos vêm à testa (consenso) | o corpo vai de 24° a 40,8° da vertical, inclinado à frente | como a ficha pede | ok |
| Ficha | os cotovelos apontam para a frente e ficam parados (consenso) | o braço gira no máximo 0° no tronco e se abre no máximo 0° para o lado | como a ficha pede | ok |
| Ficha | no fim, as mãos chegam perto da testa (consenso) | no fim, a pegada fica a 15,3 cm da cabeça, 8,3 cm à frente do centro dela e 20,2 cm acima | como a ficha pede | ok |
| Ficha | a fita passa por cima da cabeça, não no pescoço (consenso) | a fita passa a no mínimo 2,7 cm da cabeça e do pescoço | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | pes.meiaDistancia, pes.atrasDaAncora, calcanhar.sobe, corpo.inicio, pescoco.flexao, maos.polegarGira, cotovelo.fim | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: triceps; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 56 cm² (padrão); de três quartos, de trás: 20 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## T e Y na suspensão (`yt-suspensao`)

279 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 10; quadril 2 a 2; ombro 64 a 90; dorsiflexao -38 a 10; punho -0 a 0; pronacao -17 a -15; clavicula 13 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 3,9° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 10° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 90° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 9,8° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 38,1° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 16,8° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Encolher os ombros) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita direita: não estica | comprimento de 129,7 a 129,7 cm | não pode variar mais de 0,3 cm | ok |
| Cabos | fita esquerda: não estica | comprimento de 129,7 a 129,7 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,6% da velocidade de pico (mão direita, Abertura em T · concêntrica); pico de 308,2 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto, do calcanhar à cabeça (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 175,6° (180° = linha reta) | como a ficha pede | ok |
| Ficha | calcanhares no chão, parados (consenso) | o ponto mais baixo do pé fica de 0 a 0 cm do chão; a ponta do pé, a 11,3 cm ou mais | como a ficha pede | ok |
| Ficha | as mãos seguram os pegadores o ciclo inteiro (consenso) | o centro da pegada fica a no máximo 0 cm do centro do pegador, com a mão fechada nele | como a ficha pede | ok |
| Ficha | palmas para baixo (consenso) | o polegar aponta para dentro, no tronco, com no mínimo 96% do comprimento (100% = todo para dentro) no começo; a pronação do antebraço fica de 73,2° a 75° | como a ficha pede | ok |
| Ficha | braços quase retos (consenso) | o cotovelo dobra de 10° a 10° | como a ficha pede | ok |
| Ficha | no T, as mãos chegam na linha dos ombros (consenso) | no fim, a pegada fica 0 cm à frente da linha dos ombros e 0 cm abaixo do ombro, a 81,1 cm do meio do corpo | como a ficha pede | ok |
| Ficha | as escápulas se juntam no T (consenso) | a clavícula vai para trás 18,2° do começo ao fim (a escápula se junta à coluna) | como a ficha pede | ok |
| Ficha | a fita não estica: o corpo sobe junto (consenso) | o corpo vai de 65° a 18,8° da vertical (do tornozelo ao ombro) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | pes.meiaDistancia, pes.alemDaAncora, pe.pontaSobe, corpo.inicio, pescoco.flexao, maos.polegarParaCima, escapula.prot.inicio, escapula.retr.fim, escapula.elev.fim | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: ombro_posterior; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de trás: 54 cm² (padrão); de lado: 4 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

### Objetos (27)
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
- porta.batenteLarg = 7 cm (largura do batente (e da guarnição) em volta da folha, vista de frente)
- porta.batenteProf = 10 cm (profundidade do batente na parede)
- porta.macanetaAltura = 105 cm (altura da maçaneta do chão)
- porta.macanetaDaBorda = 6 cm (distância do centro da maçaneta à borda da folha)
- suspensao.fitaLarg = 3.8 cm (largura de cada fita: a página do fabricante não traz (1,5 pol, a largura comum de fita de náilon))
- suspensao.mosquetaoComp = 10 cm (comprimento do mosquetão que liga a fita à âncora: a página do fabricante não traz)
- suspensao.pegadorComp = 14 cm (comprimento do pegador de mão (espuma): a página do fabricante só diz "padded handles")
- suspensao.pegadorDiam = 3.5 cm (diâmetro do pegador de mão: a página do fabricante não traz)
- suspensao.bercoLarg = 9 cm (largura do berço do pé (a alça onde entra o peito do pé): a página do fabricante não traz)
- suspensao.bercoAlt = 6 cm (quanto o berço do pé desce abaixo do pegador, onde o peito do pé apoia: a página do fabricante não traz)
- toalha.esp = 0.5 cm (espessura de uma camada de felpa: a ficha do fabricante dá o peso (4,5 lb por dúzia), não a espessura; dobrada em quatro, são quatro camadas (2 cm))

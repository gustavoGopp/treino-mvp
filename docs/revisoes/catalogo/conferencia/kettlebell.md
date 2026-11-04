# Conferência das folhas do kettlebell (7)

Cada ponto do movimento, a fonte (a ficha `docs/pesquisa/animacoes/<id>.md`) e o que foi medido no boneco (`juntas.mjs`, centímetros do motor; o eixo z aponta para a frente; R = lado direito). A peça nova `kettlebell` (`src/engine/desenho.ts`) desenha a alça na mão e a bola embaixo dela, na direção da gravidade, ou ao longo do antebraço quando ele está apoiado. A bola é uma esfera, então aparece redonda em qualquer vista.

| Exercício | O que a ficha pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Remada | Pé do lado do kettlebell atrás; mão livre na coxa; kettlebell pendurado embaixo do ombro; cotovelo ao quadril, o kettlebell termina ao lado do quadril | Mesmo corpo da remada sem banco aprovada; mão de (y 50, z 32), embaixo do ombro, até (y 84, z −2), ao lado do quadril; bola pendurada | sim |
| Stiff | Kettlebell nas duas mãos, pela alça; joelhos levemente dobrados e fixos; quadril para trás; kettlebell perto das pernas | Mãos juntas na alça (x ±4 a ±6); joelhos fixos (K y 50 nas três fases); quadril vai 30 cm para trás; kettlebell 7 cm à frente das canelas embaixo | sim |
| Rosca | Uma mão na alça, palma para a frente; bola pendurada embaixo da mão; cotovelo parado | Mão de 78 a 138 cm; cotovelo parado ao lado do tronco; bola sempre embaixo da mão | sim |
| Tríceps francês | Sentado; as duas mãos nos lados da alça, a bola para baixo atrás da cabeça; cotovelos para cima e parados | Mãos juntas (x ±17) de 104 cm (atrás da cabeça) a 163 cm (braços estendidos); a bola pendurada embaixo das mãos; ombros e cotovelos parados | sim |
| Afundo | Kettlebell junto ao peito (pegada do goblet); passo largo, tronco quase vertical, descida reta | Mãos à frente do peito (x ±6, z +8); a bola embaixo das mãos; pernas e tronco do afundo com o peso do corpo aprovado; o quadril desce 32 cm em linha reta | sim |
| Desenvolvimento unilateral | Em pé; kettlebell apoiado no antebraço, na altura do ombro, cotovelo junto ao corpo, bola do lado de fora; sobe até estender acima da cabeça; tronco parado; a outra mão na cintura | Início com a mão na altura do ombro (144 cm; ombro a 141), à frente (z 15), cotovelo perto do tronco; fim com o braço estendido acima da cabeça (204 cm); a bola apoiada do lado de fora e atrás do antebraço; a mão esquerda na cintura | sim |
| Ponte | Kettlebell deitado sobre o quadril, as duas mãos segurando; ombros, quadril e joelhos em linha no topo | A bola apoiada no quadril, que sobe 20 cm; as mãos seguram dos dois lados; a linha do topo é a da ponte aprovada | sim |

**Erros:** os mesmos das fichas ("Erros a animar"). Remada: girar, arredondar e não estender o braço. Stiff: arredondar, agachar e kettlebell longe das pernas. Rosca: balançar, cotovelo à frente e não estender. Francês: abrir os cotovelos, arquear e amplitude curta. Afundo: joelho para dentro, tronco caído e descer pouco. Desenvolvimento: arquear, jogar o peso com as pernas e punho dobrado (a bola cai mais para trás). Ponte: arquear a lombar, empurrar pela ponta dos pés e subir pouco.

**Limite.** A técnica dos 7 é **consenso** (`nsca2021`, não verificado, e as animações aprovadas mais parecidas); a equivalência com halter é **robusta** (`haugen2023`). Na ponte, no erro de arquear a lombar, os braços acompanham o tronco e sobem um pouco: o que a folha quer mostrar é a curva da lombar.

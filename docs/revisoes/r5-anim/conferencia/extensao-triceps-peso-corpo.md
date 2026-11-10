# Conferência da folha: Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md` e o cartão `src/conteudo/exercicios/extensao-triceps-peso-corpo.json`) e o que foi medido no boneco (centímetros do motor; y para cima, z para a frente; x para o lado). A folha: `../folhas/extensao-triceps-peso-corpo.png` (estilo A); os erros em 6 instantes do ciclo: `../folhas/extensao-triceps-peso-corpo-erros.png`.

**De onde vem a pose.** O tríceps na suspensão já aprovado (`triceps-suspensao`): o mesmo corpo reto e inclinado, os cotovelos apontando para a frente e o mesmo jeito de mostrar os erros de corpo. A diferença: as mãos ficam paradas na beirada de uma bancada e o corpo gira em torno dos tornozelos. A bancada é uma caixa (`BOX`, a mesma peça do degrau, da parede e do colchonete), com o tampo a 90 cm, a altura da cintura; nenhuma peça nova.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Apoio | Fixo, na altura da cintura (bancada, pia) (consenso) | Bancada com o tampo a 90 cm | sim |
| Posição | Mãos no apoio na largura dos ombros, braços estendidos; pés para trás, corpo inclinado e reto (consenso; Jacob Zemer, vídeo) | Mãos paradas na beirada, a 34 cm uma da outra (ombros a 38); cotovelo a 152° (quase reto); corpo a 32° da vertical, joelho a 174°, do calcanhar à cabeça em linha | sim |
| Descida | ~2 a 3 s; só os cotovelos dobram, apontando para a frente, até a testa chegar perto do apoio (consenso) | 2,5 s; o corpo inclina de 32° para 47° sem dobrar; o cotovelo fecha para 52° e fica à frente, abaixo da beirada; a cabeça para 13 cm acima e 11 cm atrás da beirada | sim |
| Embaixo | Braços acima da cabeça, cotovelos dobrados | 0,5 s parado; o braço fica na linha do corpo, acima da cabeça | sim |
| Volta | Esticar os cotovelos até os braços ficarem retos | ~1 s, de volta a 152° | sim |
| Vista de cima | Cotovelos apontando para a frente | Os cotovelos ficam na largura dos ombros (x entre 21 e 24 cm do meio do corpo) | sim |
| Erro `quadril` | "Dobrar o quadril": o corpo dobra e a série fica mais fácil | As pernas ficam a 40° e o tronco vai a 64°: o quadril dobra 24° e fica para trás e para cima | sim |
| Erro `cotovelos` | "Abrir os cotovelos": vão para os lados | Os cotovelos vão a 40–45 cm do meio do corpo (o certo: 21–24), vistos de cima | sim |
| Erro `falha` | "Ir até a falha": o cotovelo cede e a testa bate no apoio | O corpo desce até 52°, o cotovelo fecha para 36° e a cabeça chega à beirada (a testa encosta na quina) | sim |
| Músculos | Primário: tríceps; sem secundário (um estudo para a posição) | Tríceps em vermelho | sim |

**Vistas.** De lado (`lateral`), onde se vê o corpo reto e o cotovelo dobrar, e de cima (`top`), nova neste exercício, onde se vê se os cotovelos apontam para a frente ou abrem. O erro "abrir os cotovelos" abre na vista de cima, porque de lado o cotovelo que vai para o lado quase não muda de lugar na tela.

**Rótulos.** "corpo reto" (com a linha tracejada do calcanhar à cabeça), "só o cotovelo dobra" (embaixo do cotovelo) e, de cima, "cotovelos para a frente".

**Limites.**
- "Ir até a falha" é sobre o fim da série (a repetição em que o cotovelo cede), e a animação repete sempre o mesmo ciclo: o boneco errado mostra essa repetição, em que a testa chega à bancada. O título do erro diz o que é.
- A técnica é **consenso**; com o peso do corpo, **nenhum estudo**. A posição do braço acima da cabeça tem **um estudo** (`maeo2023`). A referência visual (Jacob Zemer; FitnessFAQs) não foi conferida por dentro e não é fonte de regra.

# Conferência da folha: Abdominal invertido no chão (`abdominal-invertido`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/abdominal-invertido.md` e o cartão `src/conteudo/exercicios/abdominal-invertido.json`) e o que foi medido no boneco (centímetros do motor; y para cima, z na direção dos pés). A folha: `../folhas/abdominal-invertido.png` (estilo A); os erros em 6 instantes do ciclo: `../folhas/abdominal-invertido-erros.png`.

**De onde vem a pose.** O colchonete, o corpo deitado de costas e a cabeça são os do abdominal no chão já aprovado (`abdominal-chao`). Nenhuma peça nova. A pelve gira em torno do meio das costas, que fica parado; por isso os ombros e a cabeça não se mexem (medido: 0 cm).

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Posição | De costas, braços ao lado do corpo, palmas no chão (consenso; Pursuit PT, vídeo) | Mãos paradas no chão ao lado do quadril o ciclo inteiro; cotovelo quase reto (140°) | sim |
| Pernas | Joelhos a ~90°, pés fora do chão, coxas na vertical (consenso) | Embaixo: coxa na vertical, canela paralela ao chão; joelho a 90° o ciclo inteiro | sim |
| Subida | ~1 s; enrolar a pelve em direção ao peito, tirando o quadril do chão, sem embalo (`escamilla2006b`; consenso) | 1 s; a pelve gira 37° e o quadril sobe 13 cm; os joelhos chegam sobre o peito (30 cm à frente do quadril, na direção da cabeça) | sim |
| No alto | Segurar 1 s, abdômen contraído | 1 s parado | sim |
| Descida | ~2 s, devagar, até o quadril voltar ao chão, sem arquear a lombar (**[opinião]**) | 2 s; volta até as coxas na vertical; a lombar fica no chão | sim |
| Costas de cima | No chão (consenso) | Ombros e cabeça parados no chão o ciclo inteiro (0 cm) | sim |
| Erro `embalo` | "Jogar as pernas": o embalo levanta o quadril | As pernas vão à frente da pelve já no meio da subida e são lançadas em direção à cabeça; em cima a pelve gira 52° (e não 37°) e o quadril sobe 18 cm (e não 13) | sim |
| Erro `maos` | "Empurrar com as mãos": os braços fazem a força | As mãos apertam o chão perto do quadril, com os cotovelos dobrados (83°) e 17 cm acima do chão: o braço armado para empurrar | sim (ver o limite) |
| Erro `lombar` | "Arquear a lombar na descida": as pernas vão longe demais e a lombar sai do chão | Embaixo, as pernas descem até 30 cm do chão (joelho a 134°) e o meio das costas sobe 3,5 cm do chão | sim |
| Músculos | Primário: abdômen; sem secundário contado (um estudo) | Reto abdominal em vermelho | sim |

**Vista.** Só de lado (`lateral`), como o abdominal no chão: de lado se vê o quadril sair do chão e a lombar.

**Rótulos.** "enrola a pelve" (ao lado do quadril) e "costas no chão" (a linha tracejada sob as costas).

**Limites.**
- "Empurrar com as mãos" é força, e força não aparece num desenho. O boneco mostra o braço armado para empurrar (cotovelo dobrado e alto, mão apertando perto do quadril), que é o que se vê de fora em quem usa os braços. O título do erro diz o que é.
- No modo Erros, a cabeça aparece tracejada em vermelho no "jogar as pernas" e no "arquear a lombar", porque o motor marca o tronco inteiro quando a coluna muda mais de 3 cm. A cabeça não se mexe (medido: 0 cm). É a mesma regra das animações já aprovadas.
- A técnica é **consenso**; a ativação do reto abdominal no abdominal invertido tem **um estudo** de EMG (`escamilla2006b`). A referência visual (Pursuit Physical Therapy; Jeremy Ethier) não foi conferida por dentro e não é fonte de regra.

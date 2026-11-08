# Conferência da folha: Flexão com os pés elevados (`flexao-pes-elevados`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/flexao-pes-elevados.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs flexao-pes-elevados`, comparado com `node scripts/medir-animacao.mjs flexao`; centímetros do motor; y para cima, z para a frente). A folha: `../folhas/flexao-pes-elevados.png` (estilo A, R4). Checagem de cinemática: `ik=0` na animação e nos 3 erros.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Montagem | Pontas dos pés num apoio firme; cadeira sem rodinhas, encostada na parede | a cadeira do búlgaro com o peso do corpo (assento a 45 cm, parede atrás); os tornozelos a 54,5 cm, a ponta dos pés ~6 cm para dentro da beira do assento | sim |
| Posição | Mãos um pouco mais abertas que os ombros, na linha do peito; corpo em linha reta; a cabeça mais baixa que os pés | mãos iguais às da flexão (a 60 cm uma da outra); o tronco em linha com as pernas nas 4 fases; em cima, o corpo quase horizontal (87° da vertical), com o ombro a 62 cm (na flexão: 63) | sim |
| Descida | ~2 s, o corpo inteiro; cotovelos a ~45° | 2 s; o corpo gira em torno dos pés de 87° a 105° da vertical; o ombro desce de 62 a 24 cm (na flexão: de 63 a 21) | sim |
| Embaixo | Peito perto do chão | 0,35 s; o ombro a 24 cm, a cabeça mais baixa que o quadril | sim |
| Subida | ~1 s | 1 s, volta à pose de cima | sim |
| Mãos e ombros | Mãos na linha do peito | em cima, os ombros ficam 8 cm à frente das mãos (na flexão: 0); embaixo, 7 cm à frente (na flexão: 11): o ombro fica sobre as mãos ao longo da descida | sim |
| Erros | Quadril cai; cotovelos abertos; descer pouco | `quadril`: o quadril cai 10 cm girando em torno dos pés e a lombar arqueia 13°; `cot`: os cotovelos a 90° (a mesma pose da flexão, vista de cima); `curta`: para na metade | sim |
| Músculos | Peito; tríceps, ombro da frente | os mesmos da flexão aprovada | sim |

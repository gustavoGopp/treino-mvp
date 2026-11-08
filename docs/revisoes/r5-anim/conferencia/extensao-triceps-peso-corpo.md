# Conferência da folha: Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs extensao-triceps-peso-corpo`, centímetros do motor; y para cima, z para a frente). A folha: `../folhas/extensao-triceps-peso-corpo.png` (estilo A, R4). Checagem de cinemática: `ik=0` na animação e nos 3 erros.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Montagem | Apoio fixo, na altura do quadril | bancada de 90 cm (a caixa do degrau e da parede), a frente em z = 5 | sim |
| Posição | Mãos na beira do apoio, na largura dos ombros; corpo reto, pés atrás; braços estendidos | mãos em cima da beira (91 cm, z = 8), 32 cm uma da outra, paradas nas 4 fases; tornozelos a 1,47 m da beira; tronco a 42° da vertical, em linha com as pernas; ombro a 61 cm da mão (braço quase reto, a ~60° do tronco) | sim |
| Descida | ~2 s; cotovelos dobram para baixo; a cabeça vai para perto do apoio; os braços passam para cima da cabeça | 2 s; o corpo gira em torno dos pés de 42° a 58° da vertical; o ombro desce de 105 a 77 cm; o cotovelo fica abaixo da mão; embaixo, o braço fica quase em linha com o tronco (acima da cabeça) | sim |
| Embaixo | Testa perto do apoio, sem encostar | 0,5 s; o centro da cabeça a ~89 cm de altura e a ~13 cm da frente da bancada: a testa fica a ~2 cm dela (calculado das poses: raio da cabeça de 10,5 cm) | sim |
| Extensão | ~1 s | 1,1 s, volta à pose do início | sim |
| Erros | Quadril cai; cotovelos abrem; descer pouco | `quadril`: o quadril desce 7–8 cm e a lombar arqueia 7°; `cotovelo`: os cotovelos vão para os lados e a cabeça fica para trás (o peito vai à bancada); `curta`: para na metade (58° → 50°) | sim (o `cotovelo` aparece pouco de lado, como na suspensão aprovada) |
| Músculos | Tríceps | tríceps em vermelho, nos dois braços | sim |

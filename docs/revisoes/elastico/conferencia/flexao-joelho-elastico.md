# Conferência da folha: Flexão de joelho com elástico (`flexao-joelho-elastico`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/flexao-joelho-elastico.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs flexao-joelho-elastico`, centímetros do motor; y para cima, z para a frente). A folha: `docs/revisoes/elastico/folhas/flexao-joelho-elastico.png` (estilo A, R4). A peça do elástico (`band`) calibra o repouso pelo menor comprimento do ciclo e afina até 55% quando estica ao dobro: a tensão aparece onde a faixa fica fina.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Montagem | Deitado de bruços, elástico preso num ponto firme e baixo atrás dos pés; as pontas em volta dos dois tornozelos; afastado até esticar com as pernas estendidas | Poste baixo a 130 cm atrás do quadril, anel a 9 cm do chão; colchonete; duas faixas do anel ao laço do tornozelo (4 cm acima do calcanhar); repouso 50 cm = o comprimento com as pernas estendidas | sim (poste: escolha de desenho) |
| Posição | Testa apoiada nos braços dobrados, quadril no chão | Pose nova: tronco de bruços (pitch 90°), pelve a 15 cm (deitada); cabeça 18° levantada sobre os antebraços cruzados (mãos a 16 cm uma da outra, sob a testa); coxas no colchonete (joelho a 8 cm) | sim |
| Flexão | ~1 s, calcanhares ao glúteo, quadril no chão | 1,1 s; o tornozelo sobe de 11 a 52 cm e vem de 85 a 50 cm atrás do quadril (joelho a ~70°); a pelve não sai de 15 cm; o joelho fica no colchonete (5–10 cm) | sim |
| Fim | Joelhos bem dobrados; pausa curta; aqui o elástico pesa mais | 0,5 s; a faixa vai de 50 a 90 cm (afina 36%) | sim |
| Volta | ~2–3 s, até quase estender | 2,4 s | sim |
| Erros | Quadril sobe; tranco; puxar pouco ou não estender | `quadril`: a pelve sobe a 30 cm e dobra 20°; `tranco`: o meio já é o fim; `curta`: dobra só até 42 cm e volta só até 26 cm de altura | sim |
| Músculos | Posteriores; sem secundário | Posteriores em vermelho | sim |

**Limite.** A técnica é a da mesa flexora, **consenso** (`nsca2021`, não verificado); a flexão deitada tem **um estudo** (`maeo2021`, menos que a sentada). A pose de bruços é nova no motor (pitch +90°): conferir na folha que a cabeça e os braços lêem como "testa nos braços".

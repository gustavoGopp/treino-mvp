# Conferência da folha: Panturrilha no degrau da escada (`panturrilha-degrau`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/panturrilha-degrau.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs panturrilha-degrau`, centímetros do motor; y para cima, z para a frente). A folha: `../folhas/panturrilha-degrau.png` (estilo A, R4). Checagem de cinemática: `ik=0` na animação e nos 2 erros.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Posição | Bola dos pés na borda do degrau, calcanhares para fora; pés na largura do quadril; mãos na parede ou no corrimão, só para equilíbrio | Degrau de 15 cm (a caixa do step aprovado), borda de trás em z = 8; a ponta do pé apoiada na borda, o calcanhar para fora; joelhos a 20 cm um do outro; as duas mãos na parede (z = 43, altura de 128 cm, 40 cm uma da outra), paradas nas 4 fases | sim |
| Embaixo | Calcanhar abaixo da borda, alongado, ~1 s, sem quicar | 1 s; o tornozelo a 8,6 cm, 6,4 cm abaixo do topo do degrau, o pé a 22° com a ponta para cima | sim |
| Subida | ~1 s, o mais alto possível | 1 s; o tornozelo sobe a 28,9 cm (20 cm de curso), o pé a 55° com a ponta para baixo | sim |
| Topo | Segura 1 s | 1 s | sim |
| Descida | ~2 s, até passar a borda | 2 s, volta à pose de baixo | sim |
| Joelhos | Estendidos e parados | o quadril sobe junto com o tornozelo (93 → 113 cm), o joelho acompanha (51 → 71 cm) sem dobrar | sim |
| Erros | Não descer os calcanhares; dobrar e esticar os joelhos | `curta`: embaixo, o tornozelo para em 16,5 cm (acima da borda), o pé quase reto; `joelho`: o quadril cai a 86 cm embaixo (os joelhos dobram e dão impulso) | sim |
| Músculos | Panturrilha; sem secundário | panturrilha em vermelho, nas duas pernas | sim |

**O que é igual à base aprovada.** As 3 poses das pernas e os 2 erros são os da `panturrilha-b` (step), sem o halter e sem a estação; os braços são os da `panturrilha-chao` (mãos na parede). O ciclo é o da `panturrilha-chao` (1 s embaixo, em vez dos 2 s da `panturrilha-b`), porque a pausa de 2 s embaixo é o 2º degrau da escada proposta (`16`).

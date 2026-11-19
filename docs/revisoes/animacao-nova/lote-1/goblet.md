# Lote 1 · Agachamento goblet com calcanhar elevado (`goblet`)

Uma das quatro âncoras do motor novo, feita antes dos lotes e aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"). Ela não tinha conferência escrita própria (o estado dela está em `../andamento.md` e em `README.md`); este arquivo nasce com a correção de 19/11.

- Ficha da técnica: `docs/pesquisa/animacoes/goblet.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/goblet.json`.
- Animação: `src/engine/novo/exercicios/goblet.ts`, sobre o núcleo dos agachamentos (`agachar.ts`, que não muda).
- Quadros grandes: `../quadros/goblet.png`.

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **a cabeça de cima do halter entrava 8,3 cm no peito em todos os quadros** do ciclo e dos erros: o halter ficava num ponto do tórax estimado pela profundidade do peito (42% e 68% dela, a partir do eixo da coluna), e não medido na pele. A checagem da pintura achou também **a anilha 5,1 cm dentro dos pés** (1,7 cm pela regra nova): o centro dela ficava 3 cm à frente do ponto do calcanhar, e ela passava sob o meio do pé até perto da bola; o pé é rígido e inclinado, e à frente do calcanhar a sola desce abaixo do alto da anilha.

**A mudança.**

- **O halter encosta no esterno.** Ele vai para a frente do tórax até as duas cabeças entrarem no máximo 0,3 cm na pele (`halter.encostoNoPeito`, o amassado), calibrado em pé e guardado no preparo (`goblet:halter-no-peito`): no corpo do app, 8,2 cm. A inclinação do halter em relação ao tórax não muda (a cabeça de baixo fica 1,7 cm à frente da barriga, em pé). As mãos vão junto (a concha embaixo da cabeça de cima).
- **A anilha fica sob o calcanhar.** A borda da frente fica 2,5 cm à frente do ponto do calcanhar (`anilha.bordaAFrenteDoCalcanhar`), embaixo da frente dele, e o resto da anilha fica para trás. O calcanhar não muda de altura.
- **No erro "Joelhos para dentro", os joelhos caem 4 cm, e não 9** (`erro.valgo.joelho`). Com o halter na frente do peito, embaixo a cabeça de baixo fica entre os joelhos, como na academia; com 9 cm, os joelhos entravam 4,1 cm nela. Com 4 cm, eles encostam no halter sem entrar. O erro continua se lendo de frente (o joelho sai da linha do pé), mas menos que antes.
- Com o halter mais à frente, o equilíbrio leva o quadril um pouco para trás: a dorsiflexão do tornozelo embaixo passa de 21,5° para 19,5° (o aviso de amplitude continua).

| medido (homem) | antes | depois |
|---|---|---|
| a cabeça do halter entra no corpo | 8,3 cm (peito, todos os quadros) | 0,3 cm (encostada) |
| a anilha entra no pé (regra / pintura) | 1,7 cm / 5,1 cm | 0,3 cm / nada |
| erro "Joelhos para dentro": joelho no halter | 4,1 cm dentro (com o halter no lugar novo) | encosta, 0 cm |
| pintura de frente no erro "Tronco cai…" (cintura × halter) | 25,8 cm² (aviso) | nada |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (8,3 cm, a cabeça do halter no tronco); no de agora, passa (0,3 cm, a anilha no pé). O antes e depois está em `correcao-das-antigas/goblet-peso.png`; os quadros grandes foram regravados (`quadros/goblet.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **0 falhas e 3 avisos** (antes: 0 falhas e 5 avisos, entre eles o de pintura e o de pesos).

**O que ainda não ficou bom.**
- O erro "Joelhos para dentro" ficou mais fraco (4 cm em vez de 9). É o que cabe com o halter entre os joelhos; se o Gustavo preferir o erro mais forte, a saída seria mostrar o joelho caindo mais na descida e encostando no halter só embaixo.
- De lado, a cabeça de baixo do halter fica um pouco afastada da barriga em pé (1,7 cm), porque o halter mantém a inclinação de antes em relação ao tórax.

# Conferência da folha: Abertura em T deitado de bruços (`abertura-t-deitado`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/abertura-t-deitado.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs abertura-t-deitado`, centímetros do motor; y para cima, z para a frente, a cabeça para a frente). A folha: `../folhas/abertura-t-deitado.png` (estilo A, R4; a vista "por trás" olha dos pés para a cabeça). Checagem de cinemática: `ik=0` na animação e nos 3 erros.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Posição | De bruços, testa perto do chão, pernas estendidas; braços em T na linha dos ombros, quase retos | o corpo de bruços da flexão de joelho com elástico, parado nas 4 fases (quadril a 15 cm, joelhos a 8 cm); as mãos na linha dos ombros (z = 48), a 1,58 m uma da outra, no chão (4 cm); o braço a ~62 cm do ombro à mão, quase reto | sim |
| Subida | ~1 s; os braços saem do chão até a linha dos ombros, as escápulas se juntam | 1,1 s; as mãos sobem de 4 a 22 cm, os ombros de 12 a 21 cm (as escápulas se juntam e levantam o ombro do chão): no topo, o braço fica na horizontal | sim |
| Topo | Segura 1 s | 1 s | sim |
| Descida | ~2 s | 2,1 s, até as mãos voltarem ao chão | sim |
| Peito e cabeça | Ficam no chão | o tronco e o pescoço não mudam de ângulo nas 4 fases | sim |
| Erros | Dobrar os cotovelos; encolher os ombros; tirar o peito do chão | `cotovelo`: as mãos vêm para perto da cabeça, com os cotovelos dobrados para cima (o W); `encolher`: os ombros sobem 7 cm em direção às orelhas; `cabeca`: o tórax sobe 18° e o pescoço 43° | sim |
| Músculos | Ombro de trás | ombro de trás em vermelho, nos dois lados | sim |

**Limite da vista.** De lado, os braços apontam para a câmera e a subida aparece pequena (é pequena de fato); a vista "por trás" é a que mostra o T.

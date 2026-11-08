# Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

Exercício da biblioteca ampliada: `extensao-triceps-peso-corpo` (proposto em `../../pesquisa-v2/16-corpo-livre-e-casa.md`, parte de empurrar; entra na biblioteca no R5-CL). Tríceps, novo nível 3 da vaga do tríceps acima da cabeça, depois do `triceps-suspensao`. Nos programas sem dor, aparece em **59,4%** (`../../revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 4). Ficha escrita no R5-anim (08/11/2026); **em revisão** até o "aprovar" do Gustavo na folha.

- **Animação:** `extensao-triceps-peso-corpo`, em `src/engine/exercicios/revisao/` (fora do app até a aprovação).
- **O que o boneco mostra:** o degrau 0 da escada proposta em `16` (mãos numa bancada ou pia da cozinha, ~90 cm). Os outros apoios (a parede, mais fácil; um degrau, o chão de joelhos, mais difíceis) ficam no texto.
- **Base aprovada:** o corpo em prancha inclinada, o ciclo e os 3 erros do `triceps-suspensao`, com as mãos paradas num apoio fixo. A bancada é desenhada com a mesma caixa do degrau e da parede (BOX), com 90 cm de altura: nenhum desenho novo no motor, mas é um objeto novo na cena (pergunta ao Gustavo na folha).

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Só apoio fixo (bancada, pia, parede, degrau); mesa e encosto de sofá podem deslizar | [opinião] | `16`, linha da extensão de tríceps |
| Posição | Mãos na beira da bancada, na largura dos ombros; pés para trás; corpo reto como numa prancha inclinada; braços estendidos | consenso | `nsca2021` (livro não acessado); o `triceps-suspensao` aprovado |
| Descida | ~2 s; os cotovelos dobram e a cabeça vai para perto da bancada; os braços passam para cima da cabeça; os cotovelos apontam para baixo | um estudo (a posição do ombro); consenso (a técnica) | `maeo2023`: o tríceps cresceu mais com o braço acima da cabeça que ao lado do corpo; `16` usa a mesma posição de ombro que o Gustavo aceitou para a suspensão em 06/11 |
| Embaixo | Testa perto da bancada, sem encostar | [opinião] | `16`: o risco é bater a testa se o cotovelo ceder; parar a 1–2 repetições da falha |
| Extensão | ~1 s, estica os cotovelos e volta | consenso | `tempo.serie`, a mesma cadência do `triceps-suspensao` |
| Mãos | Paradas no apoio; o corpo gira em torno dos pés | consenso | geometria do exercício |

## Por que assim
Sem equipamento, a vaga obrigatória do tríceps acima da cabeça fica vazia hoje. Esta é a versão com o peso do corpo dessa posição: no fim da descida os braços estão acima da cabeça, que é a posição em que o tríceps cresceu mais (`maeo2023`, um estudo). Com o peso do corpo, não há estudo deste exercício: a técnica é **consenso** de treinadores.

## Erros animados
1. **Quadril cai** (`quadril`): a barriga desce e a lombar arqueia.
2. **Cotovelos abrem** (`cotovelo`): os cotovelos vão para os lados e o peito vai à bancada; vira uma flexão inclinada. De lado, o erro aparece pouco (o cotovelo sai para fora do plano do desenho), como no `triceps-suspensao` aprovado.
3. **Descer pouco** (`curta`): para no meio, sem os braços chegarem acima da cabeça.

## Segurança
- Articulações no cadastro proposto: ombro, cotovelo e punho (`16`). Fica fora com cotovelo acima de 5.
- A testa perto do apoio: parar a 1–2 repetições da falha (`16`, [opinião]).
- Só apoio fixo (`16`, [opinião]).

## Músculos
Primário: tríceps. Secundários: nenhum (como o `triceps-suspensao`).

## Referência visual
Nenhum vídeo foi assistido nesta sessão. Vídeo é referência visual, nunca fonte de regra.

## Fontes (todas em `../fontes.md`)
- `maeo2023`: Maeo et al. 2023, Eur J Sport Sci 23(7):1240–1250.
- `nsca2021`: manual de técnica da NSCA, 4ª ed. **Livro não acessado** (edição confirmada por busca); consenso de treinadores.

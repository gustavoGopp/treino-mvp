# R5-anim: as animações dos 5 exercícios de corpo livre (07/11/2026)

Prompt: `docs/prompts/sessao-r5-animacao-corpo-livre.md`. Uma animação por vez, pelo ritual de `docs/pesquisa/animacoes/README.md`, com parada a cada folha para o "aprovar" do Gustavo. As poses ficam em `src/engine/exercicios/revisao/` e o texto do guia em `src/conteudo/revisao/`, fora do app até a aprovação. Nenhuma animação aprovada nem o motor mudaram.

| # | Animação (id da biblioteca) | Nos programas sem dor | Base aprovada | Folha | Medida | Situação |
|---|---|---|---|---|---|---|
| 1 | `panturrilha-degrau` | 81,8% | `panturrilha-b` (step) + `panturrilha-chao` (mãos na parede) | `folhas/panturrilha-degrau.png` | ik 0 (animação e 2 erros) | **aprovada em 07/11**; entra no app com o R5-CL |
| 2 | `abdominal-invertido` | 61,7% | `ponte-gluteo` (deitado, braços) + `abdominal-chao` + `elevacao-joelhos` (a pelve) | `folhas/abdominal-invertido.png` | ik 0 (animação e 2 erros) | **aprovada em 08/11**; entra no app com o R5-CL |
| 3 | `extensao-triceps-peso-corpo` | 59,4% | `triceps-suspensao` (corpo, ciclo e erros), mãos paradas numa bancada | `folhas/extensao-triceps-peso-corpo.png` | ik 0 (animação e 3 erros) | **aprovada em 08/11**, com a bancada; entra no app com o R5-CL |
| 4 | `abertura-t-deitado` | 56,1% | `yt-suspensao` (os braços) | — | — | na fila |
| 5 | `flexao-pes-elevados` | 53,8% | `flexao` | — | — | na fila |

## Pré-requisito: o R5-CL ainda não está na `main`
O prompt supõe o R5-CL feito (os 32 exercícios na biblioteca, com cartão e ficha). Em 07/11 a `main` tem 139 exercícios e nenhum dos 5. O que isso muda:
- **Dá para fazer agora:** a ficha (escrita aqui, a partir de `16` e `17`), a pose, a checagem e a folha. É o que o Gustavo aprova.
- **Espera o R5-CL:** `node scripts/aprovar-animacao.mjs <id> <exercicio>` liga a animação ao exercício da biblioteca e falha se ele não existir; a medida da grade (dias com 3 ou mais cartões) depende dos 32 exercícios. A conferência "a ficha bate com o cartão" é feita quando o cartão existir.

## Peças de cena
Nenhuma peça nova até aqui. O degrau da escada é a caixa de 15 cm do step aprovado; a parede é a da panturrilha no chão; o colchonete é o da ponte de glúteo.
- A bancada da cozinha (extensão de tríceps) é a mesma caixa do degrau e da parede, com 90 cm de altura: nenhum desenho novo no motor. O Gustavo aprovou assim em 08/11.

## Aprovações
- `panturrilha-degrau`: aprovada pelo Gustavo em 07/11/2026, como está na folha (as duas pernas, 1 s embaixo). Fica em `revisao/` até o R5-CL pôr o exercício na biblioteca; aí, `node scripts/aprovar-animacao.mjs panturrilha-degrau panturrilha-degrau` e a linha de base.
- `abdominal-invertido`: aprovada pelo Gustavo em 08/11/2026, como está na folha. Mesma espera pelo R5-CL.
- `extensao-triceps-peso-corpo`: aprovada pelo Gustavo em 08/11/2026, com a bancada desenhada como a caixa de 90 cm. Mesma espera pelo R5-CL.

# Rosca direta na polia com barra reta (`rosca-polia`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/rosca-polia.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `rosca-polia` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés na largura do quadril, joelhos destravados. Pegada por baixo (palmas para cima), na largura dos ombros. Cotovelos encostados nas laterais do tronco, ombros para trás. | consenso | guia original |
| Embaixo (pausa) | Braços quase estendidos, cabo tenso. | consenso | guia original |
| Subida (concêntrica) | ~1 s. Dobre só o cotovelo, levando a barra até perto dos ombros. | consenso | guia original |
| Topo (pausa) | Segure um instante contraindo. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s, até os braços quase estenderem. | consenso | guia original |
| Amplitude | Embaixo: braço quase estendido, sem deixar o ombro ir para a frente. Em cima: barra perto dos ombros, com os cotovelos ainda no lugar. Se para subir mais o cotovelo precisa ir para a frente, você já chegou ao fim da amplitude. | consenso | guia original |

## Erros a animar
1. **Cotovelos vão para a frente** (`cotovelo`): Levar o cotovelo para a frente no fim tira a carga do bíceps e passa para o ombro.
2. **Balançar o tronco** (`balanco`): Jogar o tronco para trás dá impulso e o bíceps trabalha menos.

## Músculos
Primário: bíceps. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

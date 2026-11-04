# Puxada unilateral ajoelhado na polia alta (`puxada-unilateral`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/puxada-unilateral.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `puxada-unilateral` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Ajoelhe de frente para a torre, a cerca de meio passo, joelhos na largura do quadril. Segure o estribo com uma mão, braço estendido para cima e para a frente. A outra mão apoia na coxa. Tronco reto ou levemente inclinado para trás. | consenso | guia original |
| Alongado (pausa) | Braço estendido; deixe o ombro subir e alongar a lateral das costas. | consenso | guia original |
| Puxada (concêntrica) | ~1 s. Primeiro desça o ombro, depois puxe o cotovelo para baixo, em direção ao quadril. | consenso | guia original |
| Fim (pausa) | Cotovelo ao lado das costelas. Segure um instante. | consenso | guia original |
| Volta (excêntrica) | ~2 s, alongando bem em cima. | consenso | guia original |
| Amplitude | Início: braço estendido, com o ombro alongado para cima. Fim: cotovelo ao lado das costelas, um pouco atrás do tronco. Não gire o tronco para puxar mais. | consenso | guia original |

## Erros a animar
1. **Jogar o tronco para trás** (`tronco`): Usar o peso do corpo para puxar tira trabalho do dorsal.
2. **Ombro encolhido** (`encolher`): Puxar sem descer o ombro deixa o trapézio de cima e o bíceps fazerem o trabalho.
3. **Não alongar em cima** (`curta`): Voltar só até a metade perde a parte alongada do dorsal.

## Músculos
Primário: costas. Secundários: bíceps, ombro (posterior). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

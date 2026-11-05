# Elevação lateral com halteres (`elevacao-halteres`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/elevacao-halteres.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `elevacao-halteres` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés na largura do quadril, joelhos destravados. Tronco levemente inclinado à frente. Halteres na frente das coxas, palmas para dentro, cotovelos levemente dobrados. | consenso | guia original |
| Embaixo (pausa) | Halteres na frente das coxas. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Leve os braços para fora e um pouco à frente do corpo, com o cotovelo um pouco acima da mão. | consenso | guia original |
| Topo (pausa) | Braços na linha dos ombros. | consenso | guia original |
| Descida (excêntrica) | ~2 s, controlando. | consenso | guia original |
| Amplitude | Em cima: mais ou menos na linha do ombro. Embaixo: halteres perto das coxas, sem relaxar os ombros. Com um ombro saudável dá para subir um pouco acima, mas o trapézio assume mais. Como o seu ombro estala, fique na linha do ombro. | consenso | guia original |

## Erros a animar
1. **Balançar o tronco** (`balanco`): O tronco dá o impulso e o ombro trabalha menos. Se precisar balançar, o halter está pesado.
2. **Encolher os ombros** (`encolher`): Os ombros sobem junto com os braços e o trapézio assume.
3. **Virar elevação frontal** (`frontal`): Os braços vão para a frente e o exercício passa a trabalhar mais a frente do ombro.

## Músculos
Primário: ombro (lateral). Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

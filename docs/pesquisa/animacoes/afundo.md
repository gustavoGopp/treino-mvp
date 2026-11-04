# Afundo estático com halteres (`afundo`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/afundo.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `afundo` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Dê um passo largo: pé da frente inteiro no chão, pé de trás apoiado na ponta. Pés na largura do quadril, como trilhos, e não numa linha só. Tronco quase vertical, peso mais na perna da frente. | consenso | guia original |
| Em cima (pausa) | Os dois joelhos quase estendidos, pés fixos no lugar. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Desça reto, levando o joelho de trás em direção ao chão. | consenso | guia original |
| Embaixo (pausa) | Joelho de trás a poucos centímetros do chão, coxa da frente perto da horizontal. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre o chão com o pé da frente inteiro. | consenso | guia original |
| Amplitude | Embaixo: joelho de trás quase encostando no chão. Em cima: pare um pouco antes de estender os joelhos totalmente, para manter a tensão. Se o calcanhar da frente sair do chão, o passo está curto: afaste mais os pés. | consenso | guia original |

## Erros a animar
1. **Joelho da frente para dentro** (`valgo`): O joelho cai para dentro e a carga vai para a articulação.
2. **Tronco cai para a frente** (`tronco`): O peito cai e a lombar trabalha para segurar. Mantenha o tronco quase vertical.
3. **Descer pouco** (`raso`): Parar com o joelho de trás longe do chão corta a parte mais produtiva da amplitude.

## Músculos
Primário: quadríceps. Secundários: glúteos, adutores. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

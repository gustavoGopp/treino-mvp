# Tríceps na polia com corda (`triceps-corda`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/triceps-corda.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `triceps-corda` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés na largura do quadril ou um à frente do outro. Tronco levemente inclinado à frente, abdômen firme. Cotovelos colados nas laterais do tronco, mãos nas bolinhas da corda. | consenso | guia original |
| Em cima (pausa) | Mãos na altura do peito, cotovelos dobrados e colados. | consenso | guia original |
| Extensão (concêntrica) | ~1 s. Estenda o cotovelo e, no fim, abra a corda levando as mãos para os lados das coxas. | consenso | guia original |
| Embaixo (pausa) | Braço estendido. Segure um instante. | consenso | guia original |
| Volta (excêntrica) | ~2 s, até as mãos voltarem à altura do peito. | consenso | guia original |
| Amplitude | Embaixo: cotovelo totalmente estendido, com a corda aberta. Em cima: mãos perto do peito, sem os cotovelos saírem do lugar. Se os cotovelos sobem para as mãos irem mais alto, você passou do ponto. | consenso | guia original |

## Erros a animar
1. **Cotovelos sobem e saem do tronco** (`cotovelo`): O ombro entra no movimento e o tríceps trabalha menos.
2. **Debruçar o tronco** (`tronco`): Debruçar sobre a corda usa o peso do corpo para empurrar.

## Músculos
Primário: tríceps. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

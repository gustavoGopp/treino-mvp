# Crucifixo na polia (crossover) (`crucifixo-polia`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/crucifixo-polia.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `crucifixo-polia` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Um pé à frente do outro, joelhos levemente dobrados. Tronco levemente inclinado à frente, peito alto, ombros para trás. Cotovelos levemente dobrados. Esse ângulo fica igual a série toda. | consenso | guia original |
| Alongado (pausa) | Braços abertos, mãos mais ou menos na linha do corpo, peito alongado. | consenso | guia original |
| Fechamento (concêntrica) | ~1–1,5 s. Leve as mãos em arco até se encontrarem na frente do peito, como se fosse abraçar uma árvore. | consenso | guia original |
| Fim (pausa) | Mãos juntas na frente da parte de baixo do peito. | consenso | guia original |
| Abertura (excêntrica) | ~2–3 s. Abra no mesmo arco, controlando, até sentir o peito alongar. | consenso | guia original |
| Amplitude | Início: mãos na linha do corpo ou um pouco atrás, peito alongado e ombro encaixado. Fim: mãos se encontram na frente do peito. Não abra mais se o ombro rolar para a frente ou se a sensação for na articulação do ombro. | consenso | guia original |

## Erros a animar
1. **Transformar em supino** (`supino`): Dobrar e esticar o cotovelo transforma o crucifixo num supino e tira a tensão do peito no alongamento.
2. **Abrir demais** (`abrir`): Abrir além da mobilidade leva o ombro para a frente e a carga para a articulação.
3. **Usar o tronco** (`tronco`): Curvar o tronco para fechar troca trabalho do peito por impulso.

## Músculos
Primário: peito. Secundários: ombro (frente). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

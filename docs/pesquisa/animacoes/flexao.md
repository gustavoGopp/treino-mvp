# Flexão de braço (`flexao`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/flexao.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `flexao` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Mãos um pouco mais abertas que os ombros, na linha do meio do peito. Corpo em linha reta da cabeça aos calcanhares, abdômen e glúteo contraídos. Pés juntos ou na largura do quadril. | consenso | guia original |
| Em cima (pausa) | Braços estendidos, corpo em prancha. | consenso | guia original |
| Descida (excêntrica) | ~2 s. O corpo desce inteiro junto, com os cotovelos indo para trás a meio caminho do tronco. | consenso | guia original |
| Embaixo (pausa) | Peito perto do chão. | consenso | guia original |
| Subida (concêntrica) | ~1 s. Empurre o chão mantendo a prancha. | consenso | guia original |
| Amplitude | Embaixo: peito a poucos centímetros do chão. Em cima: braços estendidos. Se o quadril cair ou subir para completar a repetição, a série acabou. | consenso | guia original |

## Erros a animar
1. **Quadril cai** (`quadril`): A lombar arqueia e o abdômen deixa de segurar. Contraia abdômen e glúteo.
2. **Cotovelos abertos a 90°** (`cot`): Abrir os cotovelos para os lados aumenta a carga na frente do ombro.
3. **Descer pouco** (`curta`): Meia repetição corta a parte alongada do peitoral.

## Músculos
Primário: peito. Secundários: tríceps, ombro (frente). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

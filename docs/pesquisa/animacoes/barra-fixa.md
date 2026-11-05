# Barra fixa (pegada pronada) (`barra-fixa`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/barra-fixa.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `barra-fixa` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Comece pendurado, com os braços estendidos. Pernas juntas, joelhos levemente dobrados, pés um pouco à frente do corpo. Abdômen firme e glúteo contraído para o corpo não balançar. | consenso | guia original |
| Pendurado (pausa) | Braços estendidos, corpo parado. | consenso | guia original |
| Começo da subida (concêntrica) | Primeiro abaixe as escápulas: os ombros se afastam das orelhas e o corpo sobe alguns centímetros. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Puxe os cotovelos para baixo e para os lados das costelas, levando o peito em direção à barra. | consenso | guia original |
| Topo (pausa) | Queixo acima da barra, peito perto dela, tronco levemente inclinado para trás. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Desça controlando até os braços estenderem de novo. | consenso | guia original |
| Amplitude | Embaixo: cotovelos estendidos. Os ombros sobem naturalmente, mas sem despencar. Em cima: peito perto da barra e queixo acima dela. Não vale ganhar altura balançando, chutando ou esticando o pescoço para passar o queixo. | consenso | guia original |

A pegada pronada a ~1–1,5 vez a largura dos ombros segue `../08-tecnica-guia.md`, conclusão 2 (`tecnica.barra-fixa.pegada`): moderada para "a pegada muda pouco o dorsal" (EMG: `youdas2010`, `dickie2017`).

## Erros a animar
1. **Balanço (kipping)** (`balanco`): Chutar e balançar dá impulso e tira trabalho das costas.
2. **Meia repetição embaixo** (`meia`): Parar com o cotovelo dobrado corta a parte em que o dorsal está mais alongado.
3. **Ombros encolhidos no topo** (`encolher`): Os ombros sobem até as orelhas e o pescoço estica para passar o queixo. Termine com o peito, não com o queixo.

## Músculos
Primário: costas. Secundários: bíceps, ombro (posterior). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

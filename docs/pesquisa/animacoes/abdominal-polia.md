# Abdominal na polia com corda (`abdominal-polia`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/abdominal-polia.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `abdominal-polia` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Ajoelhe de frente para a torre, a cerca de meio passo, joelhos na largura do quadril. Segure as pontas da corda ao lado da cabeça, perto das têmporas. Quadril um pouco atrás dos joelhos, tronco inclinado à frente com a coluna neutra. | consenso | guia original |
| Início (pausa) | Coluna neutra, abdômen alongado. | consenso | guia original |
| Enrolar (concêntrica) | ~1,5 s. Leve as costelas em direção ao quadril e os cotovelos em direção às coxas. O quadril fica parado. | consenso | guia original |
| Fim (pausa) | Coluna toda enrolada. Segure 1 s contraindo. | consenso | guia original |
| Desenrolar (excêntrica) | ~2 s, até a coluna voltar ao neutro. | consenso | guia original |
| Amplitude | Fim: coluna totalmente enrolada. Início: coluna neutra. Não deixe o cabo puxar até a lombar arquear. | consenso | guia original |

## Erros a animar
1. **Mexer o quadril** (`quadril`): Sentar para trás vira flexão de quadril: o abdômen quase não encurta.
2. **Puxar com os braços** (`bracos`): Os braços puxam a corda para baixo e tiram a carga do abdômen.

## Músculos
Primário: abdômen. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

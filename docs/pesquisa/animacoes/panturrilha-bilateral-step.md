# Panturrilha em pé no step (`panturrilha-bilateral-step`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/panturrilha-b.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `panturrilha-b` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pontas dos dois pés (a “bola” do pé) na borda do step, calcanhares para fora. Pés na largura do quadril, apontando para a frente. Joelhos quase estendidos e parados. | consenso | guia original |
| Alongado (pausa) | Calcanhares abaixo da borda do step. Segure 2 s. | consenso | guia original |
| Subida (concêntrica) | ~1 s. Suba o máximo que der na ponta dos pés, empurrando pelo dedão. | consenso | guia original |
| Topo (pausa) | Segure ~1 s contraindo. | consenso | guia original |
| Descida (excêntrica) | ~2 s, até os calcanhares passarem a borda. | consenso | guia original |
| Amplitude | Embaixo: calcanhar o mais baixo que der, com a panturrilha bem alongada. Em cima: o mais alto possível na ponta do pé. A pausa de 2 s embaixo tira o “rebote” do tendão e faz o músculo trabalhar mais. | consenso | guia original |

## Erros a animar
1. **Não descer os calcanhares** (`curta`): Sem passar a borda do step, você perde a parte alongada, que é a mais importante para a panturrilha.
2. **Dobrar e esticar os joelhos** (`joelho`): Os joelhos dão impulso com as coxas e tiram carga das panturrilhas.

## Músculos
Primário: panturrilha. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

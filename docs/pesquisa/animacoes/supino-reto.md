# Supino reto com halteres (`supino-reto`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/supino-reto.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `supino-reto` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés firmes no chão, um pouco mais abertos que o quadril. Glúteo, costas e cabeça apoiados no banco. Escápulas levemente juntas e para baixo, peito alto. A lombar mantém a curva natural. Pegada levemente neutra: palmas giradas uns 20–30° uma para a outra. Para deitar com os halteres, sente com eles nas coxas e deite levando-os junto ao peito. | consenso | guia original |
| Topo (pausa) | Halteres sobre os ombros, cotovelos quase estendidos. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Antebraço na vertical, halteres descendo ao lado do peito, na linha do mamilo. | consenso | guia original |
| Embaixo (pausa) | Pausa curta, sem quicar, com o peito alongado. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre para cima e um pouco para dentro, terminando sobre os ombros. | consenso | guia original |
| Amplitude | Topo: halteres sobre os ombros. Embaixo: halteres na altura do peito, cotovelos um pouco abaixo da linha do tronco. Não desça mais se o ombro precisar sair do banco, rolar para a frente ou doer na parte da frente. | consenso | guia original |

Os cotovelos a ~30–60° do tronco seguem `../08-tecnica-guia.md`, conclusão 4 (`tecnica.supino-halteres.cotovelos`): consenso com apoio biomecânico.

## Erros a animar
1. **Cotovelos abertos a ~90°** (`cot`): O braço fica perpendicular ao tronco: aumenta a carga na frente do ombro sem ganho para o peito.
2. **Ombros saem do banco no topo** (`escap`): Empurrar até o ombro descolar do banco tira a estabilidade e põe carga na articulação.
3. **Descer pouco** (`curta`): Parar longe do peito corta a parte alongada, que é a mais útil para o peitoral.

## Músculos
Primário: peito. Secundários: ombro (frente), tríceps. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

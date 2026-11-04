# Supino inclinado com halteres (`supino-inclinado`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/supino-inclinado.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `supino-inclinado` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés firmes no chão, um pouco mais abertos que o quadril. Glúteo, costas e cabeça apoiados no banco a série toda. Escápulas levemente juntas e para baixo, peito alto. A lombar mantém a curva natural, sem arco exagerado. Palmas para os pés ou giradas uns 20–30°. Punho reto, com o halter em cima do antebraço. Para chegar à posição, sente com os halteres nas coxas e deite levando-os junto ao peito. | consenso | guia original |
| Topo (pausa) | Halteres sobre os ombros, cotovelos quase estendidos sem travar. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Desça com o antebraço na vertical até os halteres chegarem ao lado do peito. | consenso | guia original |
| Embaixo (pausa) | Pausa curta, sem quicar, com o peito alongado. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre para cima e levemente em direção aos ombros, sem bater um halter no outro. | consenso | guia original |
| Amplitude | Topo: halteres sobre os ombros, cotovelos quase estendidos. Embaixo: halteres na altura do peito, cotovelos um pouco abaixo da linha do tronco. Não desça mais se o ombro precisar sair do banco, rolar para a frente ou doer na parte da frente. A profundidade certa depende do seu braço e da mobilidade do ombro. | consenso | guia original |

O banco a ~30° segue `../08-tecnica-guia.md`, conclusão 3 (`tecnica.supino-inclinado.angulo`): um estudo de EMG (`rodriguezridao2020`).

## Erros a animar
1. **Cotovelos abertos a ~90°** (`cot`): O braço fica perpendicular ao tronco e o halter desce na linha do pescoço. Aumenta a carga na frente do ombro sem ganho para o peito.
2. **Punho dobrado para trás** (`punho`): O halter fica atrás da linha do antebraço e a carga vai para o punho.
3. **Quadril sai do banco** (`quadril`): O tronco fica mais plano, a lombar arqueia e o exercício vira um supino reto.

## Músculos
Primário: peito. Secundários: ombro (frente), tríceps. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

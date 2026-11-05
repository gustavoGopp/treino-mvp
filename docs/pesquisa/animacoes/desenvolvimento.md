# Desenvolvimento sentado com halteres (`desenvolvimento`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/desenvolvimento.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `desenvolvimento` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sente com as costas e a cabeça apoiadas, pés firmes no chão. Halteres na altura das orelhas, cotovelos um pouco à frente do corpo. Antebraços na vertical, palmas para a frente ou levemente giradas. | consenso | guia original |
| Embaixo (pausa) | Halteres na altura das orelhas. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre para cima e levemente para dentro, sem bater os halteres. | consenso | guia original |
| Topo (pausa) | Cotovelos quase estendidos. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s, até a altura das orelhas. | consenso | guia original |
| Amplitude | Embaixo: halteres na altura das orelhas, ou um pouco abaixo se o ombro estiver confortável. Em cima: braços quase estendidos sobre os ombros. Não desça mais se a frente do ombro doer. | consenso | guia original |

## Erros a animar
1. **Arquear a lombar** (`arco`): Inclinar o tronco para trás vira um supino inclinado e põe carga na lombar.
2. **Cotovelos para trás** (`cotovelo`): Abrir os cotovelos atrás da linha do corpo aumenta a carga na frente do ombro.
3. **Descer pouco** (`curta`): Parar acima da cabeça corta metade do movimento.

## Músculos
Primário: ombro (frente). Secundários: ombro (lateral), tríceps. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

# Rosca inclinada com halteres (`rosca-inclinada`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/rosca-inclinada.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `rosca-inclinada` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sente com as costas e a cabeça apoiadas, pés firmes no chão. Braços pendurados na vertical, atrás da linha do tronco. Palmas para a frente, ombros encostados no banco. | consenso | guia original |
| Embaixo (pausa) | Braços estendidos, bíceps alongado. | consenso | guia original |
| Subida (concêntrica) | ~1 s. Dobre só o cotovelo; o braço continua na vertical. | consenso | guia original |
| Topo (pausa) | Halter perto do ombro, sem levar o cotovelo à frente. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s, até o braço estender de novo. | consenso | guia original |
| Amplitude | Embaixo: braço quase estendido, sem relaxar o ombro para a frente. Em cima: até onde o cotovelo consegue ir sem sair da vertical. Nas últimas repetições, a parte de baixo vale mais que a de cima: não encurte embaixo. | consenso | guia original |

## Erros a animar
1. **Cotovelos vão para a frente** (`cotovelo`): O braço sai da vertical e a frente do ombro passa a ajudar. O bíceps perde a posição alongada.
2. **Ombros saem do encosto** (`ombro`): O tronco e os ombros vão para a frente para ajudar a subir. A carga está pesada demais.
3. **Não estender embaixo** (`curta`): Voltar só até a metade perde a parte alongada, que é o motivo de fazer a rosca inclinada.

## Músculos
Primário: bíceps. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

# Agachamento goblet com calcanhar elevado (`goblet`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/goblet.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `goblet` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés um pouco mais abertos que o quadril, pontas levemente para fora. Halter na vertical, encostado no peito, mãos em concha embaixo da anilha de cima. Cotovelos apontando para baixo, peito alto. | consenso | guia original |
| Em pé (pausa) | Joelhos quase estendidos, peso no meio do pé. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Os joelhos vão para a frente e para fora, na direção dos pés, e o quadril desce entre os calcanhares. | consenso | guia original |
| Embaixo (pausa) | Quadril na altura do joelho ou abaixo, sem perder a postura. Sem quicar. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre o chão com o pé inteiro, subindo quadril e peito juntos. | consenso | guia original |
| Amplitude | Embaixo: o mais fundo que conseguir com o calcanhar apoiado, o peito alto e a lombar neutra. Para a maioria, quadril na altura do joelho ou abaixo. Em cima: joelhos quase estendidos, sem travar. Pare de descer antes do ponto em que a lombar começa a arredondar e o quadril “vira” para baixo. | consenso | guia original |

## Erros a animar
1. **Joelhos para dentro** (`valgo`): Os joelhos caem para dentro na descida ou na subida. A carga sai do quadríceps e vai para a articulação do joelho.
2. **Tronco cai e a lombar arredonda** (`lombar`): Embaixo, o peito cai e a lombar arredonda. A carga passa para a coluna.
3. **Descer pouco** (`raso`): Parar alto corta a parte da amplitude que mais trabalha o quadríceps.

## Músculos
Primário: quadríceps. Secundários: glúteos, adutores. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

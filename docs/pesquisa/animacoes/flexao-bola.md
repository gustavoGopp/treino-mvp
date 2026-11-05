# Flexão de joelho na bola suíça (`flexao-bola`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/flexao-bola.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `flexao-bola` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deite de costas com os braços no chão, abertos ~30° do corpo, palmas para baixo. Calcanhares em cima da bola, pernas estendidas. Suba o quadril até ombros, quadril e calcanhares ficarem em linha. | consenso | guia original |
| Pernas estendidas (pausa) | Quadril alto, corpo em linha. | consenso | guia original |
| Puxada (concêntrica) | ~1 s. Puxe a bola com os calcanhares em direção ao glúteo, subindo ainda mais o quadril. | consenso | guia original |
| Fim (pausa) | Joelhos a ~90°, pés apoiados em cima da bola. Segure um instante. | consenso | guia original |
| Volta (excêntrica) | ~2 s, estendendo as pernas sem deixar o quadril descer. | consenso | guia original |
| Amplitude | Fim: joelhos a ~90°, com ombros, quadril e joelhos em linha. Início: pernas estendidas, com o quadril ainda alto. O quadril não encosta no chão entre as repetições. | consenso | guia original |

## Erros a animar
1. **Quadril cai ao puxar** (`quadril`): O quadril dobra e desce quando os joelhos dobram. A parte de trás da coxa trabalha menos e o movimento fica mais curto.
2. **Quadril encosta no chão na volta** (`volta`): Descer o quadril entre as repetições tira a tensão. O quadril fica alto do início ao fim da série.
3. **Puxar pouco** (`curta`): Parar com os joelhos longe de 90° corta metade do movimento.

## Músculos
Primário: posteriores da coxa. Secundários: glúteos. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

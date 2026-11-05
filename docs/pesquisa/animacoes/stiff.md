# Stiff com halteres (`stiff`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/stiff.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `stiff` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés na largura do quadril, apontando para a frente. Halteres na frente das coxas, palmas para você. Joelhos levemente dobrados. Esse ângulo fica quase igual a série toda. Escápulas encaixadas, peito aberto, abdômen firme. | consenso | guia original |
| Em pé (pausa) | Quadril estendido, halteres na frente das coxas. | consenso | guia original |
| Descida (excêntrica) | ~2–3 s. Leve o quadril para trás, como se fosse fechar uma porta com o bumbum. Os halteres descem rentes às coxas e às canelas. | consenso | guia original |
| Embaixo (pausa) | Pare quando o posterior da coxa estiver bem alongado e a coluna ainda neutra. | consenso | guia original |
| Subida (concêntrica) | ~1–1,5 s. Empurre o quadril para a frente até ficar em pé, sem jogar o tronco para trás no fim. | consenso | guia original |
| Amplitude | Embaixo: até sentir o posterior bem alongado. Para muita gente os halteres chegam perto do meio da canela, mas isso depende da flexibilidade. Em cima: quadril estendido, sem arquear a lombar para trás. Pare de descer quando a lombar começar a arredondar, mesmo que os halteres não tenham chegado longe. | consenso | guia original |

## Erros a animar
1. **Coluna arredondada** (`arred`): Para descer mais, a lombar arredonda e a carga vai para a coluna.
2. **Agachar em vez de levar o quadril para trás** (`agachar`): Os joelhos dobram e o quadril desce: vira um agachamento e o posterior quase não alonga.
3. **Halteres longe das pernas** (`longe`): Com os halteres à frente, a alavanca na lombar aumenta muito.

## Músculos
Primário: posteriores da coxa. Secundários: glúteos. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

# Remada baixa com triângulo (`remada-baixa`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/remada-baixa.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `remada-baixa` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sente na ponta do banco, pés firmes no chão, joelhos dobrados. Pegada neutra no triângulo (palmas uma para a outra). Coluna neutra, peito alto. | consenso | guia original |
| Alongado (pausa) | Braços estendidos, tronco até ~10–15° inclinado à frente, escápulas abertas. | consenso | guia original |
| Puxada (concêntrica) | ~1 s. O tronco volta à vertical enquanto as escápulas se juntam e os cotovelos vão para trás, rentes ao corpo. | consenso | guia original |
| Fim (pausa) | Triângulo no abdômen, cotovelos atrás do tronco. Segure 1 s. | consenso | guia original |
| Volta (excêntrica) | ~2 s. Estenda os braços e deixe as escápulas abrirem, sem arredondar a lombar. | consenso | guia original |
| Amplitude | Início: braços estendidos, costas alongadas e coluna ainda neutra. Fim: triângulo encostando no abdômen, cotovelos passando a linha do tronco. Não vá além do ponto em que a lombar começa a arredondar. | consenso | guia original |

A altura da polia e a pegada seguem `../08-tecnica-guia.md`, conclusão 1 (`tecnica.remada-baixa.polia`): consenso com base biomecânica.

## Erros a animar
1. **Balançar o tronco** (`balanco`): O tronco vira alavanca: a lombar faz o trabalho e as costas descansam.
2. **Arredondar a coluna no alongamento** (`arred`): Buscar mais alongamento arredondando a lombar coloca a carga na coluna.
3. **Encolher os ombros no fim** (`encolher`): Os ombros sobem: o trapézio de cima assume e o meio das costas trabalha menos.

## Músculos
Primário: costas. Secundários: bíceps, ombro (posterior). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

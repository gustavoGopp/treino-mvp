# Face pull com corda (`face-pull`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/face-pull.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `face-pull` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés na largura do quadril ou um à frente do outro. Segure nas bolinhas da corda, palmas para baixo ou polegares apontando para você. Tronco reto ou levemente inclinado para trás. | consenso | guia original |
| Início (pausa) | Braços estendidos à frente, na altura do rosto. | consenso | guia original |
| Puxada (concêntrica) | ~1 s. Puxe a corda em direção ao rosto abrindo as mãos, com os cotovelos altos. | consenso | guia original |
| Fim (pausa) | Mãos ao lado das orelhas, cotovelos na linha do corpo, antebraços apontando para cima. Segure 1 s. | consenso | guia original |
| Volta (excêntrica) | ~2 s, até os braços estenderem. | consenso | guia original |
| Amplitude | Início: braços estendidos. O ombro pode ir um pouco à frente. Fim: mãos ao lado da cabeça e cotovelos alinhados com o corpo. Não leve os cotovelos mais para trás arqueando a lombar. | consenso | guia original |

## Erros a animar
1. **Cotovelos baixos** (`baixo`): Os cotovelos descem e o movimento vira remada: a parte de trás do ombro trabalha menos.
2. **Jogar o tronco para trás** (`tronco`): O peso do corpo puxa a corda no lugar do ombro.
3. **Encolher os ombros** (`encolher`): Os ombros sobem e a cabeça vai para a frente. Mantenha o pescoço longo.

## Músculos
Primário: ombro (posterior). Secundários: costas. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

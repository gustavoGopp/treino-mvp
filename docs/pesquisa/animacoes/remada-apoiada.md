# Remada com halteres, peito apoiado no banco inclinado (`remada-apoiada`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/remada-apoiada.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `remada-apoiada` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deite de bruços com o peito no encosto e o queixo um pouco além da ponta. Pés firmes no chão atrás, joelhos levemente dobrados. Pegada neutra (palmas uma para a outra), braços estendidos para baixo. | consenso | guia original |
| Alongado (pausa) | Braços estendidos, ombros soltos para baixo e para a frente. | consenso | guia original |
| Puxada (concêntrica) | ~1 s. Puxe os cotovelos para trás, em direção ao quadril, juntando as escápulas. | consenso | guia original |
| Fim (pausa) | Halteres ao lado do quadril, cotovelos atrás do tronco. Segure 1 s. | consenso | guia original |
| Volta (excêntrica) | ~2 s, até os braços estenderem. | consenso | guia original |
| Amplitude | Início: braços estendidos, escápulas afastadas. Fim: cotovelos passando a linha do tronco, escápulas juntas. O peito não sai do banco em nenhum momento. Se precisar sair, a carga está alta. Se o halter encostar no chão antes de o braço estender, suba o encosto para 45°. | consenso | guia original |

## Erros a animar
1. **Peito sai do banco** (`peito`): Levantar o tronco transforma o exercício numa remada com impulso da lombar.
2. **Encolher os ombros** (`encolher`): Os ombros sobem no fim e o trapézio de cima assume o trabalho do meio das costas.
3. **Não estender os braços** (`curta`): Sem deixar os braços estenderem embaixo, você perde o alongamento das costas.

## Músculos
Primário: costas. Secundários: bíceps, ombro (posterior). É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

# Afundo estático com o peso do corpo (`afundo-peso-corpo`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): afundo, nível 2. **Animação em revisão** (`src/engine/exercicios/revisao/afundo-peso-corpo.ts`), feita a partir do `afundo` com halteres aprovado, sem os halteres. Folha: `docs/revisoes/equipamento-minimo/folhas/afundo-peso-corpo.png`.

- **Equipamento:** nenhum (uma parede ou cadeira ao lado, se faltar equilíbrio).
- **Função:** afundo (quadríceps), nível 2.

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Passo largo, pé da frente inteiro no chão, pé de trás na ponta; pés na largura do quadril, como trilhos | consenso | mesma pose do `afundo` aprovado; `nsca2021` (não verificado) |
| Mãos | Na cintura, cotovelos para fora | consenso [opinião: as mãos ficam livres para apoiar numa parede se perder o equilíbrio] | — |
| Tronco | Quase vertical, peso mais na perna da frente | consenso | mesma pose do `afundo` aprovado |
| Descida | ~2–3 s, reta, levando o joelho de trás em direção ao chão, até ficar a poucos centímetros dele | consenso | mesma cadência do `afundo` aprovado |
| Subida | ~1–1,5 s, empurrando o chão com o pé da frente inteiro; os pés não saem do lugar | consenso | mesma cadência do `afundo` aprovado |

## Por que assim
Treino unilateral e bilateral cresceram o músculo de forma parecida (`kassiano2025`; moderada), e o unilateral dobra a carga relativa sem peso extra [opinião]. Sem carga, a série precisa chegar perto da falha (`schoenfeld2017b`, `lopez2021`; robusta), por isso a escada de dificuldade.

## Erros animados
1. **Joelho da frente para dentro** (`valgo`, vista de frente).
2. **Tronco cai para a frente** (`tronco`, vista de lado).
3. **Descer pouco** (`raso`, vista de lado).

## Músculos
Primário: quadríceps (da perna da frente). Secundários: glúteos e adutores (biblioteca: `quadriceps`; `gluteos`, `adutores`). **Selo:** consenso para a divisão por músculo (a mesma do `afundo` aprovado, revisão de anatomia de 02/11/2026, `docs/revisoes/anatomia.md`); unilateral cresce a perna, moderada (`kassiano2025`). **No desenho:** quadríceps da frente (principal), glúteo da frente e quadríceps de trás (secundários), como o `afundo` no estilo clássico. Os adutores da perna da frente só aparecem no estilo novo com uma entrada em `LISTA` (`src/engine/estilo/musculos.ts`), como a do `afundo`; fica para a aprovação.

## Como a carga sobe
Peso do corpo, pela escada do exercício (`src/domain/progressao/escadas.json`): descida de 3 s, pausa de 2 s embaixo, pé da frente num degrau (mais amplitude). Depois, o búlgaro.

## Referência visual
> Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Achados por busca na web em 03/11/2026.

| Canal | Título | URL |
|---|---|---|
| Toni e Ryan (canal Pinnacle Health Club, conferido em 05/11/2026) | How to Split Squat (static lunge) | https://www.youtube.com/watch?v=KynErtGwD2M |
| Allison Ethier (canal conferido pelo título em 05/11/2026) | Bodyweight Split Squat / Stationary Lunges | https://www.youtube.com/watch?v=2xklZsB6bcI |

## Fontes
- `kassiano2025` (já em `../fontes.md`): Kassiano W et al. Comparison of Muscle Growth and Dynamic Strength Adaptations Induced by Unilateral and Bilateral Resistance Training. Sports Med 2025. PMID 39794667. **Resumo lido no PubMed** (status `resumo-PubMed`).
- `schoenfeld2017b` e `lopez2021` (já em `../fontes.md`): carga baixa até a falha. Status `verificado-busca`.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. **Não verificado** (livro pago); mesma referência de consenso das fichas `ponte-gluteo.md` e `goblet-kettlebell.md`. **Não está em `../fontes.md`.**

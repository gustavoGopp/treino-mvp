# Búlgaro com o peso do corpo (`bulgaro-peso-corpo`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): afundo, nível 2. **Animação em revisão** (`src/engine/exercicios/revisao/bulgaro-peso-corpo.ts`), feita a partir do `bulgaro` aprovado, sem o halter, com uma cadeira no lugar do banco e sem a torre de apoio. Folha: `docs/revisoes/equipamento-minimo/folhas/bulgaro-peso-corpo.png`.

- **Equipamento:** nenhum da lista; o pé de trás vai numa cadeira firme ou num sofá.
- **Função:** afundo (quadríceps), nível 2.

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Apoio de trás | Peito do pé de trás no assento de uma cadeira firme (~45 cm), sem rodinhas, encostada na parede, com o encosto do outro lado | consenso | montagem de `../../pesquisa-v2/10-equipamento-minimo.md`, seção 6.1 [opinião, com `kerr2010` e `coffey2026` sobre acidentes] |
| Pé da frente | Longe o bastante da cadeira para o calcanhar ficar no chão embaixo | consenso | mesma pose do `bulgaro` aprovado |
| Mãos | Na cintura | consenso [opinião: sem a torre do original; uma mão na parede, se faltar equilíbrio, aparece só no texto] | — |
| Tronco | Levemente inclinado à frente, peso na perna da frente | consenso | mesma pose do `bulgaro` aprovado |
| Descida e subida | ~2–3 s descendo reto até a coxa da frente perto da horizontal; ~1–1,5 s subindo, empurrando com o pé da frente inteiro | consenso | mesma cadência do `bulgaro` aprovado |

## Por que assim
Unilateral e bilateral cresceram o músculo de forma parecida (`kassiano2025`; moderada); um ensaio de 2026 usou o próprio búlgaro e cresceu a perna (`bulgaro2026`; **não verificado**). Com o pé de trás alto, quase todo o peso fica na perna da frente: é o degrau mais difícil sem carga antes do agachamento numa perna só [opinião]. A cadeira é móvel de casa, não de treino: ela precisa ser testada antes (montagem abaixo).

## Erros animados
1. **Joelho da frente para dentro** (`valgo`, vista de frente).
2. **Pé da frente perto da cadeira** (`perto`, vista de lado): o calcanhar sobe e o peso vai para a ponta do pé e para o joelho.
3. **Descer pouco** (`raso`, vista de lado).

## Montagem segura
Cadeira firme, sem rodinhas e que não seja dobrável, encostada na parede; empurre e puxe antes da 1ª série para ver se ela escorrega ou balança. Se o joelho da frente doer, desça menos. Texto da seção 6.1 e do cartão `seguranca.montagem` de `../../pesquisa-v2/10-equipamento-minimo.md` (**[opinião]**, consenso com `kerr2010` e `coffey2026`).

## Músculos
Primário: quadríceps (da perna da frente). Secundários: glúteos e adutores (biblioteca: `quadriceps`; `gluteos`, `adutores`). **Selo:** consenso para a divisão (a mesma do `bulgaro` aprovado e da revisão de anatomia, `docs/revisoes/anatomia.md`); unilateral cresce a perna, moderada (`kassiano2025`). **No desenho:** quadríceps da frente (principal) e glúteo da frente (secundário). Os adutores só aparecem no estilo novo com uma entrada em `LISTA` (`src/engine/estilo/musculos.ts`), como a do `bulgaro`; fica para a aprovação.

## Como a carga sobe
Peso do corpo, pela escada do exercício (`src/domain/progressao/escadas.json`): descida de 3 s, pausa de 2 s embaixo, pé da frente num apoio baixo (mais amplitude). Com halteres, o `bulgaro`.

## Referência visual
> Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Achados por busca na web em 03/11/2026, menos o terceiro, que vem de `../../pesquisa-v2/10-equipamento-minimo.md`, pergunta 7.

| Canal | Título | URL |
|---|---|---|
| Oleksiy Torokhtiy (no título) | Bodyweight Bulgarian Split Squat / Torokhtiy Weightlifting Library | https://www.youtube.com/watch?v=oGTVhFgRnes |
| não confirmado | Chair Bulgarian Split Squat | https://www.youtube.com/watch?v=zFbhMqkvg6o |
| não confirmado (ajustes para dor no joelho) | How To Eliminate Knee Pain In The Split Squat: Try These Adjustments | https://www.youtube.com/watch?v=yHvF3BVUII8 |

## Fontes
- `kassiano2025` (já em `../fontes.md`): PMID 39794667. **Resumo lido no PubMed** (status `resumo-PubMed`).
- `bulgaro2026` (já em `../fontes.md`): Unilateral low-load blood flow restriction vs. high-load training in the Bulgarian split squat. Front Physiol 2026. PMID 41983008. **NÃO VERIFICADO** (faltam autores e volume); nenhum número dele é usado aqui.
- `kerr2010` e `coffey2026` (já em `../fontes.md`): lesões de musculação no pronto-socorro, base do cartão de montagem segura. Status `resumo-PubMed`.

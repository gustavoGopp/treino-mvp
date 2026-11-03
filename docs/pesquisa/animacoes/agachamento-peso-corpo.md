# Agachamento com o peso do corpo (`agachamento-peso-corpo`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): agachar, nível 3, junto com o agachamento com elástico. **Animação em revisão** (`src/engine/exercicios/revisao/agachamento-peso-corpo.ts`), feita a partir do `goblet` aprovado, sem o halter e sem a anilha sob o calcanhar. Folha: `docs/revisoes/equipamento-minimo/folhas/agachamento-peso-corpo.png`.

- **Equipamento:** nenhum.
- **Função:** agachar (quadríceps), nível 3.

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Em pé, pés um pouco mais abertos que o quadril, pontas levemente para fora, calcanhares no chão (sem anilha embaixo) | consenso | mesma base do `goblet` aprovado; `nsca2021` (não verificado) |
| Braços | Estendidos à frente, mais ou menos na altura dos ombros e com as mãos se aproximando, como contrapeso; ficam assim a repetição toda | consenso [opinião: escolhido no lugar das mãos no peito porque ajuda a manter o calcanhar no chão sem a anilha] | `nsca2021` (não verificado) |
| Descida | ~2–3 s; joelhos para a frente e para fora, na direção dos pés; o quadril desce entre os calcanhares e o tronco inclina um pouco mais que no goblet | consenso | mesma cadência do `goblet` aprovado |
| Profundidade | Embaixo, quadril na altura do joelho, sem quicar, com calcanhar apoiado e lombar neutra | um estudo (agachar fundo cresceu mais glúteo e adutores que o meio agachamento) | `kubo2019` |
| Subida | ~1–1,5 s, empurrando o chão com o pé inteiro, quadril e peito sobem juntos | consenso | mesma cadência do `goblet` aprovado |
| Joelho e pé | O joelho pode passar da ponta do pé; o que importa é seguir a direção do pé | consenso | mesmo guia do `goblet` aprovado |

## Por que assim
Sem carga, a série só cresce o músculo se chegar perto da falha: com carga baixa até a falha, a hipertrofia é parecida com a de carga alta (`schoenfeld2017b`, `lopez2021`; robusta). Por isso o agachamento sem peso tem uma escada própria de dificuldade (`progressao.escada-por-exercicio`; consenso). Sem a anilha sob o calcanhar, o tornozelo limita mais a descida: o tronco inclina um pouco mais e os braços à frente ajudam no equilíbrio [opinião].

## Erros animados
1. **Joelhos para dentro** (`valgo`, vista de frente).
2. **Calcanhar sai do chão** (`calcanhar`, vista de lado): o peso vai para a ponta do pé.
3. **Descer pouco** (`raso`, vista de lado).

## Músculos
Primário: quadríceps. Secundários: glúteos e adutores (biblioteca: `quadriceps`; `gluteos`, `adutores`). Agachar fundo aumentou mais o volume do glúteo máximo e dos adutores que o meio agachamento (`kubo2019`; **um estudo**). **No desenho:** a animação em revisão realça o quadríceps (principal) e o glúteo (secundário). Os adutores só aparecem no estilo novo com uma entrada na lista de músculos do motor (`LISTA` em `src/engine/estilo/musculos.ts`, como a do `goblet`), que não foi mexida aqui: fica para a aprovação.

## Como a carga sobe
Peso do corpo, pela escada do exercício (`src/domain/progressao/escadas.json`): descida de 3 s, pausa de 2 s embaixo, 1,5 repetição. Depois, o afundo e o búlgaro.

## Referência visual
> Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Achados por busca na web em 03/11/2026; canal não confirmado nos dois.

| Canal | Título | URL |
|---|---|---|
| não confirmado | How to Perform the Bodyweight Squat - Exercise Tutorial | https://www.youtube.com/watch?v=RClKKQqsvXA |
| não confirmado | How to Do a Bodyweight Squat (Perfect Form + Common Mistakes) | https://www.youtube.com/watch?v=eWatHIujxPM |

## Fontes
- `kubo2019` (já em `../fontes.md`): Kubo K et al. Effects of squat training with different depths on lower limb muscle volumes. Eur J Appl Physiol 2019. PMID 31230110. **Resumo lido no PubMed** (status `resumo-PubMed`).
- `schoenfeld2017b` (já em `../fontes.md`): Schoenfeld BJ et al. Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training. J Strength Cond Res 2017. PMID 28834797. Status `verificado-busca`.
- `lopez2021` (já em `../fontes.md`): Lopez P et al. Resistance Training Load Effects on Muscle Hypertrophy and Strength Gain. Med Sci Sports Exerc 2021. PMID 33433148. Status `verificado-busca`.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); a mesma referência de consenso das fichas `ponte-gluteo.md` e `goblet-kettlebell.md`. **Não está em `../fontes.md`.**

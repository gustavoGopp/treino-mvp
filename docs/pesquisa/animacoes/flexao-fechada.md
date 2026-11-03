# Flexão de braço com as mãos juntas (`flexao-fechada`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): `empurrar-h`, peso do corpo, sem equipamento. **Animação nova, em revisão** (`src/engine/exercicios/revisao/flexao-fechada.ts`; folha em `../../revisoes/equipamento-minimo/folhas/flexao-fechada.png`). Até a aprovação, o app mostra o cartão de texto (`src/conteudo/exercicios/flexao-fechada.json`).

- **Equipamento:** nenhum (o chão; uma mesa firme para a versão mais fácil)
- **Função:** tríceps sem equipamento e empurrar horizontal (`docs/pesquisa-v2/10-equipamento-minimo.md`, "Exercícios candidatos")
- **Base do desenho:** a `flexao` aprovada, com as mesmas poses do tronco e das pernas; mudam as mãos e os cotovelos

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Mãos | Na largura dos ombros (um pouco menos), abaixo da parte de baixo do peito. De cima, as mãos ficam por dentro da linha dos ombros | consenso | `nsca2021` (não verificado); os estudos de EMG falam em "mãos juntas" (*narrow base*), e a distância exata não aparece nos resumos lidos (`cogley2005`, `marcolin2015`) |
| Cotovelos | Vão para trás, rentes ao corpo, na descida e na subida (vista de cima) | consenso | `nsca2021` (não verificado) |
| Corpo | Prancha: linha reta da cabeça aos calcanhares, o corpo desce inteiro junto | consenso | mesma técnica da `flexao` aprovada |
| Amplitude | Desce até o peito chegar perto das mãos; sobe até os braços estenderem | consenso | mesma técnica da `flexao` aprovada |
| Cadência | Descida ~2 s, subida ~1 s | consenso | mesma cadência da `flexao` aprovada |
| "Diamante" | **Não** animado: a animação usa as mãos na largura dos ombros. Nenhum estudo separa o diamante das mãos juntas, e ninguém mediu a carga no punho | consenso | P4 da pesquisa (nenhuma fonte) |

## Por que assim
Com as mãos juntas, a flexão ativou mais o tríceps (e o peitoral) que com as mãos afastadas em dois estudos de EMG, na mesma direção (`cogley2005`, 40 pessoas, 1 repetição; `marcolin2015`, 8 jovens, 10 repetições). Selo **moderada** para "ativa mais o tríceps"; EMG mede ativação, não crescimento, então "cresce mais o tríceps" é **consenso**. A flexão com carga equivalente cresceu peito e tríceps como o supino (`kikuchi2017`; **um estudo**). Ela cobre o tríceps sem a extensão de ombro do mergulho no banco **[opinião, da P4]**.

## Erros animados
1. **Cotovelos abertos para os lados** (`cot`, vista de cima).
2. **Quadril cai** (`quadril`, vista lateral).
3. **Descer pouco** (`curta`, vista lateral).

## Músculos
Primários: tríceps e peito. Secundário: ombro anterior. É o que a biblioteca conta (`triceps`, `peito` / `ombro_anterior`). Selo: **moderada** para tríceps e peito trabalharem (`cogley2005`, `marcolin2015`, EMG) e **um estudo** para crescerem (`kikuchi2017`). O ombro anterior como secundário segue a `flexao` (consenso).
**Escolha de desenho:** o abdômen firma a prancha, mas fica fora do desenho. Na `flexao`, ele aparece listrado ("só ajuda"), só que essa lista fica no motor (`src/engine/estilo/musculos.ts`, `SO_AJUDA`), e a revisão não a edita. Se o Gustavo quiser o abdômen listrado, a entrada entra junto com a aprovação.

## Montagem segura
Sem móvel. Texto da tabela 6.1 (P6), no cartão: "Com dor no punho, faça com as mãos fechadas numa toalha dobrada, segurando dois halteres como pegadores, ou com as mãos numa mesa firme (mais fácil)." Selo: consenso (a pegada muda o punho; não há ensaio em pessoas com dor, P6).

## Como a carga sobe
Peso do corpo, pela escada da flexão (tabela 5.3, `progressao.escada-por-exercicio`, proposta): mãos numa mesa firme → no chão → descida de 3 s → pés num degrau → pausa de 2 s embaixo. Selo: consenso (a ordem).

## Referência visual
Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Canal não confirmado (P7).
- "Triceps FOCUSED Push Up Variation (Close Grip Push Up)": https://www.youtube.com/watch?v=aWixj7ey758
- "Close-Grip Push Ups": https://www.youtube.com/watch?v=r8swN_LqR14

## Fontes
- `cogley2005`: Cogley RM, Archambault TA, Fibeger JF, et al. Comparison of muscle activation using various hand positions during the push-up exercise. J Strength Cond Res 2005;19(3):628–633. PMID 16095413. **Resumo lido no PubMed** na sessão de equipamento mínimo (03/11/2026); texto completo não lido. Chave em `docs/pesquisa-v2/10-equipamento-minimo.md`, "Fontes novas" (ainda fora de `../fontes.md`).
- `marcolin2015`: Marcolin G, Petrone N, Moro T, et al. Selective Activation of Shoulder, Trunk, and Arm Muscles: A Comparative Analysis of Different Push-Up Variants. J Athl Train 2015;50(11):1126–1132. PMID 26488636. **Resumo lido no PubMed** (03/11/2026); texto completo não lido. Chave em "Fontes novas" (ainda fora de `../fontes.md`).
- `kikuchi2017` (já em `../fontes.md`): Kikuchi N, Nakazato K. Low-load bench press and push-up induce similar muscle hypertrophy and strength gain. J Exerc Sci Fit 2017;15(1):37–42. PMID 29541130. **Resumo lido no PubMed.**
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

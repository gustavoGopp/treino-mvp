# Hip thrust (elevação do quadril com barra, costas no banco) (`hip-thrust`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** barra longa + banco (`barra_longa`, `banco_*`) ou smith + banco
- **Função do T3:** extensão de quadril para o glúteo (glúteos, 2ª função: "hip thrust ou ponte"). Selo da função no T3: um estudo.
- **Frequência estimada:** 0,75 vaga por semana na academia completa (divide a vaga com o glúteo na máquina). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Banco encostado na parede ou travado para não deslizar; almofada de espuma na barra, sobre o quadril; travas nas anilhas | consenso | `seguranca-t5`; `nsca2021` (não verificado) |
| Posição | Borda do banco logo abaixo das escápulas; pés no chão na largura do quadril; no topo, canelas quase verticais | consenso | `nsca2021` (não verificado) |
| Subida | Empurra pelos calcanhares até o quadril alinhar com o tronco e as coxas; pausa de ~1 s no topo | consenso | `nsca2021` (não verificado) |
| Coluna | Sem arquear a lombar no topo; costelas para baixo, queixo levemente recolhido | consenso | `nsca2021` (não verificado) |

## Por que assim
Num ensaio de 9 semanas, hip thrust e agachamento cresceram o glúteo de forma parecida, e o agachamento cresceu mais o quadríceps e o adutor (Plotkin 2023; um estudo). O hip thrust teve EMG de glúteo maior que o agachamento (Contreras 2015, 13 mulheres treinadas) e a ponte com barra no chão teve EMG de glúteo maior que o hip thrust (Kennedy 2024, 10 homens). EMG não mede crescimento, então a ponte e o hip thrust ficam como **alternativas equivalentes** (selo: consenso). Uma revisão sistemática classificou o hip thrust entre os exercícios de ativação "muito alta" do glúteo máximo (Krause Neto 2020; EMG).

## Erros a animar
1. **Arquear a lombar** no topo em vez de estender o quadril.
2. **Empurrar pela ponta dos pés** (calcanhar sai do chão).
3. **Subir pouco** (quadril não alinha).
4. **Banco desliza** (falha de montagem).

## Músculos
Primário: glúteos. Secundário: posteriores. Proposta para a biblioteca: `gluteos`; secundário `posteriores`; padrão novo `extensao-quadril`.

## Como a carga sobe (para a progressão e a calibração do T6)
Com barra: kg total, menor par de anilhas, fórmula na calibração. No smith: kg de anilhas por lado, por passos.

## Fontes
- `plotkin2023`: Plotkin DL, Rodas MA, Vigotsky AD et al. Hip thrust and back squat training elicit similar gluteus muscle hypertrophy and transfer similarly to the deadlift. Front Physiol 2023;14:1279170. PMID 37877099. Resumo lido no PubMed em 01/11/2026.
- `contreras2015`: Contreras B, Vigotsky AD, Schoenfeld BJ et al. A Comparison of Gluteus Maximus, Biceps Femoris, and Vastus Lateralis Electromyographic Activity in the Back Squat and Barbell Hip Thrust Exercises. J Appl Biomech 2015;31(6):452-458. PMID 26214739. Resumo lido no PubMed em 01/11/2026.
- `kennedy2024`: Kennedy D, Casebolt JB, Farren GL et al. Electromyographic differences of the gluteus maximus, gluteus medius, biceps femoris, and vastus lateralis between the barbell hip thrust and barbell glute bridge. Sports Biomech 2024;23(12):2935-2949. PMID 35586943. Resumo lido no PubMed em 01/11/2026.
- `krauseneto2020`: Krause Neto W, Soares EG, Vieira TL et al. Gluteus Maximus Activation during Common Strength and Hypertrophy Exercises: A Systematic Review. J Sports Sci Med 2020;19(1):195-203. PMID 32132843. Resumo lido no PubMed em 01/11/2026.
- `seguranca-t5`: Cartão de "montagem segura" aprovado no T5 (`docs/pesquisa-v2/06-populacoes-e-seguranca.md`); consenso do projeto.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

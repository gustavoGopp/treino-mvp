# Supino reto no smith (`supino-smith`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** smith + banco (`smith`, `banco_reto` ou `banco_regulavel`)
- **Função do T3:** empurrar horizontal (peito, 1ª função). Selo da função no T3: um estudo.
- **Frequência estimada:** 0,31 vaga por semana na academia completa. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Banco reto centrado sob a barra, de modo que ela desça na linha do meio do peito; travas de segurança logo acima do peito | consenso | `seguranca-t5`; `nsca2021` (não verificado) |
| Pegada | Um pouco mais aberta que os ombros (até ~1,5 vez); antebraços quase verticais embaixo | consenso | `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` por analogia |
| Cotovelos | ~30–60° do tronco ("seta", não "T"); escápulas juntas e para baixo | consenso | `tecnica.supino-halteres.cotovelos` (regras.md) |
| Amplitude | Desce até encostar de leve no peito ou até um alongamento confortável; sobe sem travar os cotovelos | consenso | `nsca2021` (não verificado) |

## Por que assim
Com cargas altas, o supino livre ativou mais o deltoide médio que o supino no smith (Schick 2010; EMG; um estudo). Noutro estudo, o smith ativou mais o deltoide anterior, e o supino com halteres ativou mais o peitoral que com barra (Farias 2017, 19 homens treinados; EMG; um estudo). EMG não mede crescimento. Os ensaios de hipertrofia não acharam diferença entre máquina e peso livre (Haugen 2023; Hernández-Belmonte 2023; robusta).

## Erros a animar
1. **Banco fora do lugar** (a barra desce no pescoço ou na barriga).
2. **Cotovelos em "T"** (90° do tronco).
3. **Quicar a barra** no peito.

## Músculos
Primário: peito. Secundários: ombro anterior e tríceps. Na biblioteca: `peito`; secundários `ombro_anterior`, `triceps`.

## Como a carga sobe (para a progressão e a calibração do T6)
Kg de anilhas por lado, com passos do menor par. A calibração não usa a fórmula, porque o peso da barra do smith varia.

## Fontes
- `schick2010`: Schick EE, Coburn JW, Brown LE et al. A comparison of muscle activation between a Smith machine and free weight bench press. J Strength Cond Res 2010;24(3):779-784. PMID 20093960. Resumo lido no PubMed em 01/11/2026.
- `farias2017`: de Araújo Farias D, Willardson JM, Paz GA et al. Maximal Strength Performance and Muscle Activation for the Bench Press and Triceps Extension Exercises Adopting Dumbbell, Barbell, and Machine Modalities Over Multiple Sets. J Strength Cond Res 2017;31(7):1879-1887. PMID 27669189. Resumo lido no PubMed em 01/11/2026.
- `haugen2023`: Haugen ME, Vårvik FT, Larsen S et al. Effect of free-weight vs. machine-based strength training on maximal strength, hypertrophy and jump performance – a systematic review and meta-analysis. BMC Sports Sci Med Rehabil 2023;15(1):103. PMID 37582807. Resumo lido no PubMed em 01/11/2026.
- `hernandezbelmonte2023`: Hernández-Belmonte A, Martínez-Cava A, Buendía-Romero Á et al. Free-Weight and Machine-Based Training Are Equally Effective on Strength and Hypertrophy: Challenging a Traditional Myth. Med Sci Sports Exerc 2023;55(12):2316-2327. PMID 37535335. Resumo lido no PubMed em 01/11/2026.
- `seguranca-t5`: Cartão de "montagem segura" aprovado no T5 (`docs/pesquisa-v2/06-populacoes-e-seguranca.md`); consenso do projeto.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/supino-smith.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (peito; ombro anterior e tríceps) e a biblioteca; a nota, do erro "Banco fora do lugar" e da linha Montagem | consenso | `seguranca-t5`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Montagem, Pegada e Cotovelos da tabela de técnica | consenso | `seguranca-t5`; `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` |
| Variações (`vary`) | linhas Pegada (até ~1,5 vez a largura dos ombros) e Amplitude ("até encostar de leve no peito ou até um alongamento confortável") | consenso | `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` |
| Nota (`note`) | a montagem do cartão (o banco centrado e as travas logo acima do peito) | consenso | `seguranca-t5` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/supino-smith.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a altura das travas ("logo acima do peito") parece não combinar com a amplitude (a barra encosta de leve no peito) nem com a regra `seguranca.montagem` (no smith, travas logo abaixo do ponto mais baixo); a nota seguiu o cartão (anotado em `pedidos.md`). A ficha não diz o que os cotovelos em T fazem sentir (o cartão também não), e a nota de onde sentir ficou com o banco fora do lugar. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor. A ficha não diz o que varia de pessoa para pessoa além da pegada e da profundidade.

# Rosca na máquina (tipo Scott) (`rosca-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de rosca (`rosca_maquina`, novo)
- **Função do T3:** rosca com o braço à frente do corpo (bíceps, 1ª função).
- **Frequência estimada:** 0,38 vaga por semana na academia completa. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Assento na altura em que o cotovelo fica alinhado com o eixo da máquina; braços apoiados | consenso | `nsca2021` (não verificado) |
| Movimento | Sobe até o fim e desce controlando até o cotovelo quase estender | consenso | `nsca2021` (não verificado) |

## Por que assim
A máquina reproduz a Scott (braço à frente, apoiado). A Scott ≈ outras roscas no crescimento total (Kobayashi 2026; Attarieh 2025; um estudo cada), e máquina ≈ peso livre (Haugen 2023; robusta). Aplicar os estudos da Scott à máquina é inferência (consenso).

## Erros a animar
1. **Tirar o braço** do apoio.
2. **Descer pouco**.

## Músculos
Primário: bíceps. Na biblioteca: `biceps`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `kobayashi2026`: Kobayashi Y, Maeo S, Eihara Y et al. Exercise-specific preferential hypertrophy of individual elbow flexor muscles after incline versus preacher dumbbell curl training. J Sports Sci 2026 (on-line antes da versão impressa). PMID 42829982. Resumo lido no PubMed em 01/11/2026.
- `attarieh2025`: Attarieh P, Nunes JP, Khani S et al. Comparison Between Shoulder Flexed and Extended Positions in Elbow Flexion Resistance Training on Regional Hypertrophy and Maximum Strength: Preacher versus Bayesian Cable Curls. Eur J Sport Sci 2025;25(4):e12279. PMID 40082069. Resumo lido no PubMed em 01/11/2026.
- `haugen2023`: Haugen ME, Vårvik FT, Larsen S et al. Effect of free-weight vs. machine-based strength training on maximal strength, hypertrophy and jump performance – a systematic review and meta-analysis. BMC Sports Sci Med Rehabil 2023;15(1):103. PMID 37582807. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/rosca-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (bíceps; igual à biblioteca); a nota, da linha Ajuste (o cotovelo no eixo, os braços apoiados) e do erro "Tirar o braço do apoio" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Ajuste da tabela de técnica e a dica "Cotovelo no eixo" do cartão | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Ajuste e Movimento e o erro "Descer pouco" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/rosca-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura do assento foi para a conferência. A ficha tem só duas linhas de técnica: não diz a pegada, a altura do "fim" da subida nem nada que varie de pessoa para pessoa (o `vary` só traz o que não muda; a animação parou a subida em 120° de cotovelo e partiu o apoio em dois, de desenho). Com tão pouco na ficha, a conferência tem 3 itens que se repetem um pouco (o assento existe para pôr o cotovelo no eixo). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

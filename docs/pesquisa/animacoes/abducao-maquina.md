# Abdução de quadril na cadeira abdutora (`abducao-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** cadeira abdutora e adutora (`cadeira_abdutora_adutora`, novo)
- **Função do T3:** abdução de quadril (glúteos, 3ª função: complemento para o glúteo médio). Selo da função no T3: consenso; atualizado aqui (ver abaixo).
- **Frequência estimada:** 0,38 vaga por semana na academia completa (só nos modelos com vaga de abdução). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado com as costas no encosto; almofadas do lado de fora dos joelhos | consenso | `nsca2021` (não verificado) |
| Movimento | Abre as pernas até o fim confortável, pausa ~1 s e volta controlando, sem deixar as placas baterem | consenso | `nsca2021` (não verificado) |
| Tronco | Parado; não embala com o corpo | consenso | `nsca2021` (não verificado) |

## Por que assim
Na máquina abdutora, a ativação do glúteo médio foi igual à de dois exercícios no chão, com menos ativação do tensor da fáscia lata (Paz 2022, 11 homens; EMG; um estudo). Num ensaio de hipertrofia com abdução **na polia**, o glúteo médio e o mínimo cresceram pouco (+4%) e o glúteo máximo cresceu sobretudo na parte de cima (+10% na região proximal) (Attarieh 2026; um estudo). A abdução fica como **complemento** e não substitui a extensão de quadril. O selo da função muda de "consenso" para "um estudo".

## Erros a animar
1. **Embalar o tronco** para a frente e para trás.
2. **Abrir pouco**.
3. **Soltar** a volta.

## Músculos
Primário: glúteos (médio, mínimo e parte de cima do máximo). Proposta: `gluteos`; padrão novo `abducao-quadril`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `paz2022`: de Almeida Paz I, Frigotto MF, Cardoso CA et al. Hip abduction machine is better than free weights to target the gluteus medius while minimizing tensor fascia latae activation. J Bodyw Mov Ther 2022;30:160-167. PMID 35500965. Resumo lido no PubMed em 01/11/2026.
- `attarieh2026`: Attarieh P, Nunes JP, Khani S et al. Regional Hypertrophy of the Gluteal Muscles Is Task-Specific: Differential Responses to 10 Weeks of Hip Extension Versus Hip Abduction Training. J Strength Cond Res 2026 (publicado on-line antes da versão impressa). PMID 42842490. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/abducao-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (glúteos: médio, mínimo e a parte de cima do máximo) e o alvo do cartão; a nota, do erro "Embalar o tronco" e da linha Tronco | um estudo (a parte de cima do glúteo máximo, na polia); consenso (a nota) | `attarieh2026`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Tronco da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Movimento ("até o fim confortável", pausa de ~1 s, sem deixar as placas baterem) e a linha Tronco | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/abducao-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não dá número para o "fim confortável" (os ângulos da animação, 8° no começo e 36° no fim, são de desenho) e não diz como regular a máquina (o cartão não tem montagem). O resultado da parte de cima do glúteo é da abdução na polia, não na máquina. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

# Remada baixa na estação (sentado, pés na plataforma) (`remada-baixa-estacao`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** estação de remada baixa (`estacao_remada`, novo) ou a remada do multifuncional
- **Função do T3:** puxar horizontal (costas, 2ª função). Selo da função no T3: consenso.
- **Frequência estimada:** 0,30 vaga por semana na academia completa; 0,38 no condomínio. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, pés na plataforma, joelhos levemente dobrados; triângulo na mão; tronco quase vertical | consenso | `nsca2021` (não verificado) |
| Polia | A da estação já é baixa e alinhada com o assento; o cabo fica quase horizontal | consenso | `tecnica.remada-baixa.polia` (regras.md) |
| Movimento | Puxa até as mãos chegarem ao abdômen, cotovelos rentes ao corpo; na volta alonga as escápulas sem dobrar a lombar | consenso | `tecnica.remada-baixa.polia` |
| Pegada | Fechada (triângulo), com o ombro pouco aberto | um estudo (EMG, revisão narrativa) | `difonza2026` |

## Por que assim
Uma revisão narrativa de EMG associou, em estudos separados, a pegada mais fechada e o ombro menos aberto a mais ativação do latíssimo na remada sentada (Di Fonza 2026). Fixar ou soltar as escápulas mudou a distribuição da ativação (Padovan 2025). EMG não mede crescimento. A diferença para a `remada-baixa` de hoje, feita no banco com polia ajustável, é a montagem: na estação, o assento e a polia já estão no lugar.

## Erros a animar
1. **Balançar o tronco** para trás para puxar.
2. **Arredondar a lombar** na volta.
3. **Cotovelos abertos**.

## Músculos
Primário: costas. Secundários: bíceps e ombro posterior. Na biblioteca: `costas`; secundários `biceps`, `ombro_posterior`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `difonza2026`: Di Fonza D, Di Claudio G, Colantuono G et al. Electromyographic Analysis of Latissimus Dorsi Activation During Common Resistance Training Exercises: A Narrative Review. J Funct Morphol Kinesiol 2026;11(3):315. PMID 42647355. Resumo lido no PubMed em 01/11/2026.
- `padovan2026`: Padovan R, Cè E, Longo S et al. High-Density Surface Electromyography Excitation of Prime Movers Across Scapular Positions in the Seated Row. J Funct Morphol Kinesiol 2025;11(1):6. PMID 41562724. Resumo lido no PubMed em 01/11/2026. Provavelmente é o estudo citado como `padovan2026` em `../08-tecnica-guia.md`, com PMID não verificado; a conferir na entrada para `fontes.md`.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/remada-baixa-estacao.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior; igual à biblioteca); a nota, dos erros "Arredondar a lombar" e "Balançar o tronco" e da linha Movimento | consenso | `nsca2021` (não verificado); `tecnica.remada-baixa.polia` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Pegada da tabela de técnica e o erro "Cotovelos abertos" | consenso; a pegada fechada, um estudo (EMG, revisão narrativa) | `nsca2021` (não verificado); `difonza2026` |
| Variações (`vary`) | linha Polia (a da estação já é baixa e alinhada com o assento) e "Por que assim" (na estação, o assento e a polia já estão no lugar), mais a linha Movimento | consenso | `tecnica.remada-baixa.polia`; `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/remada-baixa-estacao.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz onde a pessoa senta no banco nem a altura da polia (a animação pôs a plataforma onde o joelho dobra 25° e a polia a 64 cm, de desenho). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

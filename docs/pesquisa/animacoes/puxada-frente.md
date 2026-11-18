# Puxada pela frente na estação (puxador alto) (`puxada-frente`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** estação de puxada (`estacao_puxada`, novo) ou o puxador do multifuncional
- **Função do T3:** puxar vertical (costas, 1ª função). Selo da função no T3: consenso.
- **Frequência estimada:** 0,35 vaga por semana na academia completa; 0,88 no condomínio. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, coxas presas sob a almofada, braços estendidos em cima | consenso | `nsca2021` (não verificado) |
| Pegada | Pronada (palmas para a frente), mãos a ~1 a 1,5 vez a largura dos ombros | moderada (EMG) | `lusk2010`; `andersen2014`; `tecnica.barra-fixa.pegada` |
| Trajeto | Barra desce à frente do rosto até a parte de cima do peito; **nunca atrás da nuca** | um estudo (EMG, revisão narrativa) | `difonza2026` |
| Volta | Sobe até os braços estenderem por completo, sem soltar o peso | consenso | `selecao.amplitude` |

## Por que assim
A pegada pronada ativou mais o latíssimo que a supinada, e a largura não mudou isso (Lusk 2010; EMG). Larguras de 1 a 2 vezes a distância entre os ombros deram EMG parecida, e a pegada mais aberta reduziu a carga máxima (Andersen 2014; EMG). Uma revisão narrativa achou o trajeto pela frente o mais associado a ativação alta do latíssimo (Di Fonza 2026). Não há ensaio de hipertrofia comparando pegadas (`08-tecnica-guia.md`).

## Erros a animar
1. **Puxar atrás da nuca**.
2. **Jogar o tronco para trás** para descer a barra.
3. **Não estender os braços** em cima.

## Músculos
Primário: costas. Secundários: bíceps e ombro posterior. Na biblioteca: `costas`; secundários `biceps`, `ombro_posterior`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `lusk2010`: Lusk SJ, Hale BD, Russell DM. Grip width and forearm orientation effects on muscle activity during the lat pull-down. J Strength Cond Res 2010;24(7):1895-1900. PMID 20543740. Resumo lido no PubMed em 01/11/2026.
- `andersen2014`: Andersen V, Fimland MS, Wiik E, Skoglund A, Saeterbakken AH. Effects of grip width on muscle strength and activation in the lat pull-down. J Strength Cond Res 2014;28(4):1135-1142. PMID 24662157. Já em `../fontes.md`.
- `difonza2026`: Di Fonza D, Di Claudio G, Colantuono G et al. Electromyographic Analysis of Latissimus Dorsi Activation During Common Resistance Training Exercises: A Narrative Review. J Funct Morphol Kinesiol 2026;11(3):315. PMID 42647355. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/puxada-frente.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior; igual à biblioteca); a nota, do erro "Jogar o tronco para trás" e da linha Trajeto | consenso; o trajeto pela frente, um estudo (EMG, revisão narrativa) | `nsca2021` (não verificado); `difonza2026` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Pegada da tabela de técnica | consenso; a pegada, moderada (EMG) | `nsca2021` (não verificado); `lusk2010`; `andersen2014` |
| Variações (`vary`) | linha Pegada (de ~1 a 1,5 vez a largura dos ombros) e as linhas Trajeto e Volta | moderada (a pegada, EMG); um estudo (o trajeto); consenso (a volta) | `lusk2010`; `andersen2014`; `difonza2026`; `selecao.amplitude` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/puxada-frente.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então o ajuste da almofada das coxas foi para a conferência. A ficha não diz a altura da almofada nem do assento (na animação, de desenho). A seção "Por que assim" fala de ativação (EMG), e não há ensaio de crescimento comparando pegadas; a ficha diz isso. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

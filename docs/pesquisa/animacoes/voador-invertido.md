# Voador invertido (crucifixo invertido na máquina) (`voador-invertido`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** voador com posição invertida (`voador` com o atributo `invertido`)
- **Função do T3:** ombro posterior (1ª função: crucifixo invertido). Selo da função no T3: consenso.
- **Frequência estimada:** 0,42 vaga por semana na academia completa (divide com o crucifixo inverso com halteres e o face pull). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado de frente para o encosto, peito apoiado; pegadores na altura dos ombros | consenso | `nsca2021` (não verificado) |
| Movimento | Abre os braços para trás, com os cotovelos levemente dobrados, até a linha do corpo; volta controlando | consenso | `nsca2021` (não verificado) |
| Ombros | Sem encolher os ombros nem juntar demais as escápulas no fim | consenso | `nsca2021` (não verificado) |

## Por que assim
Em 12 homens treinados, o voador invertido teve mais ativação do deltoide posterior do que a remada sentada e a puxada (Franke 2015; EMG; um estudo). Não achei ensaio de hipertrofia para o ombro posterior (T3): a escolha continua sendo consenso.

## Erros a animar
1. **Encolher os ombros**.
2. **Embalar o tronco** para trás.
3. **Abrir pouco**.

## Músculos
Primário: ombro posterior. Secundário: costas (meio do trapézio). Na biblioteca: `ombro_posterior`; secundário `costas`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `franke2015`: De Azevedo Franke R, Ehlers Botton C, Rodrigues R et al. Analysis of anterior, middle and posterior deltoid activation during single and multijoint exercises. J Sports Med Phys Fitness 2015;55(7-8):714-721. PMID 24947920. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/voador-invertido.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | a biblioteca (ombro posterior, sem secundário) e o alvo do cartão; a nota, da linha Ombros (sem encolher nem juntar demais as escápulas no fim) e dos erros "Encolher os ombros" e "Embalar o tronco" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Movimento da tabela de técnica e a linha Ombros | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Movimento e Ombros | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/voador-invertido.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos dá as costas (o meio do trapézio) como secundário; a biblioteca não tem secundário, e o `feel` seguiu a biblioteca (anotado em `pedidos.md`). A ficha não diz como o peito encosta com o ombro sob o eixo (a animação inclinou o tronco 12° e recuou o encosto, de desenho) e não diz nada que varie de pessoa para pessoa. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

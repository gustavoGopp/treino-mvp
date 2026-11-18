# Voador (peck deck) (`voador`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** voador (`voador`, novo)
- **Função do T3:** crucifixo, posição alongada (peito, 3ª função: complemento). Selo da função no T3: consenso; atualizado aqui (ver abaixo).
- **Frequência estimada:** 0,25 vaga por semana na academia completa (divide com os crucifixos). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Banco na altura em que os pegadores (ou as almofadas dos antebraços) ficam na linha do meio do peito | consenso | `nsca2021` (não verificado) |
| Posição | Costas no encosto, escápulas juntas; cotovelos levemente dobrados e fixos | consenso | `nsca2021` (não verificado) |
| Movimento | Abre até sentir o peito alongar, sem levar os braços para trás da linha do ombro; fecha à frente do peito | consenso | `nsca2021` (não verificado) |

## Por que assim
Num ensaio de 12 semanas com 15 iniciantes, o voador sozinho cresceu as duas porções do peitoral (clavicular +17% a +18%, esternal +21%), e 1 série rendeu o mesmo que 3 (Pinto 2025; um estudo). Uma revisão de EMG achou a ativação mais alta do deltoide anterior nas aduções horizontais (crucifixos) (Rabello 2024). O selo do complemento de peito muda de "consenso" para "um estudo".

## Erros a animar
1. **Abrir demais** (braços atrás da linha do ombro).
2. **Tirar as costas** do encosto.
3. **Dobrar e esticar os cotovelos** (vira um supino).

## Músculos
Primário: peito. Secundário: ombro anterior. Na biblioteca: `peito`; secundário `ombro_anterior`; padrão `isolador-peito`, tag `alongado`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `pinto2025`: Pinto MD, Ughini C, Nunes JP, Cadore EL, Pinto RS. Pectoralis Clavicular and Sternocostal Thicknesses Increase Similarly in Response to One and Three Sets of Pec Deck Resistance Training in Untrained Young Men. J Strength Cond Res 2025;39(5):523-530. PMID 40266636. Resumo lido no PubMed em 01/11/2026.
- `rabello2024`: Rabello R, Bertozzi F, Hauschild de Freitas IL et al. Activation of the three deltoid muscle portions during common strengthening exercises: A systematic review. J Bodyw Mov Ther 2024;40:1309-1325. PMID 39593452. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/voador.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (peito; ombro anterior; igual à biblioteca); a nota, dos erros "Abrir demais" e "Dobrar e esticar os cotovelos" e da linha Movimento | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Ajuste e Posição da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Ajuste (os pegadores ou as almofadas dos antebraços) e as linhas Posição e Movimento | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/voador.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura do banco foi para a conferência. A ficha não dá ângulos para "até alongar" e "à frente do peito" (os da animação, 84,8° aberto e −12° fechado, são de desenho). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

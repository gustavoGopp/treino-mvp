# Mergulho assistido no graviton (`mergulho-graviton`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** graviton (`graviton`)
- **Função do T3:** empurrar (peito e tríceps), no nível de baixo da 1ª função de peito. **Fora das vagas padrão**: alternativa.
- **Frequência estimada:** 0 vaga nos modelos de dia (o supino vem antes); alternativa quando o aparelho estiver ocupado. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Joelhos na plataforma, mãos nas barras paralelas do aparelho, braços estendidos | consenso | `nsca2021` (não verificado) |
| Descida | Tronco levemente inclinado à frente; desce até o braço ficar quase paralelo ao chão, sem dor no ombro | consenso | `nsca2021` (não verificado) |
| Subida | Empurra até estender os cotovelos sem travar | consenso | `nsca2021` (não verificado) |

## Por que assim
No mergulho nas paralelas, a ativação de pico do tríceps foi maior que no mergulho no banco; o do banco exige mais extensão do ombro (McKenzie 2022, 13 homens experientes; EMG; um estudo). **Não achei estudo com a versão assistida**. A técnica é a mesma, com ajuda do contrapeso (consenso).

## Erros a animar
1. **Descer demais** (ombro à frente, com dor).
2. **Ombros encolhidos** perto das orelhas.

## Músculos
Primários: peito e tríceps. Secundário: ombro anterior. Proposta: `peito`, `triceps`; secundário `ombro_anterior`; articulações `ombro`, `cotovelo`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa de contrapeso ao contrário, como na barra assistida (`progressao.incremento.assistido`).

## Fontes
- `mckenzie2022`: McKenzie A, Crowley-McHattan Z, Meir R et al. Bench, Bar, and Ring Dips: Do Kinematics and Muscle Activity Differ? Int J Environ Res Public Health 2022;19(20):13211. PMID 36293792. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/mergulho-graviton.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (peito e tríceps; ombro anterior; igual à biblioteca); a nota, da linha Descida ("sem dor no ombro") e do erro "Descer demais" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Posição da tabela de técnica, o contrapeso do cartão e as dicas do cartão (ombros, tronco) | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Descida e Subida e o contrapeso do cartão | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/mergulho-graviton.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não acha estudo com a versão assistida e diz isso. Não diz a altura das barras do aparelho (na animação, 118 cm, de desenho, 10 cm abaixo do desenho do equipamento) e não tem linha para o contrapeso (ele vem do cartão e de "Como a carga sobe"). A seção Músculos ainda fala de "Proposta". O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

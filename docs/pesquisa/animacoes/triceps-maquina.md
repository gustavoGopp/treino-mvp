# Tríceps na máquina (braço apoiado à frente) (`triceps-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de tríceps (`triceps_maquina`, novo)
- **Função do T3:** tríceps com o braço ao lado ou à frente do corpo (tríceps, 2ª função: complemento).
- **Frequência estimada:** 0,08 vaga por semana na academia completa (só quando sobra vaga de complemento de tríceps). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Assento na altura em que o cotovelo fica alinhado com o eixo da máquina; braços apoiados na almofada | consenso | `nsca2021` (não verificado) |
| Movimento | Estende os cotovelos até quase travar; volta até o cotovelo dobrar ~90° ou mais | consenso | `nsca2021` (não verificado) |

## Por que assim
O tríceps com o braço acima da cabeça cresceu muito mais (sobretudo a cabeça longa) do que com o braço ao lado do corpo (Maeo 2023; um estudo, efeito grande). Por isso a máquina de tríceps com o braço à frente é **complemento**, nunca a única extensão de cotovelo da semana (`selecao.triceps-acima-cabeca`). Há máquinas de tríceps acima da cabeça. Se a pessoa disser que a dela é assim, ela conta como 1ª função (atributo `acimaDaCabeca`; `08`, seção 1).

## Erros a animar
1. **Tirar o braço** da almofada.
2. **Amplitude curta** em cima.

## Músculos
Primário: tríceps. Na biblioteca: `triceps`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `maeo2023`: Maeo S, Wu Y, Huang M et al. Triceps brachii hypertrophy is substantially greater after elbow extension training performed in the overhead versus neutral arm position. Eur J Sport Sci 2023;23(7):1240-1250. PMID 35819335. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/triceps-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (tríceps; igual à biblioteca); a nota, da linha Ajuste (o cotovelo no eixo, os braços apoiados) e do erro "Tirar o braço da almofada" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Ajuste da tabela de técnica e a dica "Cotovelo no eixo" do cartão | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | o título da ficha (o braço apoiado à frente), "Por que assim" (há máquinas de tríceps acima da cabeça) e a linha Movimento | um estudo (por que esta máquina é complemento); consenso | `maeo2023`; `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/triceps-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura do assento foi para a conferência. A ficha não diz a pegada nem a posição do tronco (a animação seguiu o manual público de uma máquina comercial: a bacia no apoio da lombar, o tronco um pouco à frente, a pegada neutra). O cartão do exercício e a ficha descrevem a mesma máquina (o braço apoiado à frente); o desenho do equipamento que a pessoa marca (`public/equipamento/triceps_maquina.svg`) é de outra, a de mergulho sentado (anotado em `pedidos.md`). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

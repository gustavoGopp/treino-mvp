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

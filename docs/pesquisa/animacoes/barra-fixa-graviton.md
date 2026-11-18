# Barra fixa assistida no graviton (`barra-fixa-graviton`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** graviton (`graviton`, novo)
- **Função do T3:** puxar vertical (costas, 1ª função), para quem ainda não faz a barra fixa com o próprio peso. Selo da função no T3: consenso.
- **Frequência estimada:** 0,35 vaga por semana na academia completa (divide com a barra fixa e as puxadas). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Joelhos (ou pés) na plataforma de apoio; pegada pronada a ~1 a 1,5 vez a largura dos ombros | consenso | `nsca2021` (não verificado); `tecnica.barra-fixa.pegada` |
| Movimento | Igual à barra fixa: sobe até o queixo passar da barra e desce até os braços estenderem | consenso | mesma técnica da `barra-fixa` aprovada |
| Contrapeso | Quanto mais placas, **mais ajuda** (fica mais fácil) | consenso | `nsca2021` (não verificado) |

## Por que assim
**Não achei estudo de EMG nem de hipertrofia com a barra assistida em máquina** (buscas registradas no `08`). A base é a da barra fixa (`08-tecnica-guia.md`) e a regra de que a série precisa chegar perto da falha (`reps.equivalencia-cargas`; robusta). A ajuda serve para a pessoa fazer a faixa de repetições com a técnica da barra.

## Erros a animar
1. **Encurtar a descida** (não estender os braços).
2. **Balançar** o corpo.

## Músculos
Primário: costas. Secundários: bíceps e ombro posterior. Na biblioteca: `costas`; secundários `biceps`, `ombro_posterior`.

## Como a carga sobe (para a progressão e a calibração do T6)
**Placa de contrapeso, ao contrário:** progredir é **tirar** uma placa. A calibração e a volta de pausa do T6 invertem o sentido: "mais leve" = mais placas. Proposta de regra: `progressao.incremento.assistido` (`08`, seção 7). Quando a ajuda chegar a zero, o exercício vira a `barra-fixa`.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/barra-fixa-graviton.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior; igual à biblioteca); a nota, da linha Movimento ("igual à barra fixa") e do erro "Balançar" | consenso | `nsca2021` (não verificado); a `barra-fixa` aprovada |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Contrapeso e Posição da tabela de técnica | consenso | `nsca2021` (não verificado); `tecnica.barra-fixa.pegada` |
| Variações (`vary`) | linha Posição (os joelhos ou os pés na plataforma), linha Contrapeso e linha Movimento | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/barra-fixa-graviton.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não acha estudo com a barra assistida em máquina e diz isso. Não diz onde fica o eixo da almofada nem a altura das alças (na animação, de desenho; o queixo passa do alto das alças, porque o graviton desenhado tem duas alças e não uma barra inteira). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

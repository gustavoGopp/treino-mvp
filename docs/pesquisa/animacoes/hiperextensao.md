# Extensão de quadril no banco romano (hiperextensão a 45°) (`hiperextensao`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** banco romano (`banco_romano`, novo)
- **Função do T3:** dobrar o quadril (posteriores, 2ª função; glúteos), no nível abaixo do stiff e do terra romeno.
- **Frequência estimada:** 0 vaga na academia completa (o stiff e o terra romeno vêm antes); entra quando não há carga livre suficiente. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Almofada na altura do alto da coxa, abaixo do osso do quadril, para o quadril dobrar livre | consenso | `nsca2021` (não verificado) |
| Movimento | Desce dobrando o quadril com a coluna neutra até um alongamento confortável atrás da coxa; sobe até o corpo ficar em linha reta | consenso | `nsca2021` (não verificado) |
| Topo | **Não passa da linha reta** (não hiperestende a lombar) | consenso | `nsca2021` (não verificado) |
| Carga | Mãos no peito; para progredir, segura uma anilha ou um halter junto ao peito | consenso | `nsca2021` (não verificado) |

## Por que assim
Comparada à hiperextensão reversa, a hiperextensão teve mais ativação integrada do glúteo máximo e do bíceps femoral, e mais flexão lombar (Lawrence 2019, 20 pessoas; EMG e cinemática; um estudo). Por isso a animação mostra a flexão no **quadril**, com a coluna neutra. Não achei ensaio de hipertrofia.

## Erros a animar
1. **Arquear a lombar** no topo.
2. **Arredondar as costas** embaixo em vez de dobrar o quadril.
3. **Embalar**.

## Músculos
Primários: glúteos e posteriores. Secundário: lombar (eretores, fora dos 12 músculos). Proposta: `gluteos`, `posteriores`; articulações `quadril`, `lombar`.

## Como a carga sobe (para a progressão e a calibração do T6)
Peso do corpo, depois kg da anilha ou do halter segurado no peito.

## Fontes
- `lawrence2019`: Lawrence MA, Chin A, Swanson BT. Biomechanical Comparison of the Reverse Hyperextension Machine and the Hyperextension Exercise. J Strength Cond Res 2019;33(8):2053-2056. PMID 30946266. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/hiperextensao.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (glúteos e posteriores; a lombar como secundário fora dos 12) e o alvo do cartão; a nota, dos erros "Arquear a lombar no topo" e "Arredondar as costas" e da linha Topo | consenso | `nsca2021` (não verificado); `lawrence2019` (a flexão no quadril, com a coluna neutra) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Ajuste, Carga (as mãos no peito) e Movimento (a coluna neutra) da tabela de técnica e os pés presos do cartão | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Movimento e Topo e o erro "Embalar" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/hiperextensao.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura da almofada e os pés presos foram para a conferência. A ficha não dá a altura da almofada em número (a animação a regulou 5,4 cm abaixo do mínimo de um banco comercial, para caber no corpo da tabela) nem o ângulo do banco além do "45°" do título. A biblioteca não tem a lombar como secundário (ela não está entre os 12 músculos); o `feel` a cita como o alvo do cartão faz ("a lombar segura a coluna"). O erro "Embalar" não tem desenho (está em `SEM_DESENHO`): o texto o mantém. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

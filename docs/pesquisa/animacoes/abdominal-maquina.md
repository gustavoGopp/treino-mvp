# Abdominal na máquina (`abdominal-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de abdominal (`abdominal_maquina`, novo)
- **Função do T3:** flexão de tronco com carga (abdômen, 1ª função). Selo da função no T3: consenso.
- **Frequência estimada:** 0,50 vaga por semana na academia completa (divide com o abdominal na polia e no banco declinado). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, peito ou ombros nas almofadas, pés presos | consenso | `nsca2021` (não verificado) |
| Movimento | **Enrola o tronco** (aproxima as costelas da pelve); o quadril dobra pouco | consenso | `nsca2021` (não verificado) |
| Volta | Controlada, até o tronco voltar a ficar reto | consenso | `nsca2021` (não verificado) |

## Por que assim
Num estudo de EMG com 7 aparelhos comerciais de abdômen, a ativação variou muito, e alguns ativaram mais o flexor do quadril (reto femoral) que o abdômen (Escamilla 2006; EMG; um estudo). Os aparelhos estudados não são as máquinas de academia, então a ligação é fraca. Fica a regra de técnica (enrolar o tronco, não só dobrar o quadril) como consenso.

## Erros a animar
1. **Puxar com os braços** em vez de enrolar o tronco.
2. **Só dobrar o quadril**, com a coluna reta.

## Músculos
Primário: abdômen. Na biblioteca: `abdomen`; padrão `core`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `escamilla2006`: Escamilla RF, McTaggart MSC, Fricklas EJ et al. An electromyographic analysis of commercial and common abdominal exercises: implications for rehabilitation and training. J Orthop Sports Phys Ther 2006;36(2):45-57. PMID 16494072. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (20/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/abdominal-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (abdômen; igual à biblioteca, sem secundário); a nota, do erro "Só dobrar o quadril" e de "Por que assim" (em alguns aparelhos do estudo de EMG, o flexor do quadril trabalhou mais que o abdômen), do erro "Puxar com os braços" e da dica "Braços só seguram" do cartão | consenso; um estudo (o flexor do quadril, com ligação fraca: os aparelhos do estudo não são as máquinas de academia) | `nsca2021` (não verificado); `escamilla2006` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Movimento (o quadril dobra pouco) da tabela de técnica e a dica "Braços só seguram" do cartão | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Posição (o peito ou os ombros nas almofadas), linhas Movimento e Volta e o erro "Puxar com os braços" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/abdominal-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz como regular o assento nem onde ficam as mãos; a animação seguiu o manual público da Life Fitness (o apoio da lombar, os pegadores à frente do peito, logo abaixo das almofadas, e o eixo baixo, ao lado da lombar; `docs/revisoes/animacao-nova/lote-C3/abdominal-maquina.md`), e o texto não fala disso, porque nem a ficha nem o cartão falam (o cartão não tem montagem). A ficha não dá o tempo da volta nem a pausa no fim (a animação usou os do abdominal na polia aprovado). O desenho do equipamento (`public/equipamento/abdominal_maquina.svg`) é de outra máquina (já em `docs/revisoes/animacoes-restantes/pedidos-ao-conteudo.md`, seção 3). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

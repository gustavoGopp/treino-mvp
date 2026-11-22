# Flexão de joelho na cadeira flexora (sentado) (`cadeira-flexora`)

Exercício da biblioteca desde antes do R0c, sem animação nem cartão até a auditoria do treino (02/11/2026), que o achou entre os mais prescritos (`docs/revisoes/auditoria/inventario.md`). **Ficha de técnica para o cartão de texto; a animação, se vier, sai desta ficha.**

- **Equipamento:** cadeira flexora (ou a estação do multifuncional)
- **Função:** flexão de joelho (`flexao-joelho`, nível 1; `selecao.flexora-sentada`)

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Encosto ajustado para o joelho ficar alinhado com o eixo; o rolo de cima trava a coxa logo acima do joelho; o rolo de baixo fica atrás do tornozelo | consenso | `nsca2021` (não verificado) |
| Descida (flexão) | Dobra os joelhos trazendo os calcanhares para baixo e para trás até onde der; pausa curta | consenso | `nsca2021` (não verificado) |
| Volta | Controlada, até os joelhos quase esticarem, sem bater as placas | consenso | `nsca2021` (não verificado) |
| Tronco | Sentado e encostado (inclinar um pouco o tronco à frente alonga mais os posteriores) | um estudo | `maeo2021` |

## Por que assim
A flexora sentada cresceu mais os posteriores que a deitada (+14% × +9%), porque o quadril dobrado deixa o músculo mais alongado (Maeo 2021; um estudo). Por isso ela vem antes da mesa flexora (`selecao.flexora-sentada`).

## Erros comuns
1. **Rolo da coxa solto**: o quadril sobe.
2. **Dar tranco.**
3. **Joelho fora do eixo** da máquina.
4. **Não estender na volta** (amplitude curta).

## Músculos
Primário: posteriores da coxa. **Um estudo**: a flexora sentada cresceu os posteriores mais que a deitada (+14% contra +9%; Maeo 2021, PMID 33009197; resumo-PubMed, em `docs/pesquisa-v2/04-exercicios-por-musculo.md`). Conferido na revisão de anatomia (02/11/2026).

## Como a carga sobe
Placa da torre: +1 placa.

## Fontes
- `maeo2021`: Maeo S et al. Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection after Training at Long versus Short Muscle Lengths. Med Sci Sports Exerc 2021;53(4):825-837. PMID 33009197.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/cadeira-flexora.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (posteriores da coxa; na biblioteca, sem secundário); a nota, do erro "Rolo da coxa solto" e da linha Ajuste, mais a linha Tronco (inclinar um pouco à frente alonga mais) | consenso; a frase do tronco, um estudo | `nsca2021` (não verificado); `maeo2021` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Ajuste (o joelho no eixo, os dois rolos) e Tronco (sentado e encostado) da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | o equipamento do cabeçalho (a cadeira flexora ou a estação do multifuncional), a linha Tronco e as linhas Ajuste e Volta ("sem bater as placas") | consenso; a frase do tronco, um estudo | `nsca2021` (não verificado); `maeo2021` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/cadeira-flexora.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a regulagem (o encosto que põe o joelho no eixo, o rolo de cima e o de baixo) foi para a conferência, e não para a nota. A ficha não dá números para a regulagem (a conferência da animação regulou o encosto, o rolo e a trava por condições do corpo, `docs/revisoes/animacao-nova/lote-C1/cadeira-flexora.md`). A frase do tronco à frente vem de `maeo2021`, que comparou a flexora sentada com a deitada, e não a inclinação do tronco: ligar as duas coisas é inferência da ficha. O cabeçalho ainda diz que "a animação, se vier, sai desta ficha".

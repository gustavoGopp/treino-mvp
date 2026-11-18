# Levantamento terra romeno com barra (`terra-romeno-barra`)

Exercício da biblioteca: `terra-romeno-barra` (padrão dobrar-quadril). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Barra com anilhas iguais dos dois lados, tirada de um suporte na altura da coxa ou do chão. | consenso | `nsca2021` (não verificado) |
| Posição | Em pé, pés na largura do quadril, joelhos um pouco dobrados. Barra rente às coxas, pegada na largura dos ombros, coluna reta. | consenso | `nsca2021` (não verificado) |
| Descida | ~2–3 s. Empurra o quadril para trás e desce a barra rente às pernas até sentir os posteriores alongarem, sem arredondar a lombar. | consenso | `nsca2021` (não verificado) |
| Subida | Sobe levando o quadril para a frente, até ficar em pé. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Travas nas anilhas. Comece com a barra vazia para acertar o movimento antes de pôr carga. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **dobrar o quadril** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o stiff com halteres (`stiff`).

## Erros do cartão
1. **Arredondar a lombar**: Descer além de onde a coluna fica reta: pare antes ou diminua a carga.
2. **Virar um agachamento**: Dobrar muito os joelhos tira o trabalho dos posteriores.
3. **Barra longe das pernas**: A barra à frente aumenta a carga na lombar.

## Músculos
Na biblioteca: primário `posteriores`; secundários: gluteos.

## Como a carga sobe
Registre o kg total (barra + anilhas). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/terra-romeno-barra.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (posteriores; glúteos), a biblioteca e a linha Descida ("até sentir os posteriores alongarem"); a nota, dos erros "Arredondar a lombar" e "Barra longe das pernas" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Montagem segura e Posição da tabela de técnica | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Variações (`vary`) | linha Preparo (do suporte ou do chão), a amplitude do cartão e o erro "Virar um agachamento" | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão, num texto só | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/terra-romeno-barra.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` usa a origem da barra e a profundidade do cartão (abaixo dos joelhos ou no meio da canela), sem um critério além da coluna reta.

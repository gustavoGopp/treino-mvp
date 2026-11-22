# Pull-through na polia baixa com corda (`pull-through`)

Exercício da biblioteca: `pull-through` (padrão dobrar-quadril). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Polia embaixo, com a corda. | consenso | `nsca2021` (não verificado) |
| Posição | De costas para a torre, a corda passando entre as pernas, segura com as duas mãos. Dois passos à frente, pés um pouco mais abertos que o quadril, joelhos um pouco dobrados. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Empurra o quadril para trás, deixando as mãos passarem entre as pernas, com a coluna reta. | consenso | `nsca2021` (não verificado) |
| Subida | Leva o quadril para a frente até ficar em pé, apertando os glúteos; os braços só seguram a corda. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **dobrar o quadril** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o stiff com halteres (`stiff`).

## Erros do cartão
1. **Puxar com os braços**: Os braços levantam a corda no lugar do quadril.
2. **Arredondar a lombar**: Perder a coluna reta na descida.
3. **Inclinar para trás no topo**: Passar da posição em pé arqueia a lombar.

## Músculos
Na biblioteca: primário `posteriores`; secundários: gluteos.

## Como a carga sobe
Registre o número da placa da torre. Para progredir, +1 placa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/pull-through.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: posteriores; glúteos), o alvo e a amplitude do cartão ("posteriores alongados"); a nota, dos três erros do cartão | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Descida e Subida da tabela | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/pull-through.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda. A seção Músculos só repete os ids da biblioteca, sem selo próprio.

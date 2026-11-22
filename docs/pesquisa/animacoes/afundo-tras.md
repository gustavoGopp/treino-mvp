# Afundo para trás alternado (`afundo-tras`)

Exercício da biblioteca: `afundo-tras` (padrão afundo). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Dois halteres do mesmo peso (ou sem peso, para aprender). | consenso | `nsca2021` (não verificado) |
| Posição | Em pé, pés na largura do quadril, um halter em cada mão ao lado do corpo. Tronco reto, olhar à frente. | consenso | `nsca2021` (não verificado) |
| Passo e descida | Dá um passo longo para trás e desce até o joelho de trás chegar perto do chão; o peso fica na perna da frente. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra o chão com a perna da frente e volta à posição em pé. Troca de perna. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **afundo** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o afundo para trás com o peso do corpo (`afundo-tras-peso-corpo`), com animação aprovada.

## Erros do cartão
1. **Passo curto**: O joelho da frente passa muito do pé e o calcanhar sai do chão.
2. **Impulso com a perna de trás**: Empurrar com a de trás tira o trabalho da perna da frente.
3. **Joelho da frente para dentro**: O joelho cai para dentro na subida.

## Músculos
Na biblioteca: primário `quadriceps`; secundários: gluteos, adutores.

## Como a carga sobe
Pela lista dos seus halteres: o próximo peso quando todas as séries chegarem ao topo da faixa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/afundo-tras.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: quadríceps; glúteos e adutores) e o alvo do cartão; a nota, do erro "Impulso com a perna de trás" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo, Posição e Passo e descida da tabela; o erro "Joelho da frente para dentro" | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Preparo ("ou sem peso, para aprender") e a linha Passo e descida | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/afundo-tras.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos só repete os ids da biblioteca, sem selo próprio; a ficha não diz o que varia de pessoa para pessoa (o `vary` usa o "sem peso, para aprender" do cartão). O cartão diz "pés juntos" no começo da amplitude e "pés na largura do quadril" na posição: foi para `pedidos.md`.

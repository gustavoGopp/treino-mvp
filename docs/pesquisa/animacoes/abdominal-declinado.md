# Abdominal no banco declinado (`abdominal-declinado`)

Exercício da biblioteca: `abdominal-declinado` (padrão core). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Banco declinado, com os pés presos nos rolos. | consenso | `nsca2021` (não verificado) |
| Posição | Deitado no banco, joelhos dobrados, pés presos. Mãos cruzadas no peito ou ao lado da cabeça, sem puxar o pescoço. | consenso | `nsca2021` (não verificado) |
| Subida | Enrola a coluna, levando as costelas na direção do quadril, até as costas saírem do banco. | consenso | `nsca2021` (não verificado) |
| Descida | ~2–3 s. Desenrola até as costas encostarem de novo, sem relaxar no fundo. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Confira se os pés estão bem presos antes de deitar; para sair, segure no banco e sente primeiro. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **abdômen** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o abdominal no chão (`abdominal-chao`).

## Erros do cartão
1. **Puxar o pescoço**: As mãos puxam a cabeça para a frente.
2. **Subir com a coluna reta**: Subir como uma tábua usa os flexores do quadril no lugar do abdômen.
3. **Impulso**: Jogar os braços para ganhar embalo.

## Músculos
Na biblioteca: primário `abdomen`; secundários: nenhum.

## Como a carga sobe
Peso do corpo: registre o degrau da escada de dificuldade (mais repetições, descida lenta, variação mais difícil, carga extra). Depois, segure uma anilha ou um halter junto ao peito, em kg.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/abdominal-declinado.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: abdômen, sem secundário); a nota, dos erros "Subir com a coluna reta" (os flexores do quadril no lugar do abdômen) e "Puxar o pescoço" e da linha Subida | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Posição (as mãos cruzadas no peito ou ao lado da cabeça), linhas Subida e Descida e o erro "Impulso" | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão (a linha Montagem segura) | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/abdominal-declinado.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não cita estudo e não dá o ângulo do banco nem como ele trava (a animação escolheu o ângulo e o comprimento, de desenho). A seção Músculos só repete os ids da biblioteca.

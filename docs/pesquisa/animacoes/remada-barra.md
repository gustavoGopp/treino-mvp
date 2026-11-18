# Remada curvada com barra (`remada-barra`)

Exercício da biblioteca: `remada-barra` (padrão puxar horizontal). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Barra no chão ou num suporte baixo, com anilhas iguais dos dois lados. | consenso | `nsca2021` (não verificado) |
| Posição | Pés na largura do quadril, joelhos um pouco dobrados. Tronco inclinado a ~45° ou mais, coluna reta, olhar um pouco à frente. Pegada um pouco mais aberta que os ombros. | consenso | `nsca2021` (não verificado) |
| Puxar | Puxa a barra até a barriga, com os cotovelos passando rente ao corpo. | consenso | `nsca2021` (não verificado) |
| Volta | ~2 s. Volta até os braços estenderem, sem mexer o tronco. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Travas nas anilhas. Se a lombar cansar antes das costas, apoie o peito num banco inclinado ou use a remada apoiada. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **puxar horizontal** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, a remada curvada com halteres (`remada-curvada-halteres`).

## Erros do cartão
1. **Arredondar a lombar**: Perder a coluna reta sobrecarrega a lombar: diminua a carga.
2. **Subir o tronco a cada puxada**: Balançar o corpo faz a carga subir sem as costas.
3. **Puxar para o peito**: Barra alta e cotovelos abertos tiram o trabalho do dorsal.

## Músculos
Na biblioteca: primário `costas`; secundários: biceps, ombro_posterior.

## Como a carga sobe
Registre o kg total (barra + anilhas). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/remada-barra.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior) e a biblioteca; a nota, do erro "Arredondar a lombar" e da 2ª frase da linha Montagem segura (o banco inclinado ou a remada apoiada) | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Montagem segura, Preparo e Posição da tabela de técnica | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Preparo (do chão ou de um suporte baixo), Posição (~45° ou mais) e Puxar | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão, num texto só | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/remada-barra.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a 2ª frase da montagem (apoiar o peito num banco inclinado ou trocar pela remada apoiada) é mais uma alternativa que uma montagem; foi para a nota, como manda o formato, e também para a nota de onde sentir. A ficha não diz o que varia de pessoa para pessoa além da origem da barra e do ângulo do tronco.

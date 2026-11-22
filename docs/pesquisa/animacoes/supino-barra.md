# Supino reto com barra (`supino-barra`)

Exercício da biblioteca: `supino-barra` (padrão empurrar horizontal). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Banco plano dentro do rack; a barra numa altura que você alcança com os cotovelos quase estendidos. | consenso | `nsca2021` (não verificado) |
| Posição | Deitado, olhos embaixo da barra, pés firmes no chão. Escápulas juntas e para baixo, apoiadas no banco. Pegada um pouco mais aberta que os ombros, punhos retos. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Desce a barra até tocar de leve o meio do peito, com os cotovelos a ~30–60° do tronco. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra até quase estender os cotovelos, sem travar, com as escápulas no banco. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Travas de segurança do rack logo abaixo da altura do peito, ou alguém para ajudar: sem uma das duas, pare bem antes da falha. Anilhas iguais dos dois lados. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **empurrar horizontal, empurrar inclinado** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
- `selecao.mergulho` (selo: consenso; fontes em `../regras.md`): Mergulho nas paralelas.
- `selecao.peitoral-inclinado` (selo: um estudo; fontes em `../regras.md`): Incluir uma variação inclinada para a porção superior do peitoral (razoável, não obrigatória).
A técnica segue, por analogia, o supino reto com halteres (`supino-reto`) e a regra `tecnica.supino-halteres.cotovelos`.

## Erros do cartão
1. **Quicar a barra no peito**: Usar o peito como mola tira o trabalho do músculo e machuca.
2. **Cotovelos abertos a 90°**: Braços em cruz sobrecarregam o ombro; mantenha a ~30–60° do tronco.
3. **Tirar o quadril do banco**: Levantar o quadril encurta o movimento e tensiona a lombar.

## Músculos
Na biblioteca: primário `peito`; secundários: ombro_anterior, triceps.

## Como a carga sobe
Registre o kg total (barra + anilhas). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/supino-barra.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (peito; ombro anterior e tríceps) e a biblioteca; a nota, do erro "Cotovelos abertos a 90°" | consenso | `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` (por analogia, como a ficha diz) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Montagem segura e Posição da tabela de técnica | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Variações (`vary`) | linha Montagem segura (a trava do rack ou alguém para ajudar) e linha Descida; os erros "Quicar a barra no peito" e "Tirar o quadril do banco" | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão, num texto só | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/supino-barra.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a montagem não fala das travas nas anilhas, que a regra `seguranca.montagem` pede para as barras e os outros cartões com barra trazem; a nota seguiu o cartão (anotado em `pedidos.md`). A ficha não diz o que varia de pessoa para pessoa; o `vary` usa a escolha entre a trava e a ajuda.

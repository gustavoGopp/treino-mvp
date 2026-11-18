# Mesa flexora (deitado) (`mesa-flexora`)

Exercício da biblioteca: `mesa-flexora` (padrão flexao-joelho). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Rolo ajustado logo acima do calcanhar; o joelho alinhado com o eixo da máquina. | consenso | `nsca2021` (não verificado) |
| Posição | Deitado de bruços, quadril apoiado, mãos nos pegadores. Pés relaxados, pernas quase estendidas. | consenso | `nsca2021` (não verificado) |
| Dobrar | Dobra os joelhos até o rolo chegar perto do glúteo, sem levantar o quadril. | consenso | `nsca2021` (não verificado) |
| Volta | ~2–3 s. Volta até as pernas quase estenderem. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **flexão de joelho** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
- `selecao.flexora-sentada` (selo: um estudo; fontes em `../regras.md`): Flexão de joelho sentada preferida à deitada, quando houver as duas.
A técnica segue, por analogia, a cadeira flexora (`cadeira-flexora`).

## Erros do cartão
1. **Levantar o quadril**: O quadril sobe para ajudar e a lombar arqueia.
2. **Volta solta**: Deixar a placa cair perde a parte alongada.
3. **Rolo no lugar errado**: Rolo na panturrilha ou no pé muda o braço de alavanca.

## Músculos
Na biblioteca: primário `posteriores`; secundários: nenhum.

## Como a carga sobe
Registre o número da placa da torre. Para progredir, +1 placa. Na máquina de anilhas, kg por lado.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/mesa-flexora.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: posteriores, sem secundário); a nota, do erro "Levantar o quadril" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Preparo, Dobrar e Volta e o erro "Volta solta" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/mesa-flexora.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a regulagem (o rolo logo acima do calcanhar e o joelho no eixo) foi para a conferência. A ficha não dá o ângulo da dobra do estofado (na animação, 20° no das coxas, de desenho) e não diz o que varia de pessoa para pessoa: o `vary` só traz o que não muda. A seção Músculos só repete os ids da biblioteca. O erro "Volta solta" não tem desenho (está em `SEM_DESENHO`): o texto o mantém.

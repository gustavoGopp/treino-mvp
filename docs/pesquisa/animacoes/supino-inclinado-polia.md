# Supino inclinado na polia, com o banco entre as torres (`supino-inclinado-polia`)

Exercício da biblioteca: `supino-inclinado-polia` (padrão empurrar horizontal). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Banco inclinado a ~30–45° no meio das duas torres, com as polias embaixo. Um estribo em cada polia. | consenso | `nsca2021` (não verificado) |
| Posição | Sentado, costas e escápulas no encosto, pés no chão. Mãos na altura do peito, cotovelos a ~30–60° do tronco. | consenso | `nsca2021` (não verificado) |
| Empurrar | Empurra para cima e um pouco para dentro, até quase estender os cotovelos. | consenso | `nsca2021` (não verificado) |
| Volta | ~2 s. Volta até um alongamento confortável do peito. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Banco firme e centrado entre as torres; pegue um estribo de cada vez, já sentado. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **empurrar inclinado** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
- `selecao.peitoral-inclinado` (selo: um estudo; fontes em `../regras.md`): Incluir uma variação inclinada para a porção superior do peitoral (razoável, não obrigatória).
A técnica segue, por analogia, o supino inclinado com halteres (`supino-inclinado`).

## Erros do cartão
1. **Banco fora do meio**: Com o banco torto, um lado puxa mais que o outro.
2. **Tirar as costas do encosto**: Arquear para ajudar tira o trabalho da parte de cima do peito.
3. **Soltar a volta**: Deixar a placa puxar o braço de uma vez perde a parte alongada.

## Músculos
Na biblioteca: primário `peito`; secundários: ombro_anterior, triceps.

## Como a carga sobe
Registre o número da placa da torre. Para progredir, +1 placa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/supino-inclinado-polia.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: peito; ombro anterior e tríceps) e o alvo do cartão (parte de cima); a nota, dos erros "Banco fora do meio" e "Tirar as costas do encosto" | consenso | `nsca2021` (não verificado); `selecao.peitoral-inclinado` (um estudo) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | as faixas das linhas Preparo e Posição (~30–45°; ~30–60°) e a linha Volta | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | linha Montagem segura da tabela, igual à do cartão | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/supino-inclinado-polia.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não diz o que varia de pessoa para pessoa; o `vary` só usa as faixas que o cartão já dá. A seção Músculos só repete os ids da biblioteca, sem selo próprio.

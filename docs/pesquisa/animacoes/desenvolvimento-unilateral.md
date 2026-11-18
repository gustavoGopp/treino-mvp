# Desenvolvimento unilateral com halter, em pé (`desenvolvimento-unilateral`)

Exercício da biblioteca: `desenvolvimento-unilateral` (padrão empurrar vertical). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Um halter. | consenso | `nsca2021` (não verificado) |
| Posição | Em pé, pés na largura do quadril, abdômen e glúteos firmes. Halter na altura do ombro, cotovelo um pouco à frente do corpo; a outra mão na cintura ou num apoio. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra o halter para cima até quase estender o cotovelo, sem inclinar o tronco para o lado. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Desce até o halter voltar à altura do ombro. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **empurrar vertical** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o desenvolvimento com halteres (`desenvolvimento`).

## Erros do cartão
1. **Inclinar para o lado**: Dobrar o tronco para o lado oposto para subir a carga.
2. **Arquear a lombar**: Inclinar para trás sobrecarrega a lombar.
3. **Descida curta**: Parar acima do ombro deixa de fora metade do movimento.

## Músculos
Na biblioteca: primário `ombro_anterior`; secundários: ombro_lateral, triceps.

## Como a carga sobe
Pela lista dos seus halteres: o próximo peso quando todas as séries chegarem ao topo da faixa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/desenvolvimento-unilateral.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: ombro anterior; ombro lateral e tríceps); a nota, do erro "Arquear a lombar" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Posição da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Posição ("a outra mão na cintura ou num apoio") e as linhas Subida e Descida | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/desenvolvimento-unilateral.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos só repete os ids da biblioteca, sem selo próprio; a ficha não diz o que varia de pessoa para pessoa além de onde fica a mão livre.

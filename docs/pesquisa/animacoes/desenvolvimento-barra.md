# Desenvolvimento em pé com barra (`desenvolvimento-barra`)

Exercício da biblioteca: `desenvolvimento-barra` (padrão empurrar vertical). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Barra no rack na altura do peito, anilhas iguais dos dois lados. | consenso | `nsca2021` (não verificado) |
| Posição | Em pé, pés na largura do quadril, abdômen e glúteos firmes. Barra apoiada na parte de cima do peito, pegada pouco mais aberta que os ombros, cotovelos um pouco à frente da barra. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra a barra para cima, rente ao rosto, até quase estender os cotovelos, com a barra sobre os ombros. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Desce até a barra voltar à parte de cima do peito. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Travas nas anilhas. Tire e devolva a barra no rack; nunca a levante do chão até os ombros com carga pesada. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **empurrar vertical** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o desenvolvimento com halteres (`desenvolvimento`).

## Erros do cartão
1. **Arquear a lombar**: Inclinar para trás para subir a carga sobrecarrega a lombar: diminua a carga.
2. **Impulso com as pernas**: Dobrar os joelhos para dar embalo tira o trabalho do ombro.
3. **Descida curta**: Parar na altura da testa deixa de fora metade do movimento.

## Músculos
Na biblioteca: primário `ombro_anterior`; secundários: ombro_lateral, triceps.

## Como a carga sobe
Registre o kg total (barra + anilhas). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/desenvolvimento-barra.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (ombro anterior; ombro lateral e tríceps) e a biblioteca; a nota, do erro "Arquear a lombar" e da linha Posição (abdômen e glúteos firmes) | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo, Posição e Montagem segura da tabela de técnica | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Variações (`vary`) | só o que não muda: linhas Subida, Descida e Montagem segura; os erros "Impulso com as pernas" e "Descida curta" | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão, num texto só | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/desenvolvimento-barra.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz nada que varie de pessoa para pessoa; o `vary` só tem o que não muda.

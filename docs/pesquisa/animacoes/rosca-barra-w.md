# Rosca com barra W (`rosca-barra-w`)

Exercício da biblioteca: `rosca-barra-w` (padrão isolador-biceps). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Barra W com anilhas iguais dos dois lados. | consenso | `nsca2021` (não verificado) |
| Posição | Em pé, pés na largura do quadril, tronco reto. Pegada nas partes inclinadas da barra, palmas para cima, cotovelos ao lado do corpo. | consenso | `nsca2021` (não verificado) |
| Subida | Dobra os cotovelos até a barra chegar perto dos ombros, com os cotovelos parados. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Desce até os braços quase estenderem. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Travas nas anilhas. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **bíceps** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, a rosca alternada com halteres (`rosca-alternada`).

## Erros do cartão
1. **Balançar o tronco**: Jogar o corpo para trás faz a carga subir sem o bíceps.
2. **Cotovelos para a frente**: Levar os cotovelos à frente no topo descansa o bíceps.
3. **Descida curta**: Não estender os braços deixa de fora a parte alongada.

## Músculos
Na biblioteca: primário `biceps`; secundários: nenhum.

## Como a carga sobe
Registre os kg (barra W com anilhas). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase B, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/rosca-barra-w.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (bíceps, sem secundário) e a biblioteca; a nota, dos erros "Balançar o tronco" e "Cotovelos para a frente" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo, Posição e Montagem segura da tabela de técnica | consenso | `seguranca.montagem`; `nsca2021` (não verificado) |
| Variações (`vary`) | só o que não muda: linhas Posição, Subida e Descida | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão ("Travas nas anilhas") | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/rosca-barra-w.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz nada que varie de pessoa para pessoa (nem a largura da pegada além de "nas partes inclinadas"); o `vary` só tem o que não muda.

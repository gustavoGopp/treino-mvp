# Pedidos: o que parece errado nos cartões da fase A (18/11/2026)

Ao escrever o texto do guia animado dos 42 exercícios da fase A, o texto do cartão (`src/conteudo/exercicios/<id>.json`) ficou como está, como pedia a sessão. O que parece errado nele fica aqui, com a fonte, para quem for ligar a fase A decidir.

| Exercício | Campo do cartão | O que parece errado | Fonte | O que o texto do guia fez |
|---|---|---|---|---|
| `triceps-elastico-alto` | `montagem`, 2º item | "pise com o pé inteiro sobre ele": o elástico fica preso no alto (âncora de porta ou barra fixa), ninguém pisa nele. O item é o aviso comum dos elásticos sob o pé. | o próprio cartão (`setupEq`, `setupBody`); ficha, seção Segurança (só a âncora do fabricante ou a barra fixa) | a nota junta a montagem sem esse trecho |
| `coice-elastico` | `montagem` | "pise com o pé inteiro sobre ele": o laço vai na sola do pé e as pontas ficam sob as mãos. | o próprio cartão (`setupBody`); ficha, linha Posição da tabela de técnica | a nota fica só com a conferência das rachaduras e o aviso do rosto |
| `abertura-elastico` | `montagem` | "pise com o pé inteiro sobre ele": o elástico fica entre as mãos, sem nada para prender. | o próprio cartão (`setupEq`: "nada para prender"); ficha, seção Segurança | a nota usa a conferência das rachaduras e o fim do erro "Soltar uma ponta" |
| `afundo-tras` | `range`, 1º item | "Início: em pé, pés juntos", mas a posição (`setupBody`) diz "pés na largura do quadril". | o próprio cartão; ficha, linha Posição da tabela ("pés na largura do quadril"; `nsca2021`, não verificado) | nada: o texto do guia não usa a amplitude além dos rótulos ("em pé", "embaixo") |
| `goblet-kettlebell` | (biblioteca, não o cartão) | A ficha diz "Secundário: glúteos"; a biblioteca (`src/domain/biblioteca/exercicios.json`) soma os adutores. Não é do cartão, mas o `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` segue a biblioteca (como o goblet com halter) |

## Fase B (18/11/2026)

Mesmo critério, ao escrever o texto do guia animado dos 10 exercícios da fase B.

| Exercício | Campo do cartão | O que parece errado | Fonte | O que o texto do guia fez |
|---|---|---|---|---|
| `supino-barra` | `montagem` | Não pede as travas nas anilhas, e a regra pede para as barras; os outros cinco cartões com barra longa ou W (agachamento, terra romeno, desenvolvimento, rosca W, remada) trazem. | regra `seguranca.montagem` ("barras: travas nas anilhas"; `docs/pesquisa/regras.md`) | a nota seguiu o cartão, sem as travas nas anilhas |
| `hip-thrust` | (biblioteca, não o cartão) | A ficha diz "Secundário: posteriores"; a biblioteca (`src/domain/biblioteca/exercicios.json`) não tem secundário. O `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` segue a biblioteca e o alvo do cartão ("Glúteos") |
| `supino-smith` | `setupEq`, 2º item, e `montagem` | "Travas de segurança logo acima do peito" parece não combinar com a amplitude do próprio cartão ("barra encosta de leve no peito": com a trava acima do peito, a barra para nela antes) nem com a regra, que no smith pede as travas logo abaixo do ponto mais baixo. O cartão do `supino-barra` diz "logo abaixo da altura do peito". | o próprio cartão (`exec`, `range`); regra `seguranca.montagem` ("smith e hack: travas logo abaixo do ponto mais baixo"); ficha, linha Montagem | a nota e a conferência seguiram o cartão ("logo acima do peito") |
| `agachamento-smith` | (biblioteca, não o cartão) | A ficha diz "Na biblioteca: `quadriceps`; secundário `gluteos`"; a biblioteca já soma os adutores. O `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` segue a biblioteca (como o agachamento com 2 halteres) |

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

## Fase C (18/11/2026)

Mesmo critério, ao escrever o texto do guia animado dos exercícios da fase C que já têm animação (C1, C2 e 7 de C3; os 4 que faltam de C3 entram quando a animação deles existir).

| Exercício | Campo do cartão | O que parece errado | Fonte | O que o texto do guia fez |
|---|---|---|---|---|
| `coice-maquina` | (biblioteca, não o cartão) | A ficha diz "Secundário: posteriores"; a biblioteca (`src/domain/biblioteca/exercicios.json`) não tem secundário. O `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` segue a biblioteca e o alvo do cartão ("Glúteos") |
| `coice-maquina` | (o desenho do equipamento, não o cartão) | O cartão do exercício e a ficha da técnica descrevem a máquina de quatro apoios ("um pé na plataforma ou na alavanca; o outro joelho apoiado", "tronco apoiado"), e a animação segue os dois. O desenho do equipamento que a pessoa marca (`public/equipamento/gluteo_maquina.svg`) é de uma máquina em pé, outro tipo. O cartão do exercício não está errado; o app mostraria duas máquinas diferentes. | o próprio cartão (`setupEq`, `setupBody`); ficha, linha Posição; `docs/revisoes/animacao-nova/lote-C1/coice-maquina.md` (seção "Qual máquina") e `resumo-deitado.md` | nada: o texto segue o cartão e a ficha (quatro apoios) |
| `voador-invertido` | (biblioteca, não o cartão) | A ficha diz "Secundário: costas (meio do trapézio). Na biblioteca: `ombro_posterior`; secundário `costas`"; a biblioteca não tem secundário. O `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` segue a biblioteca e o alvo do cartão ("Ombro (posterior)") |
| `triceps-maquina` | (o desenho do equipamento, não o cartão) | O cartão do exercício e a ficha da técnica descrevem a máquina com o braço apoiado à frente ("braços apoiados na almofada", o cotovelo no eixo), e a animação segue os dois. O desenho do equipamento que a pessoa marca (`public/equipamento/triceps_maquina.svg`) é de outra máquina, a de mergulho sentado (os pegadores ao lado do quadril). O cartão do exercício não está errado; quem tem a de mergulho sentado veria no guia a de braço apoiado. | o próprio cartão (`setupEq`, `setupBody`); ficha, título e linha Ajuste; `docs/revisoes/animacao-nova/lote-C3/resumo-bracos.md` (seção "O cartão de hoje do tríceps é outra máquina") | o `vary` diz que esta é a máquina com o braço apoiado à frente (e que há a de braço acima da cabeça, como a ficha); o resto segue o cartão |
| `hiperextensao` | (biblioteca, não o cartão) | A ficha diz "Secundário: lombar (eretores, fora dos 12 músculos)"; a biblioteca não tem secundário, porque a lombar não é um dos 12 músculos. Não parece erro; fica anotado porque o `feel` depende disso. | ficha, seção Músculos; biblioteca, campo `musculos` | o `feel` repete o alvo do cartão ("a lombar segura a coluna") |

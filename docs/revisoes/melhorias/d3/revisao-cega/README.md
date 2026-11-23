# Revisão cega do pacote D3 (23/11/2026)

> Três revisores no papel de treinadores (opinião simulada, não evidência) leram 24 páginas embaralhadas: a semana de 12 pessoas fictícias na `main` e a semana das mesmas pessoas no ramo `claude/d3-ajustes-do-treino`. Ninguém sabia qual era qual. Cada revisor tinha um olhar: eficiência; adequação à pessoa e segurança; "parece feito por treinador ou por máquina".
>
> **Duas rodadas.** A rodada 1 leu o ramo com a 1ª versão do último degrau do corte (commit `57d3a86`). Essa versão trocava a divisão de uma das pessoas (t5) e, na população, punha alguns programas a mais em dois defeitos da régua; foi refeita para não mudar qual divisão é escolhida (ver `../README.md`). Das 24 páginas, só a de t5 no ramo mudou com isso. A rodada 2 (pasta [`rodada-2/`](rodada-2/)) leu essa pessoa nas três versões que existiam então, com uma pessoa de controle repetida, por três revisores novos. Depois dela entrou a última trava do degrau (com folga na semana, o foco não desce do mínimo do nível), e a semana de t5 no ramo ficou igual à da `main`.

## O que há aqui

| Arquivo | O que é |
|---|---|
| [`briefing.md`](briefing.md) | O que os revisores receberam |
| [`paginas/`](paginas/) | As 24 páginas (D01 a D24), como foram lidas |
| [`chave/chave.json`](chave/chave.json) | Qual página é de quem e de qual versão ("antes" = `main`; "depois" = ramo) |
| [`chave/perfis.json`](chave/perfis.json) | As 12 pessoas fictícias |
| [`chave/notas.json`](chave/notas.json) | As notas de cada revisor, por página |
| [`chave/resultado.json`](chave/resultado.json) | As médias por pessoa |
| [`rodada-2/`](rodada-2/) | A rodada 2: o briefing, as 5 páginas, a chave e as notas |

**Como foi feita.** Cada revisor foi uma sessão separada, criada só para isso, que recebeu a pasta das páginas e o briefing, com a instrução de não abrir mais nada. A chave ficou numa pasta que a sessão não recebeu. O texto inteiro de cada revisor está na sessão dele (`session_01YRzts7MEg8ukrwZQKQF5x4`, `session_01YRzts7rJuCjdzCyecon8ny` e `session_01YRzts6DVK9WXSZnZXuXwVH`); aqui ficam as notas e o resumo dos comentários.

**Quem são as 12.** Cinco têm 3 grupos de foco ou mais (f1 a f5: o item 2 do pacote). Cinco tinham um dia acima de 110% do tempo (t1 a t5: o item 3). Duas são de controle (c1 e c2): as duas páginas são iguais, para medir o ruído dos revisores.

## O resultado que vale (o ramo como ficou)

| Pessoa | `main` | ramo | Soma | Rodada |
|---|---|---|---:|---|
| f4 | 5,7 · 7,0 · 7,0 | 6,7 · 7,3 · 7,0 | +1,3 | 1 |
| t4 | 5,0 · 4,7 · 5,7 | 5,0 · 5,7 · 6,0 | +1,3 | 1 |
| f1 (o Bruno) | 5,7 · 5,0 · 6,0 | 6,7 · 5,0 · 6,0 | +1,0 | 1 |
| f3 | 6,0 · 7,0 · 6,0 | 6,7 · 7,0 · 6,0 | +0,7 | 1 |
| t3 | 5,0 · 5,0 · 5,7 | 5,0 · 5,3 · 5,7 | +0,3 | 1 |
| f2 (a Carla), f5, t1, t2 | iguais | iguais | 0 | 1 |
| t5 | 3,7 · 3,0 · 3,0 | a mesma semana da `main` | 0 | 2 (a `main`) |
| c1, c2 (controle) | iguais | iguais | 0 | 1 e 2 |

Notas de 1 a 10, na ordem: eficiente · adequada à pessoa · agradável de fazer; média dos três revisores da rodada indicada.

**Quatro melhoram de 0,7 a 1,3 ponto, uma sobe 0,3 (do tamanho do ruído), sete ficam iguais (duas de controle e t5, cuja semana voltou a ser a da `main`), nenhuma piora.** Na t5, a rodada 2 mediu as três versões: a `main` (3,7 · 3,0 · 3,0), a 2ª versão do degrau, que cortava o foco dela de 10 para 7 séries (3,0 · 4,0 · 3,0: adequada sobe 1 ponto porque o dia de 52 min em 30 sumiu, eficiente cai até 1) e a 1ª, que trocava a divisão dela (4,7 · 5,7 · 4,7; 5,3 · 6,0 · 5,0 na rodada 1). A 1ª era a melhor para essa pessoa, mas com o custo na régua que o pacote não aceita (`../README.md`); a 2ª empatava com a `main`. Na versão que ficou, a semana dela tem folga (dias de superiores de 11 a 18 min), o degrau não corta o foco, e o dia de 52 min continua, com o aviso de sempre. Fica no backlog.

## A rodada 1, como foi lida

Notas de 1 a 10, na ordem: eficiente · adequada à pessoa · agradável de fazer. Média dos três revisores.

| | `main` | ramo |
|---|---|---|
| **Média das 12 pessoas** | 5,11 · 5,08 · 5,36 | **5,50 · 5,47 · 5,58** |

| Pessoa | Quem é (resumo) | `main` | ramo | Soma |
|---|---|---|---|---:|
| t5 | intermediária, suspensão e elásticos, 6 × 30 min, dor 7 no cotovelo, quer pernas e glúteos | 3,3 · 3,0 · 2,7 | 5,3 · 6,0 · 5,0 | +7,3 |
| f4 | intermediário, academia, 4 × 60 min, 4 focos de cima | 5,7 · 7,0 · 7,0 | 6,7 · 7,3 · 7,0 | +1,3 |
| t4 | intermediário, só halteres montáveis, 2 × 45 min, dor 7 no tornozelo, quer pernas e glúteos | 5,0 · 4,7 · 5,7 | 5,0 · 5,7 · 6,0 | +1,3 |
| f1 | o Bruno (intermediário voltando de pausa, 4 × 70 min, 4 focos de cima) | 5,7 · 5,0 · 6,0 | 6,7 · 5,0 · 6,0 | +1,0 |
| f3 | intermediária, casa com halteres e elásticos, 4 × 75 min, dor 7 no joelho, 4 focos de cima | 6,0 · 7,0 · 6,0 | 6,7 · 7,0 · 6,0 | +0,7 |
| t3 | iniciante, casa, 5 × 30 min, dor 4 no quadril, quer pernas e glúteos | 5,0 · 5,0 · 5,7 | 5,0 · 5,3 · 5,7 | +0,3 |
| f2 (a Carla), f5, t1, t2 | (quatro pessoas) | iguais | iguais | 0 |
| c1, c2 | controle: as duas páginas são iguais | iguais | iguais | 0 |

**Seis melhoram, seis ficam iguais (duas delas de controle), nenhuma piora.** Nas duas pessoas de controle, os três revisores deram à página repetida exatamente as mesmas notas; o mesmo na rodada 2. (A linha t5 desta tabela é da 1ª versão; a que vale está acima.)

## O que os revisores viram do que o pacote mudou

- **O dia de pernas curto de quem escolheu 4 focos de cima.** Na `main`, os três apontam "Inferior A com 34 a 39 min em 60 ou 70, com 2 séries de tudo" (f1, f4). No ramo, a nota de eficiência sobe 1 ponto nas duas pessoas; o dia continua com folga (36 e 47 min), e eles ainda pedem a 3ª série no agachamento.
- **O dia que passava do tempo.** O "Pernas B de 52 min para quem pediu 30" (t5) e o "dia B de 54 min em 45" (t2, t4) aparecem como defeito só nas páginas da `main`.
- **A pessoa que mais subia (t5) mudava de divisão na 1ª versão.** Conferido no gerador: na divisão recomendada (Empurrar/Puxar/Pernas 2x), o último degrau leva os dias de pernas de 35 e 52 min para 32 e 31, e o quadríceps e os posteriores de 10 para 7 séries. Com isso, a regra que já existia para a dor que esvazia um dia (`selecao.dia-sem-principal`) passava a aceitar a outra divisão (três dias de superiores e três de inferiores: 30 a 33 min, com 10 séries). Na 2ª versão, o degrau entrava depois da escolha: t5 ficava na divisão recomendada, com os dias de 32 e 31 min e 7 séries de coxa (rodada 2). Na que ficou, a semana dela é a da `main`.
- **Onde nada muda nas notas (t1, t2).** Quem treina pernas sem equipamento recebe as mesmas notas baixas nas duas versões: o problema que os revisores veem é a carga (agachamento com o peso do corpo para um avançado), não os minutos.

## O que eles apontam e o pacote não mexeu

Vai para o backlog (`docs/backlog.md`, "Do pacote D3"). É opinião de treinador simulado; o que for de dor pede fonte ou profissional.

1. **Sem equipamento, a intermediária e o avançado recebem a mesma semana,** com agachamento com o peso do corpo de 12 a 20 e ponte sem carga: os três pedem variações de um lado só, cadência lenta e pausa. O mesmo com halteres de até 12 kg e supino de 6 a 10 para o avançado.
2. **A divisão não acompanha o foco em pernas:** com 5 ou 6 dias, só 2 são de pernas, e os dias de superiores ficam com 11 a 22 min em 30.
3. **O dia A de quem treina pernas sem equipamento** tem um agachamento e 8 séries de panturrilha.
4. **A flexão nórdica em dupla, quase na falha, sem onde prender os pés** (os três estranham). Um dos três liga isso à dor forte no ombro: a pessoa apara a queda com as mãos. A biblioteca não marca o ombro nesse exercício. Pede fonte ou profissional.
5. **O afundo e o agachamento goblet com dor forte no tornozelo** (1 de 3 revisores). A biblioteca não marca o tornozelo. Pede fonte ou profissional.
6. **Dupla e drop set para o iniciante** (os três, na pessoa de controle c2) e drop set em músculo fora do foco.
7. **A mesma elevação lateral com halteres 3 vezes na semana,** inclusive no dia de pernas, e as mesmas duas remadas nos dois dias de superiores.
8. **Empurrar e Puxar com 41 a 46 min em 75** para a avançada com 4 focos (a Carla): é o "quem tem muito tempo fica com dias curtos", que o roteiro deixou fora do D3.

**Um defeito do material, e não do app:** a descrição que escrevi para o Bruno (f1) não lista a barra, a bola suíça, os elásticos e o step que o cenário dele tem. Os três revisores tiraram ponto de "adequada" por isso, igualmente nas duas páginas (5,0 e 5,0).

## O que a rodada 2 acrescentou

Os três revisores novos repetem o que a rodada 1 viu na t5: os dias de superiores de 11 a 18 min em 30, só isoladores por causa do cotovelo, e o foco em pernas e glúteos com pouco volume. Pedem as séries que sobram nos dias curtos para glúteo e coxa sem carregar o cotovelo, e variações de um lado só. É o item 2 da lista acima. Também apontam as duplas com números de séries diferentes (2 com 4, 3 com 2).

## Limites

- São três leituras de um modelo, não três treinadores. Serve para achar o que a régua não mede, não para provar que o treino é melhor.
- A diferença de 0,3 ponto (t3) é do tamanho do ruído que rodadas anteriores mediram entre revisores. A rodada 2 tem uma pessoa só.
- As páginas das outras 11 pessoas foram geradas de novo com o gerador como ficou e comparadas com as lidas: são as mesmas.
- As 12 pessoas foram escolhidas entre as que mudam; a maioria da população não muda com o pacote.

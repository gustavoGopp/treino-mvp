# D3. Os ajustes do treino que já têm medida: o registro do pacote

> Aberto e feito em 23/11/2026, no ramo `claude/d3-ajustes-do-treino`, a partir da `main` (`129f590`). Roteiro: `docs/prompts/sessao-desenvolvimento-2.md`, seção "D3", com o "Como conduzir cada item" de `docs/prompts/sessao-melhorias-analise-critica.md`. **Nada daqui foi para a `main`: espera o ok do Gustavo.** O pacote D4 corre ao mesmo tempo, noutra cópia, com o ok dele de 22/11.

## Os três itens, em palavras simples

| # | O defeito (medido antes) | O que mudou | Regra |
|---|---|---|---|
| 1 | Depois que um exercício empaca, o aviso "sem melhora" aparecia em todo treino (16,7 a 17,2 de 48 sessões no simulador) | O aviso sai uma vez e só volta depois de outra janela inteira parada (4, 8 ou 16 treinos, pelo nível) | `progressao.estagnacao` |
| 2 | Com 3 grupos de foco ou mais, quem não é foco não subia: o Bruno (4 grupos de cima, 4 dias de 70 min) ficava com pernas em 8 séries e o dia de pernas com 39 min | Quem não é foco sobe até o mínimo do nível (6, 10 ou 12), com o foco pelo menos 1,3 vez acima | `tempo.sobra-series` |
| 3 | Pernas sem equipamento com dor forte no ombro: o dia passava do tempo (51 a 54 min em 45; 34 em 30), e o corte de tempo não alcançava | Um último degrau no corte: o dia que ainda passa de 110% perde séries também abaixo do mínimo do nível do foco, sem descer de 4, só até caber | `tempo.corte` |

## Item 1: o aviso de "sem melhora"

Medido no simulador de 48 sessões (`scripts/auditoria/prototipo/longo-prazo.ts`; média de 15 casos; `docs/revisoes/treino-para-todos/medidas/longo-prazo.md`).

| Nível | Treinos com o aviso, antes | Depois | A carga sobe (igual) |
|---|---:|---:|---:|
| Iniciante | 16,7 | 8,4 | 1,9 |
| Intermediário | 16,9 | 3,7 | 0,7 |
| Avançado | 17,2 | 1,9 | 0,5 |

- **O texto do aviso não mudou.** Entre um aviso e outro, a sugestão é a de sempre ("mantenha a carga e busque +1 repetição"), e o exercício continua contando como parado para a semana leve (`deload.semana-leve`).
- **Repetir só depois de outra janela é escolha do projeto [opinião]**; o tamanho da janela (4, 8, 16) continua sendo o da regra, também escolha do projeto, à espera de um export de uso real.
- **Não muda programa nenhum:** é da progressão, não do gerador. Testes: `tests/unit/sem-melhora.test.ts` (21).

## Item 2: com 3 focos ou mais, quem não é foco sobe

Nas personas (as outras 10 ficam iguais):

| Persona | Antes | Depois |
|---|---|---|
| Bruno (4 grupos de cima, 4 × 70 min) | pernas 8 séries, glúteos 7, panturrilha 6; Inferior A 39 min, Inferior B 57 min | pernas 9, glúteos 9, panturrilha 8; Inferior A 47 min, Inferior B 63 min |
| Carla (4 focos, 5 × 75 min) | glúteos 9; Pernas 65 min | glúteos 10 (hip thrust de 2 para 3 séries); Pernas 67 min |

O foco não muda em nenhuma das duas. Os snapshots do Bruno e da Carla foram regravados num commit próprio (`a277445`), com este motivo.

**O que a medida mostrou depois do commit.** A grade de qualidade (911.625 programas, com a combinação "pernas + glúteos + abdômen", que o retrato da população não tem) achou o dia fraco (A2 da régua) a mais em alguns casos de dor 7 no cotovelo com esses 3 focos: com quem não é foco mais alto, a regra da dor que esvazia um dia (`selecao.dia-sem-principal`) deixava de trocar a divisão. A subida passou a valer só no programa já escolhido, como o item 3 (abaixo). Nada muda nas personas.

## Item 3: o último degrau do corte de tempo

O caso que deu origem (o teste `tests/unit/ultimo-degrau-do-corte.test.ts` prende os números): pernas sem equipamento, dor forte no ombro, 2 dias.

| Quem | O dia mais longo, antes | Depois |
|---|---:|---:|
| Intermediário, 45 min | 51 min | 48 min |
| Avançado, 45 min | 54 min | 48 min |
| Intermediário, 30 min | 34 min | 32 min |

Os exercícios são os mesmos; saem só séries. Nenhuma das 12 personas muda.

**As travas do degrau:** nenhum músculo desce do piso de 4 por causa dele; nenhum exercício fica com menos de 2 séries; a coxa não sai da faixa de 0,5 a 2; empurrar ÷ puxar não passa de 1,5 por causa dele; só sai a série que encurta o dia (numa dupla, as duas juntas); se nem assim o dia couber em 110%, nada sai.

### Três versões, e por que ficou a terceira

| Versão | O que fazia | Medida (contra a `main`) | Decisão |
|---|---|---|---|
| 1ª (`57d3a86`) | O degrau rodava dentro de todas as montagens; o dia que só coube por ele contava como "acima do tempo" nas comparações | Na população, o dia acima de 110% de 22.415 para 9.203; mas 23 pares "grupo × defeito" da régua subiam (o dia fraco em 1 programa; empurrar ÷ puxar em até 8, com 6 dias). Uma pessoa da revisão cega (t5) mudava de divisão | Saiu: um defeito piorava |
| 2ª | O programa é escolhido sem o degrau e só depois refeito com ele; e o degrau não leva empurrar ÷ puxar acima de 1,5 | Nenhum par da régua sobe. Mas o "músculo abaixo da faixa com tempo sobrando" (cuidado 4 do retrato) subia em 5 grupos, porque o degrau cortava o foco abaixo do mínimo em semanas com folga | Ajustada |
| 3ª (a que ficou) | A 2ª, mais: com folga na semana (o dia típico abaixo de 85% dos minutos), nenhum músculo desce do mínimo do nível por causa do degrau | Ver abaixo | Fica |

## A medida final (o ramo como ficou, contra a `main`)

Três medidas, cada uma rodada no gerador da `main` e no do ramo, com a mesma régua e a mesma biblioteca. "Defeito" e "nota" são os da régua da G5 (`scripts/auditoria/regua.ts`); "cuidado" é a medida mais larga do retrato (`scripts/auditoria/cuidados.ts`).

**A população** (`scripts/auditoria/retrato.ts`: 680.625 programas, todas as combinações de equipamento, nível, dias, minutos, foco e dor; "ponderada" pesa as combinações mais prováveis, com pesos estimados):

| Medida | `main` | Só o item 2 | O ramo (itens 2 e 3) |
|---|---:|---:|---:|
| Programas sem nenhum defeito da régua (grade · ponderada) | 91,0% · 97,1% | 91,0% · 97,1% | **92,6% · 98,2%** |
| Programas sem nenhum cuidado do tipo defeito (grade · ponderada) | 46,9% · 55,9% | 47,1% · 56,0% | **47,5% · 56,2%** |
| Dia mais longo acima de 110% dos minutos (A3) | 22.415 | 22.415 | **10.064** |
| Dia mais curto abaixo de 60% do mais longo (nota A5) | 117.992 | 116.286 | 115.433 |
| Empurrar ÷ puxar acima de 1,5 (D1) | 3.102 | 3.102 | 3.056 |
| O foco não passa da mediana dos outros (nota C2) | 67.102 | 67.102 | 67.202 |
| Intermediário ou avançado com a média dos músculos abaixo da faixa (cuidado, nota) | 289.645 | 287.223 | 287.230 |
| Pares "grupo × defeito da régua" que sobem (132 grupos × 9 defeitos) | | 0 | **0** (225 descem) |

- **As notas que sobem:** C2 (o foco não passa da mediana dos outros), em 100 programas: é o custo do item 3, que tira séries do foco para o dia caber; e "o mesmo músculo com 3 séries diretas em dias seguidos" (445, do item 2: as pernas do Bruno ganham séries nos dois dias de pernas).
- **Um cuidado do tipo defeito sobe em 3 grupos,** "músculo abaixo da faixa do nível com tempo sobrando" (foco em pernas: +9 de 17.354; foco inferiores: +5; avançado de 30 min: +2), e cai 1.747 no total. Conferido caso a caso nos 14 programas com foco em pernas ou inferiores: o músculo marcado (o bíceps, com dor 7 no ombro; as costas, com dor 7 no punho) já estava abaixo da faixa na `main` e não perde série. O que muda é o dia típico: o degrau encurta o dia longo, e a mediana dos dias cai abaixo de 85%. É a medida que passa a marcar, não um corte. Fica registrado no backlog.

**A grade de qualidade** (`npm run auditoria:qualidade`: 911.625 programas, 13 combinações de foco, exercício evitado):

| Suspeito | `main` | O ramo |
|---|---:|---:|
| Dia acima de 110% (A3) | 35.365 | **15.817** |
| Dia fraco (A2) | 40.427 | 40.427 |
| Foco abaixo da meta com tempo e exercício (C1) | 15.671 | 15.660 |
| Empurrar ÷ puxar (D1) | 4.817 | 4.719 |
| Quadríceps ÷ posteriores fora da faixa (D3) |  1.376 | 1.374 |
| Tempo pouco usado | 158.106 | 158.100 |
| Os outros 5 (poucos exercícios no dia, monotonia, prioridade abaixo com tempo, avaliador, E1) | iguais | iguais |

Nenhum suspeito sobe. (Antes de o item 2 ir para dentro do programa já escolhido, o dia fraco subia de 40.427 para 40.435 aqui: os casos de dor 7 no cotovelo com foco em pernas, glúteos e abdômen.)

**A grade da régua** (`npm run auditoria:regua`: 108.900 programas): sem dor, sem defeito, de 92,4% para 95,2%; o dia acima de 110% de 4.032 para 2.092; nenhum defeito sobe em nenhum grupo; a nota C2 sobe de 11.081 para 11.108.

**As 12 personas:** mudam só o Bruno e a Carla (item 2, tabela acima). O item 3 não muda nenhuma.

**O que a última trava custou:** sem ela (a 2ª versão), o dia acima de 110% caía para 9.200 na população; com ela, 10.064. Cerca de 860 programas ficam com o dia longo porque a semana deles tem folga.

## A revisão cega

Em `revisao-cega/README.md`. Duas rodadas, seis revisores simulados (opinião, não evidência). Resumo: das 12 pessoas fictícias, quatro melhoram de 0,7 a 1,3 ponto, uma sobe 0,3 (do tamanho do ruído), sete ficam iguais (duas de controle, e t5, cuja semana voltou a ser a da `main` com a última trava), nenhuma piora.

## Decisões técnicas da sessão, com o motivo

- **Os dois ajustes que mudam programas (itens 2 e 3) ficam fora das comparações entre montagens e entre divisões.** O gerador escolhe a divisão e a montagem como na `main` e só depois refaz o programa escolhido com os ajustes. Motivo medido: dentro das comparações, os dois mudavam a escolha da divisão em casos de dor, e defeitos da régua subiam em alguns grupos.
- **O degrau não corta o foco abaixo do mínimo do nível quando a semana tem folga.** Ali o tempo sobra nos outros dias; cortar o foco trocaria um dia longo por um músculo abaixo da faixa com tempo sobrando. O dia longo continua com o aviso de sempre ("reserve uns minutos a mais nesse dia, ou escolha X min na rotina"). [opinião], com a medida acima.
- **O limite de 85% é o mesmo do "uso bom" da régua** (`scripts/auditoria/cuidados.ts`), para a regra e a medida falarem a mesma língua.

## O que ficou de fora

Está em `docs/backlog.md`, "Do pacote D3".

# Fechamento da etapa 2 (17/11/2026)

> Sessão "treino para todos". A etapa 2 levou para o app, um pacote por vez, o que a etapa 1 propôs. Tudo foi feito no ramo `claude/nifty-albattani-mltt95`. **Em 17/11/2026, com o ok do Gustavo, o ramo foi juntado na `main`** (seções 9.1 e 9.2). Esta página é o resumo que serviu para ele decidir; as seções 1 a 9 estão como foram escritas antes da junção. Todas as pessoas citadas são fictícias.

## 1. Em uma página

- **O que foi feito.** Seis pacotes (0 a 5) e uma correção de segurança no último dia (a marca do ombro). Cada regra entrou com selo, fonte e teste, e foi medida antes e depois em 680.625 programas fictícios.
- **O resultado na régua.** Os programas sem nenhum defeito da régua oficial foram de **79,4% para 91,0%** (contando cada combinação de perfil uma vez) e de **78,1% para 97,1%** (dando mais peso aos perfis mais comuns; os pesos são estimativa). Quatro dos nove defeitos foram a zero ou quase ("tempo sobrando sem aviso", "o mesmo exercício em todos os dias", "músculo com 1 a 3 séries" e "exercício em região com dor forte"), e o "dia fraco" caiu 61%.
- **O resultado para as pessoas.** Na revisão cega final (18 pessoas, 3 revisores), as notas médias subiram de 5,4 · 5,9 · 5,2 para **5,9 · 6,3 · 5,5** (eficiente · adequada · agradável). Nove pessoas melhoram, oito ficam iguais, uma cai 0,3 ponto em uma nota (o Bruno).
- **Quem mais ganhou.** A Marina (intermediária, 4 dias de 60 min): os treinos dela usavam 37 a 46 minutos e agora usam 58 a 60; as notas foram de 4,7 · 6,0 · 5,3 para 7,0 · 7,7 · 6,7. O Gilberto (67 anos, nunca treinou): saiu o agachamento búlgaro, que os três revisores chamaram de risco de queda.
- **Quem não ganhou nada.** Cinco das doze pessoas-exemplo têm a mesma semana de antes: são as que treinam em casa com pouco ou nenhum equipamento (Diego, Elisa, Fábio, Íris, Kátia). Para elas, o limite é a biblioteca de exercícios, não as regras.
- **O que não fecha por inteiro.** Três pontos, na seção 5. Nenhum é de segurança.
- **O que falta.** A junção com a `main`, que andou 280 commits desde que esta sessão começou (o frontend novo). Ela pede trabalho antes (seção 8) e a sua decisão.

Para ver com exemplos: [`exemplos-finais/`](exemplos-finais/README.md) (as doze pessoas, a semana de antes ao lado da de agora).

## 2. O que entrou, pacote por pacote

| Pacote | O que muda, em uma frase | Exemplo | Relatório |
|---|---|---|---|
| **1** (13/11) | O tempo que sobra no treino vira série, até um teto, em todos os dias | Marina: 60 séries por semana viram 84; dias de 37 a 46 min viram 58 a 60 | [`pacote-1.md`](pacote-1.md) |
| **0** (14/11) | Com dor forte no joelho, ninguém ajoelha; a vaga que a dor esvazia recebe outro exercício do mesmo músculo | Leandro (dor 7 no joelho): saem as duas puxadas ajoelhadas e o abdominal ajoelhado | [`pacote-0.md`](pacote-0.md) |
| **3** (15/11) | A dor não desmonta a semana: quando ela esvazia um dia, a semana é remontada; o mesmo exercício nunca em todos os dias; treinos de 30 min; os dois exercícios de uma dupla ficam juntos | X3 (dor 7 no ombro): os dois dias de 12 minutos somem | [`pacote-3.md`](pacote-3.md) |
| **2** (15 e 16/11) | A escolha entre exercícios equivalentes deixa de ser por ordem alfabética: vem o mais comum; em máquina, polia e barra, o de dois lados antes do de um lado só; dois exercícios que carregam a lombar não ficam no mesmo dia se houver outro | Carla e Bruno: a puxada de um lado só ajoelhada vira a puxada pela frente | [`pacote-2.md`](pacote-2.md) |
| **4** (16/11) | O corte de tempo fica mais esperto (primeiro troca o exercício de um lado pelo de dois lados); o iniciante repete os mesmos movimentos na semana, para aprender | Jonas (2 dias de 30 min): o dia de 38 minutos passa a caber em 30. Leandro: 21 exercícios diferentes viram 16 | [`pacote-4.md`](pacote-4.md) |
| **5** (16/11) | O aviso de "sem melhora" espera 4, 8 ou 16 treinos, conforme o nível (antes, 3 para todos); o programa passa a guardar o nível (dados na versão 9, com migração) | No simulador de 48 treinos, o aviso aparecia em 24 a 41 treinos e agora aparece em 17 | [`pacote-5.md`](pacote-5.md) |
| **Marca do ombro** (17/11) | Com dor forte no ombro, sai o agachamento com a barra nas costas (livre e no Smith) | X3: o agachamento com barra vira o leg press; a nota de "adequada" vai de 3,7 para 5,0 | seção 6 desta página |

**Ciência, costume de treinador e aposta.** Quase tudo que entrou tem o selo "consenso de treinadores" em `docs/pesquisa/regras.md`: é costume de quem treina gente, sem estudo que compare as duas opções. A ciência mais forte está por trás do pacote 1 (mais séries, até um teto, dão mais resultado). São apostas do projeto, sem estudo: os números 4, 8 e 16 do aviso de "sem melhora" e a ordem de referência dos exercícios.

**O que foi medido e não entrou** (com o número, no backlog): "o exercício mais simples primeiro para o iniciante" (duas vezes: criava dia fraco), o limite de 6 exercícios do iniciante (terá teste próprio), tirar as duplas e o drop set do iniciante (duas vezes: o treino deixava de caber no tempo), a versão larga dos dois lados (duas pessoas pioravam).

## 3. Os números, da `main` de antes ao ramo de agora

680.625 programas fictícios. "Grade" conta cada combinação uma vez; "ponderada" dá mais peso aos perfis mais comuns (estimativa).

| | `main` | ramo | 
|---|---:|---:|
| **Programas sem nenhum defeito da régua (grade)** | 79,4% | **91,0%** |
| **Idem, ponderada** | 78,1% | **97,1%** |
| Programas sem nenhum defeito dos 20 cuidados (ponderada) | 35,4% | 57,5% |
| Uso do tempo: o dia típico em % dos minutos pedidos (ponderada) | 81,9% | 85,9% |
| Séries por semana, em média (ponderada) | 58,4 | 63,1 |
| Exercícios diferentes por semana, em média (ponderada) | 20,1 | 18,3 |

Os nove defeitos da régua, em número de programas (de 680.625):

| Defeito | `main` | ramo |
|---|---:|---:|
| Dia fraco (menos de 3 exercícios, ou sem exercício grande) | 71.999 | 28.380 |
| Dia mais longo que o tempo pedido (acima de 110%) | 27.039 | 22.403 |
| Tempo sobrando (dia abaixo de 70%) sem o app avisar | 21.886 | 0 |
| Foco abaixo da meta, com tempo e exercício para chegar lá | 11.864 | 10.213 |
| Exercício impossível ou em região com dor forte | 7.773 | 0 |
| Empurrar bem mais que puxar | 3.606 | 3.090 |
| O mesmo exercício em todos os dias, havendo outro | 2.646 | 0 |
| Coxa da frente e de trás fora de equilíbrio | 803 | 804 |
| Músculo com 1 a 3 séries, havendo tempo e exercício | 439 | 1 |

**O pior grupo.** Na `main`, era quem tem dor forte no cotovelo: metade dos programas tinha defeito (50,0% sem defeito). Agora esse grupo está em 75,6%, e o pior grupo é o dos treinos de 30 minutos, com 73,8% (era 66,9%).

Todos os números por grupo: [`qa.md`](qa.md), seção de fechamento, e [`medidas/final/retrato.md`](medidas/final/retrato.md).

## 4. O critério de pronto, item por item

| Critério | Situação |
|---|---|
| Os 20 cuidados medidos por grupo | Cumprido ([`qa.md`](qa.md)) |
| Nenhum defeito pior que na `main`, em nenhum grupo | **Cumprido nos totais; com ressalva por grupo** (seção 5, ponto 1) |
| O pior grupo melhor do que era | Cumprido (50,0% → 73,8%) |
| Revisão cega: notas médias maiores | Cumprido (5,43 · 5,85 · 5,15 → 5,91 · 6,31 · 5,52) |
| Revisão cega: nenhuma pessoa pior | **Quase: 1 de 18 cai 0,3 ponto em uma nota** (seção 5, ponto 2) |
| Toda regra com selo, fonte e teste | Cumprido (165 regras; 7 arquivos de teste novos) |
| `check`, `test:e2e` e auditoria em duas rodadas, limpos | `check` limpo (1.014 testes) e testes de tela limpos (158), rodados depois da marca do ombro. Auditoria em duas rodadas limpa: 39 arquivos idênticos e nenhum defeito acima da linha de base da régua |
| Motor de animação, telas, `api/` e `CLAUDE.md` sem mudança | Cumprido. Três exceções, todas autorizadas por você: uma regra de estilo (zoom de 200%), o nível guardado no programa (dados na versão 9) e o ajuste de 10 testes de tela |
| Só personas fictícias; nada de `privado/` | Cumprido (`tests/repo/privacidade.test.ts` passa) |

## 5. O que não fecha por inteiro

Três pontos. Nenhum é de segurança. Os dois primeiros você já conhece; o terceiro é novo.

1. **Na contagem por grupo, 27 pares "grupo × defeito" ficam acima da `main`** (e 269 ficam abaixo). São os mesmos que você aceitou nos pacotes 2 e 4. O maior: entre os avançados que treinam 2 dias, "foco abaixo da meta" foi de 2.000 para 2.028 programas (de 45.375). As duas correções estão no backlog ("a razão empurrar ÷ puxar na distribuição inicial" e "o 4º exercício do foco").
2. **O Bruno perde 0,3 ponto em eficiência** (5,7 → 5,3): um dos três revisores deu 6 a uma semana e 5 à outra, com a mesma crítica nas duas (braços e ombros acima das pernas, que é o que ele pediu com 4 focos de cima). No ramo, a série que sobrou foi para a rosca e a elevação lateral. É uma diferença do tamanho do ruído entre rodadas (seção de limites em [`revisao-cega/final/README.md`](revisao-cega/final/README.md)), mas está aí. Fica no backlog: com 3 focos ou mais, a série que sobra não deveria ir para o braço enquanto a perna está no mínimo.
3. **A marca do ombro deixa 4 programas (de 45.375 com dor forte no ombro) com um dia longo demais.** São pessoas que só têm a máquina Smith e querem pernas. Sem poder agachar no Smith, recebem o treino de quem não tem equipamento nenhum (idêntico, conferido), que já tinha esse defeito. Em troca, 1.925 programas deixam de pôr a barra nas costas de quem tem dor forte no ombro. Detalhe na seção 6.

## 6. A marca do ombro (17/11)

- **O que os revisores acharam.** Na revisão cega final, os três apontaram o agachamento com a barra nas costas para a pessoa com dor 7 no ombro. O defeito já existia na `main`: o dado desses dois exercícios não marcava o ombro.
- **O que foi feito, com o seu ok.** O agachamento livre com barra e o agachamento no Smith passaram a marcar o ombro. Com dor acima de 5 no ombro, saem; com dor de 3 a 5, perdem a vez para um equivalente. Um teste novo confere que todo exercício cujo texto diz "barra no alto das costas" marca o ombro.
- **Selo.** Consenso de treinadores (a posição da barra pede o ombro aberto e rodado para fora). Está em `seguranca.dor.programa`.
- **A medida** (nos 90.750 programas de quem marcou dor no ombro): 3.264 mudam; 1.925 deixam de ter o exercício com dor forte; 4 ganham um dia acima do tempo (ponto 3 da seção 5); nenhum outro defeito aparece.
- **A conferência.** Numa mini-rodada cega (3 revisores, 6 páginas), a nota de "adequada" dessa pessoa foi de 3,7 para 5,0.
- **O que os revisores ainda apontam e não foi mexido.** A rosca Scott com dor forte no ombro (2 de 3 revisores; a biblioteca não marca; precisa de fonte). E o fato de o app tirar peito, costas e ombros por inteiro em vez de adaptar o movimento: o app não diagnostica, e recomenda avaliação profissional.

## 7. O que continua sem solução

Em ordem do que eu atacaria primeiro. Tudo está em `docs/backlog.md`.

1. **Duplas e drop set para quem está começando** (Gilberto, Ana, Diego). É a crítica que mais se repete nas revisões. Tirar as técnicas foi medido duas vezes e não entrou: o treino deixa de caber no tempo e aparece dia fraco. O caminho provável é outro: menos exercícios por dia para o iniciante. É o teste do "limite de 6 exercícios" que você já marcou para depois.
2. **Com 3 focos ou mais, braço acima de perna** (Bruno).
3. **Quem tem muito tempo fica com dias curtos** (Carla: 43 a 48 minutos em 75). O teto de séries segura; falta decidir o que fazer com a sobra.
4. **Treino em casa sem equipamento: costas e bíceps com zero** (Elisa, Kátia). O app não inventa improviso; faltam exercícios na biblioteca. É conteúdo, não regra.
5. **Pernas sem equipamento com dor forte no ombro: dia longo demais** (os 4 programas da seção 5).
6. **Rosca Scott e hip thrust: carregam o ombro e a lombar?** Os revisores acham que sim; a biblioteca não marca. Pedem fonte.
7. **Os números 4, 8 e 16 do aviso de "sem melhora"**: recalibrar quando houver um export de uso real.

## 8. Pedidos às outras sessões

- **Animação** ([`pedidos-a-animacao.md`](pedidos-a-animacao.md)): os cartões de texto por dia quase não mudam (1,90 → 1,94, ponderada), mas mudam quais exercícios pedem animação. A ordem do pedido: puxada pela frente, hip thrust, cadeira flexora e extensora, voador, leg press, rosca Scott. E a versão sentada das puxadas ajoelhadas.
- **Design** ([`pedidos-ao-design.md`](pedidos-ao-design.md)): rever a correção do zoom de 200% no estilo novo; rever o tom de quatro textos novos; decidir como mostrar o aviso de "sem melhora" que se repete.

## 9. A ida para a `main`

**Onde a `main` está.** Desde que esta sessão começou, a `main` recebeu 280 commits (o frontend novo). Eles mexem em telas, estilo e testes de tela; não mexem no gerador, nas regras, na pesquisa nem nos dados guardados (lá a versão dos dados ainda é a 8).

**O ensaio que eu fiz** (numa cópia, desfeito depois; a `main` não foi tocada): juntar as duas dá 4 conflitos, em `docs/backlog.md`, `docs/devlog.md`, `src/styles.css` e `tests/e2e/treino.spec.ts`. Além disso, os testes de tela novos da `main` citam o agachamento búlgaro em 21 lugares, e neste ramo a Ana e o Bruno recebem o agachamento goblet: esses testes vão falhar até serem ajustados.

**O caminho que eu recomendo, em dois passos:**

1. **Trazer a `main` para dentro deste ramo** (a `main` continua intocada). Resolver os 4 conflitos, ajustar os testes de tela novos, refazer a correção do zoom de 200% no estilo novo, e rodar tudo de novo: `check`, testes de tela, auditoria em duas rodadas e a medida da população. Parar e mostrar o resultado a você.
2. **Só então, com o seu ok, juntar o ramo na `main`**, sem forçar nada.

**Riscos e cuidados:**

- **Exporte os seus dados antes do passo 2.** O ramo muda os dados guardados no aparelho da versão 8 para a 9 (o programa passa a guardar o nível). A migração é automática e tem teste, mas ela não volta atrás: um app na versão 9 não abre num código antigo. Use "Exportar meus dados", na tela de dados do app, antes de atualizar.
- **O seu programa vai mudar** quando você gerar de novo, do jeito que os exemplos mostram (exercícios de dois lados, mais séries onde sobrava tempo).
- **Os testes de tela da `main` são de outra sessão.** Ajustá-los (trocar "búlgaro" por "goblet" onde o teste confere o nome do exercício) é mexer em `tests/e2e/`, que você já autorizou uma vez, no pacote 2. No passo 1 eu mostraria a lista antes de ajustar, como da outra vez.
- **Se a `main` continuar andando** enquanto o passo 1 acontece, o passo se repete, menor.

## 9.1 O passo 1, feito em 17/11/2026 (com o ok do Gustavo)

A `main` foi trazida para dentro do ramo. **A `main` não foi tocada.** Como ela andou enquanto o passo rodava, foram três junções no mesmo dia:

| Junção | O que veio da `main` | Conflitos | Commit |
|---|---|---|---|
| 1ª | 280 commits: o frontend novo e a animação nova | 4 (backlog, devlog, estilo, um teste de tela) | `69e2d67` |
| 2ª | 45 commits: a sessão de textos (texto das telas cortado, a página "Entenda o treino", uma frase em linguagem simples por regra) | 5 (`regras.md` e quatro testes de tela) | `d8475ff` |
| 3ª | 2 commits: o bloqueio de novos treinos depois do sinal de alerta do coração | nenhum | `04284bb` |

**O que precisou de trabalho meu, além de resolver conflito:**

1. **As frases das regras.** A sessão de textos criou uma frase em linguagem simples para cada regra e um teste que exige uma por regra. Faltavam as das 2 regras novas da etapa 2, e 11 frases diziam o que a regra dizia antes da etapa 2 (por exemplo, "estagnar é passar 3 treinos seguidos", quando agora são 4, 8 ou 16). Escrevi as 2 e atualizei as 11, pelo guia de redação da própria sessão de textos. **É texto que aparece no app**: está tudo, antes e depois, em [`frases-das-regras.md`](frases-das-regras.md), para você e a sessão de textos reverem.
2. **Os testes de tela.** A sessão de textos reescreveu vários testes que ainda citavam o agachamento búlgaro. Em cada conflito ficou a estrutura da `main` com o exercício deste ramo (o goblet). Fora dos conflitos, troquei o nome do exercício em 4 linhas de testes novos da `main` (`acompanhamento`, `entenda` e duas em `treino`), e adaptei o teste que criei no pacote 2 (o afundo, "cada lado") ao guia novo, que não mostra mais a linha da prescrição. Em relação à `main`, o ramo difere em 6 arquivos de `tests/e2e/`, sempre pelo mesmo motivo: o 1º exercício da Ana é o goblet, e não o búlgaro.
3. **A regra `volume.semanal.minimo`**: as duas sessões mexeram na mesma região de `regras.md`. Ficou a linha da `main` para o mínimo e a deste ramo para o alvo.

**O que não precisou de trabalho:** a correção do zoom de 200% (o estilo novo da `main` resolve de outro jeito; `src/styles.css` está igual ao da `main`, e a exceção de 15/11 deixou de existir) e os dados guardados (a `main` acrescentou dois campos opcionais sem mudar a versão; o ramo fica na versão 9, com os campos dela).

**Conferido no estado juntado:**

| O que | Resultado |
|---|---|
| Telas, motor de animação, estilo, `api/` e `CLAUDE.md` | Iguais aos da `main`, arquivo por arquivo |
| `npm run check` | Limpo: 67 arquivos, 1.033 testes |
| Testes de tela | Limpos: 180 (os 158 deste ramo e os 22 novos da `main`) |
| As conferências novas da `main` (`conferir:tokens`, `conferir:animacao`) | Passam |
| A medida da população (680.625 programas) | **Idêntica à do fechamento, byte a byte.** As junções não mudam nenhum programa: a `main` não mexeu no gerador nem na biblioteca de exercícios |
| Auditoria em duas rodadas | Limpa: 39 arquivos idênticos nas duas rodadas, nenhum defeito acima da linha de base da régua, e nenhum relatório mudou em relação ao do fechamento |

## 9.2 O passo 2, feito em 17/11/2026 (com o ok do Gustavo)

O ramo foi juntado na `main`, sem forçar nada.

| O que | Resultado |
|---|---|
| A `main` antes | `ef73b17`, já inteira dentro do ramo (nenhum commit novo desde a verificação do passo 1) |
| A junção | Um commit de junção, `5fdb0ad`, com a `main` como primeiro pai e o ramo verificado (`45bcfd0`) como segundo |
| O conteúdo da `main` depois | Idêntico ao do ramo verificado no passo 1: nenhuma linha de diferença |
| Como foi enviado | `git push origin main`, avanço simples (`ef73b17..5fdb0ad`), sem `--force` |

Depois da junção, só os documentos mudaram (esta seção, a página de entrada da sessão, o devlog e o backlog), para registrar que ela foi feita.

**O que deu errado depois da junção, e a correção.** A verificação automática da `main` (a que o GitHub roda a cada envio) falhou no commit da junção: um teste antigo do gerador (`tests/unit/gerador.test.ts`, a propriedade da dor em 1 ou 2 regiões, 672 combinações) estourou o limite de 5 segundos. Não era erro de resultado. Desde o pacote 3, com dor forte o gerador monta a semana em mais de uma divisão e fica com a melhor: o teste foi de cerca de 1,9 s para 2,7 s, e de 4 a 5 s com a medida de cobertura ligada (cerca de 4 milésimos de segundo por programa). A correção, enviada à `main` com o ok do Gustavo (`feed6c7`): o teste passa a ter o limite de 30 s que as outras propriedades do mesmo arquivo já têm. **Por que escapou:** antes de juntar eu rodei `npm run check`, que não liga a cobertura; a verificação automática roda `npm run test:cobertura`. A lição está no backlog.

**A segunda falha, nos testes de tela.** Com o teste do gerador corrigido, a verificação automática chegou aos testes de tela e 1 dos 180 falhou: no guia do goblet com zoom de 200%, a palavra "subida" da barra de tempo ficava cortada (39 px de texto num trecho de 38 px). O defeito de tela já existia para exercícios com uma fase curta; apareceu porque o 1º exercício da Ana deixou de ser o búlgaro. Aqui a diferença ficava exatamente na tolerância do teste e ele passava. A correção, com a autorização do Gustavo: uma linha em `src/styles.css`, na regra de tela estreita, que diminui a letra da barra de tempo de 13 para 11 px só em telas de até 279 px. O pedido para o design rever está em [`pedidos-ao-design.md`](pedidos-ao-design.md), item 9.

**O que muda para quem usa o app a partir da `main`:**

- **Os dados guardados passam da versão 8 para a 9** na primeira abertura (o programa passa a guardar o nível). A migração é automática e tem teste. Ela não volta atrás: um app na versão 9 não abre num código de antes da junção.
- **O programa muda quando for gerado de novo**, do jeito que os exemplos mostram: exercícios de dois lados em máquina, polia e barra; mais séries onde sobrava tempo; o aviso de "sem melhora" depois de 4, 8 ou 16 treinos, conforme o nível.

**O que fica para depois** está em `docs/backlog.md`: as 13 frases das regras para a sessão de textos rever, o teste próprio do limite de 6 exercícios do iniciante, e os itens da seção 7 desta página.

## 10. Como conferir

```bash
npm run check
```

```bash
npm run test:e2e -- --trace off
```

```bash
npm run auditoria:verificar
```

```bash
npx vite-node scripts/auditoria/retrato.ts -- --processos 4 --saida /tmp/retrato-final
```

```bash
npx vite-node scripts/auditoria/comparar-retratos.ts -- docs/revisoes/treino-para-todos/medidas/main-com-a-regua-de-14-11/retrato.json docs/revisoes/treino-para-todos/medidas/final/retrato.json --grupos
```

A auditoria leva cerca de 50 minutos por rodada; a medida da população, cerca de 10.

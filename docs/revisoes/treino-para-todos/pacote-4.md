# Pacote 4: o corte de tempo revisto e o iniciante

> Sessão "treino para todos", etapa 2 (16/11/2026). **Está no ramo `claude/nifty-albattani-mltt95`, não na `main`.** Parado aqui para a revisão do Gustavo. Todas as pessoas são fictícias. As notas da revisão cega são de revisores simulados no papel de treinadores: opinião, não evidência. "Grade" = cada combinação vale igual; "ponderada" = as combinações mais prováveis valem mais (os pesos são estimativa).

## 1. O que mudou

Entraram três regras, uma por vez (regra escrita em `docs/pesquisa/regras.md`, teste, código, medida):

| # | Regra | O que faz | Selo |
| --- | --- | --- | --- |
| 1 | `tempo.corte`, degrau novo (1b) | No dia que não cabe no tempo, antes de qualquer dupla ou corte, o exercício de um lado só dá lugar ao equivalente de dois lados do mesmo nível (a série leva metade do tempo). Só se o de dois lados não for pior na dor leve, na estabilidade do iniciante e na carga possível, não estiver no dia e não ficar em todos os dias da semana. Nenhuma série sai da semana. | costume; a pesquisa não achou diferença de resultado entre um lado e dois (`kassiano2025`) |
| 2 | `tempo.superserie`: a dupla de lombar como último recurso | A dupla de dois exercícios que carregam a lombar sem apoio (stiff com remada curvada) deixa de ser a 1ª saída do corte: o corte é feito sem ela, e ela só volta se, sem ela, o programa ficar com um dia acima de 110% do tempo, um dia fraco ou empurrar ÷ puxar acima de 1,5. | costume, sem ensaio |
| 3 | `selecao.pratica-do-iniciante` (regra nova) | O iniciante repete o exercício que já está na semana quando a mesma função aparece em outro dia (a mesma puxada nos dois dias em que puxa de cima), nunca em todos os dias havendo outro do mesmo nível. Só vale se não custar: o programa é montado também sem a regra e, se com ela houver um dia a mais acima do tempo, um dia fraco a mais ou empurrar ÷ puxar acima de 1,5, vale o programa sem ela. | costume; variar não rende mais músculo (`kassiano2022`, moderada) |

A regra 1 não estava na proposta: é a "revisão do corte de tempo" que ficou combinada quando as regras de dupla foram recusadas no pacote 3. A forma "só vale se não custar" das regras 2 e 3 é a mesma da troca de divisão pela dor (pacote 3).

## 2. O antes e o depois, em pessoas

O "antes" é o ramo depois do pacote 2. Das doze personas, só duas mudam:

- **Leandro (iniciante, academia, 3 dias).** Fica com 4 exercícios diferentes a menos na semana: a mesma puxada pela frente e o mesmo supino com halteres nos dias em que a função se repete (antes, um dia tinha o supino na máquina), o stiff com halteres no lugar do stiff de um lado só, a rosca inclinada no lugar da rosca na polia. O dia B vai de 57 para 54 min.
- **Jonas (30 min).** A panturrilha de um pé dá lugar à de dois pés no dia A, que vai de 31 para 30 min (o degrau novo do corte).

Nas pessoas da revisão cega: o intermediário da academia com 4 dias de 45 min e foco em pernas perde a pilha de drop sets do dia de pernas (a troca do exercício de um lado só resolve o tempo antes); a iniciante da academia com 5 dias de 60 min vai de 27 para 18 exercícios diferentes na semana.

## 3. O antes e o depois, medido

680.625 programas (`medidas/pacote-4/retrato.md`).

| | `main` | pacote 2 | **pacote 4** |
| --- | ---: | ---: | ---: |
| Régua oficial: programas sem nenhum defeito (grade) | 79,4% | 90,7% | **91,0%** |
| Idem (ponderada) | 78,1% | 96,8% | **97,1%** |
| Pior grupo | dor 7 no cotovelo: 50,0% | 30 min: 73,4% | **30 min: 73,8%** |
| Dia mais longo acima de 110% do tempo (A3), programas | 27.039 | 23.465 | **22.399** |
| Dia fraco: menos de 3 exercícios ou sem exercício grande (A2) | 71.999 | 29.089 | **28.380** |
| Empurrar ÷ puxar acima de 1,5 (D1) | 3.606 | 3.340 | **3.090** |
| Foco abaixo da meta com tempo e exercício (C1) | 11.864 | 10.212 | **10.213** |

Notas dos 20 cuidados (pacote 2 → pacote 4, grade e ponderada):

| Cuidado | grade | ponderada |
| --- | ---: | ---: |
| Iniciante com mais de 12 exercícios diferentes na semana | 19,3% → 12,7% | 38,9% → 36,7% |
| Dupla em que os dois carregam a lombar ou dependem da pegada | 1,9% → 1,0% | 5,2% → 4,0% |
| Dupla entre dois exercícios grandes | 21,5% → 21,1% | 27,6% → 26,8% |
| Iniciante com dupla ou drop set | 9,3% → 9,1% | 15,9% → 15,5% |
| Exercício escolhido por ter animação, com um equivalente sem uso | 30,4% → 32,0% | 80,0% → 81,8% |
| Exercícios diferentes por semana (média) | 15,11 → 14,43 | 19,81 → 18,26 |

Os cartões de texto por dia caem (amostra de 23.470 programas): de 2,04 para 1,94 na ponderada; os programas com um dia de 3 cartões ou mais, de 63,4% para 61,0%.

Cada regra, medida sozinha por cima da anterior (programas com o defeito, em 680.625):

| Regra | A3 (acima do tempo) | A2 (dia fraco) | D1 (empurrar ÷ puxar) | Pares grupo × defeito que pioram / melhoram |
| --- | ---: | ---: | ---: | ---: |
| 1. Dois lados no corte | −1.041 | −13 | −190 | 14 / 153 |
| 2. Dupla de lombar como último recurso | −1 | 0 | −60 | 0 / 37 |
| 3. Prática do iniciante | −24 | −696 | 0 | 18 / 88 |
| **Pacote inteiro** | **−1.066** | **−709** | **−250** | **31 / 187** |

### O que piora, com o tamanho

No total nenhum defeito sobe (o C1 e o D3 sobem 1 programa cada). Por grupo, 31 pares grupo × defeito sobem frente ao pacote 2; os maiores:

| Grupo | Defeito | pacote 2 → pacote 4 | Tamanho do grupo |
| --- | --- | ---: | ---: |
| Dor forte no quadril | D1 (empurrar ÷ puxar) | 165 → 180 (+15) | 45.375 |
| Dor forte no quadril | A2 (dia fraco) | 2.638 → 2.650 (+12) | 45.375 |
| Cenários dos atalhos (casa, condomínio, academia) | A2 | 2.424 → 2.434 (+10) | 74.250 |
| Foco em braços | D1 | 54 → 59 (+5) | 61.875 |

Os outros são de +1 a +3 programas. Os dois de dor forte no quadril vêm do mesmo lugar dos pacotes anteriores: a semana remontada pela dor (pacote 3) é escolhida por fora da trava de custo das regras novas, e uma troca pequena de exercício muda qual divisão é aceita.

## 4. O que foi medido e não entrou

Tudo medido por cima do app, em 23.470 programas (1 a cada 29), salvo onde diz população.

- **Limite de 6 exercícios por treino para o iniciante (3 dias ou mais), com a trava de custo.** Tira 1.873 programas da nota "mais de 12 exercícios diferentes" e 148 da "iniciante com dupla ou drop set", sem defeito novo da régua na amostra. Mas, na população inteira, o foco abaixo da meta sobe 179 programas, os programas sem nenhum defeito dos 20 cuidados caem de 57,5% para 50,0% (ponderada: músculo sem exercício direto, 24,3% → 31,1%; dia abaixo de 70% do tempo, 17,6% → 22,1%), e **a revisão cega (seção 5, rodada B) deu nota menor**. Não entrou. O que os números sugerem: o limite ajuda quem treina 3 dias de 60 min e atrapalha quem tem mais tempo ou mais dias; fica no backlog nessa forma estreita.
- **"O exercício mais simples primeiro" para o iniciante**, agora com a trava de custo: continua criando dia fraco em 4 programas (iniciante com dor forte no quadril) e troca o supino com halteres, animado, por máquinas em cartão de texto. Recusada de novo.
- **Proibir a dupla com exercício livre com barra**, como último recurso: 2 programas ganham empurrar ÷ puxar acima de 1,5 e 1 ganha um músculo sem nenhuma série. Recusada de novo.
- **Tirar o drop set do iniciante**, como último recurso: 3 programas ganham empurrar ÷ puxar acima de 1,5 e 1 ganha dia fraco. Recusada de novo.
- **A regra 1 sem a trava de "não em todos os dias":** 237 programas passavam a ter o mesmo exercício em todos os dias. A trava entrou.
- **A regra 3 sem a trava de custo:** 6 programas ganhavam um dia acima do tempo. A trava entrou.

## 5. A revisão cega

Três revisores (eficiência; adequação e segurança; "treinador ou máquina"). Páginas, chave e notas em [`revisao-cega/pacote-4/`](revisao-cega/pacote-4/).

**Rodada A: o pacote 2 contra o pacote 4, doze pessoas** (seis iniciantes, três de treino curto, três em que a dupla de lombar aparecia). Soma das três notas, média dos três revisores:

| Pessoa | Antes | Depois | Diferença |
| --- | ---: | ---: | ---: |
| Iniciante, academia, 3 dias de 60 min | 20,3 | 20,3 | 0,0 |
| Iniciante, academia, 4 dias de 45 min, quer glúteos | 20,3 | 20,3 | 0,0 |
| Iniciante, condomínio, 3 dias de 45 min | 21,0 | 21,0 | 0,0 (páginas iguais) |
| Iniciante, casa com halteres e elásticos, 3 dias de 45 min | 19,0 | 19,0 | 0,0 |
| Iniciante, academia, 5 dias de 60 min | 15,0 | 14,3 | −0,7 |
| Iniciante, halteres de 1 a 12 kg e banco, 3 dias de 30 min | 16,7 | 16,7 | 0,0 (páginas iguais) |
| Avançado, academia, 3 dias de 30 min, quer peito e costas | 21,0 | 21,0 | 0,0 |
| Intermediária, academia, 2 dias de 30 min, quer glúteos | 14,0 | 14,0 | 0,0 |
| Intermediário, academia, 4 dias de 45 min, quer pernas | 16,0 | 21,0 | **+5,0** |
| Intermediário, só halteres de 2 a 20 kg, 3 dias de 30 min, quer costas | 18,0 | 18,0 | 0,0 |
| Avançado, só halteres de 2 a 20 kg, 2 dias de 45 min | 17,3 | 17,0 | −0,3 |
| Intermediária, só halteres de 2 a 20 kg, 2 dias de 30 min, quer glúteos | 15,3 | 15,0 | −0,3 |

Médias: eficiente 5,89 → 5,97; adequada 6,31 → 6,42; agradável 5,64 → 5,75. **Uma pessoa sobe muito, oito ficam iguais e três caem pouco.**

- A que sobe (+5,0) é efeito da regra 1: o dia de pernas deixa de ter drop set em quase todo exercício.
- **A iniciante de 5 dias (−0,7):** vai de 27 para 18 exercícios diferentes, e um revisor baixou um ponto em cada nota por "repetição" (o mesmo tríceps na polia e o mesmo supino em mais de um dia). Os outros dois deram a mesma nota às duas páginas. É a regra 3 fazendo o que se propõe; **os revisores não a premiaram.**
- **As duas pessoas de halteres (−0,3 cada):** perderam a dupla de stiff com remada curvada (regra 2); numa, o stiff e a remada ficaram com uma série a menos; na outra, o dia foi de 31 para 33 min em 30. Um ponto de um revisor em cada.

**Leitura honesta:** a regra 1 é a que os revisores veem. As regras 2 e 3 melhoram o que a régua e os cuidados contam (696 programas a menos com dia fraco; metade das duplas de lombar), mas a revisão cega não as distingue ou as desconta um pouco. Ficam como decisão do Gustavo (decisões 1 e 2).

**Rodada B: o pacote 4 contra o pacote 4 com o limite de 6 exercícios, oito iniciantes com 60 min ou mais.** Médias: eficiente 6,21 → 5,96; adequada 6,87 → 6,92; agradável 6,12 → 6,12. Três sobem 0,7 (os três de 3 dias de 60 min), uma fica igual e quatro caem 0,7 a 1,0 (5 dias; 75 e 90 min; 4 dias com foco em glúteos). A queixa: o tempo que sobra. **O limite não entrou.**

O que os revisores continuam apontando, e que não é deste pacote: quem quer glúteos em casa sem ponte de glúteo; ombro lateral zerado nos treinos curtos com halteres; iniciante de 5 dias com sessões de 26 a 46 min em 60; tempo sobrando para quem tem 75 ou 90 min.

## 6. Os testes

- Nenhum registro de programa (snapshot) mudou.
- 18 testes novos em `tests/unit/iniciante-e-corte.test.ts`.
- Um teste antigo ajustado (`metas-r0.test.ts`): o hack deixou de aparecer como vaga nos 585 programas da varredura da Carla (só entrava pela variedade do iniciante, como 3º agachamento em máquina) e passou a ser conferido como alternativa.

## 7. Conferências

| | |
| --- | --- |
| `npm run check` | limpo (997 testes) |
| Protótipo de conferência = app | 0 programas diferentes em 23.470, depois de cada regra |
| A simulação de meses | ver o fim desta tabela |
| `npm run test:e2e` | ver o fim desta tabela |
| A auditoria oficial em duas rodadas | ver o fim desta tabela |
| `src/engine/`, telas, `src/styles.css`, `api/`, `CLAUDE.md` | sem mudança neste pacote |

## 8. Para quem já usa

O iniciante de academia vê "Há uma versão nova do seu programa", com menos exercícios diferentes (o Leandro, 4 a menos). Quem tem treino curto pode ver um exercício de um lado só trocado pelo de dois lados (o Jonas, 1). As outras dez personas não mudam.

## 9. Decisões (uma por vez)

1. **A regra 3 (a prática do iniciante) fica?** A régua melhora (696 programas a menos com dia fraco; os iniciantes com mais de 12 exercícios diferentes vão de 19,3% para 12,7% dos programas, na grade), mas a revisão cega não a premiou: três iniciantes com a mesma nota e uma com 0,7 a menos. *Recomendo que fique: é o que os revisores pediram na etapa 1 ("exercícios demais para o iniciante"), tem trava de custo e não piora nenhuma nota média.* A alternativa é tirar e deixar o iniciante com a variedade de antes.
2. **A regra 2 (a dupla de lombar como último recurso) fica?** Metade dessas duplas some sem nenhum defeito novo na população, mas as duas pessoas da revisão cega em que ela agiu caíram 0,3. *Recomendo que fique: o custo medido é um ponto de um revisor, e a dupla de stiff com remada curvada é a que os três citam como "sem lógica".*
3. **O limite de 6 exercícios para o iniciante de 3 dias de até 60 min** (a forma estreita que os números sugerem) vale um teste próprio, com revisão cega só dele? *Recomendo sim, mas depois do pacote 5; não muda nada agora.*
4. **O próximo pacote.** *Recomendo o pacote 5 (o aviso de "sem melhora" no longo prazo), que é o último da proposta.* Depois dele vem o fechamento da etapa 2: a revisão cega final contra a `main`, o resumo e a sua decisão sobre a ida para a `main`.

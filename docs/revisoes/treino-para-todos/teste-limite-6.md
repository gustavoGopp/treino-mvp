# O teste próprio do limite de 6 exercícios do iniciante (17/11/2026)

> Sessão "treino para todos". Em 16/11, no pacote 4, o Gustavo decidiu que o limite de 6 exercícios por treino para o iniciante teria um teste só dele, na forma estreita: quem treina **3 dias de até 60 minutos**. Este é o teste. **Nada mudou no app:** o limite só existe no protótipo (`scripts/auditoria/prototipo/`, chave `ini-6-3x60`). Todas as pessoas são fictícias.

## Em resumo

- **Os revisores preferem a semana com o limite, com folga.** Em oito iniciantes de 3 dias de 60 min, as notas médias sobem de 5,9 · 6,8 · 5,6 para 6,4 · 7,1 · 6,3 (eficiente · adequada · agradável). Sete melhoram, uma fica igual, nenhuma piora na soma.
- **A régua piora em um defeito.** "Foco abaixo da meta" aparece em 30 programas a mais (de 3 para 33, entre os 45.375 de iniciante de 3 dias). Os outros oito defeitos não mudam em nenhum programa.
- **Os 20 cuidados pioram um pouco.** Os programas sem nenhum defeito vão de 57,5% para 54,8% (conta com os pesos): com menos exercícios, mais iniciantes ficam com um músculo abaixo da faixa e com tempo sobrando.
- **Por isso o limite não entra agora.** A regra da sessão é que nenhum defeito da régua pode piorar em nenhum grupo. Mas é a mudança que os revisores mais pedem para o iniciante, e o que falta consertar é pouco e conhecido (seção 4). Fica como a primeira proposta para a próxima sessão.

## 1. O que foi testado

Com o limite, o iniciante de 3 dias de até 60 min recebe no máximo 6 exercícios por treino (o 2º exercício do foco pode ser o 7º), em vez dos 8 que cabem em 60 minutos. O limite só vale se não custar outra coisa: o programa é montado com e sem ele e, se com ele houver mais um dia longo demais, mais um dia fraco, empurrar muito acima de puxar, um músculo esquecido ou mais músculos com menos de 4 séries, vale o programa sem ele.

Na prática, só muda quem tem 60 minutos: com 45 minutos ou menos, já cabem 6 exercícios ou menos.

A diferença para o que foi recusado no pacote 4: lá o limite valia para 3 dias **ou mais** e para qualquer tempo, e atrapalhava quem treina 5 dias ou tem 75 e 90 minutos.

## 2. A medida na população (680.625 programas; o app de hoje → o app com o limite)

Mudam 6.500 programas, aproximadamente (928 na amostra de 1 a cada 7): todos de iniciante com 3 dias de 60 min.

| | hoje | com o limite |
|---|---:|---:|
| Régua oficial: foco abaixo da meta, com tempo e exercício (programas) | 10.213 | 10.243 |
| Idem, só no iniciante de 3 dias (de 45.375) | 3 | 33 |
| Os outros 8 defeitos da régua | iguais | iguais |
| Os 20 cuidados: programas sem nenhum defeito (ponderada) | 57,5% | 54,8% |
| Músculo abaixo da faixa do nível com tempo sobrando (ponderada) | 18,9% | 20,5% |
| Músculo sem exercício direto, havendo exercício possível (ponderada) | 24,3% | 27,7% |
| O texto "cabem cerca de N exercícios" com um dia acima de N (ponderada) | 5,8% | 7,0% |
| Iniciante com dupla ou drop set (ponderada) | 15,5% | 14,5% |
| Iniciante com mais de 12 exercícios diferentes na semana (ponderada) | 36,7% | 36,4% |
| Séries por semana, em média (ponderada) | 63,07 | 62,83 |

Os 30 programas com o foco abaixo da meta são de quem quer peito (15) ou peito e costas (15): com 6 exercícios por dia, o 2º exercício do foco deixa de caber em algum dia.

Na amostra de 97.233 programas (1 a cada 7), entre os 928 que mudam: 256 deixam de ter dupla ou drop set (1 passa a ter), 171 deixam de ter mais de 12 exercícios diferentes na semana (5 passam a ter), 141 deixam de ter dupla entre dois exercícios grandes, e 70 deixam de ter um dia de 5 exercícios ou mais com 2 séries em todos. Do outro lado, 169 ganham um músculo abaixo da faixa com tempo sobrando e 144 ganham um músculo sem exercício direto.

Arquivos: [`medidas/final/retrato.md`](medidas/final/retrato.md) (hoje) e [`medidas/limite-6/retrato.md`](medidas/limite-6/retrato.md) (com o limite).

## 3. A revisão cega (8 iniciantes de 3 dias de 60 min; 3 revisores)

Notas de 1 a 10, média dos três revisores: eficiente · adequada à pessoa · agradável de fazer. Os revisores são simulados, no papel de treinadores: é opinião, não evidência. Ninguém sabia qual semana era qual.

| Pessoa | hoje | com o limite | Soma |
|---|---|---|---:|
| Academia completa, sem foco | 6,3 · 7,7 · 6,0 | 7,0 · 7,7 · 7,0 | +1,7 |
| Academia completa, quer glúteos | 5,7 · 7,7 · 5,7 | 7,0 · 7,7 · 7,0 | +2,7 |
| Academia completa, quer peito e costas | 6,3 · 7,7 · 6,0 | 6,3 · 8,0 · 6,7 | +1,0 |
| Academia completa, quer pernas | 6,3 · 6,7 · 5,7 | 6,7 · 7,7 · 7,0 | +2,7 |
| Academia do condomínio, sem foco | 5,3 · 6,7 · 5,3 | 6,3 · 7,0 · 6,3 | +2,3 |
| Halteres até 12 kg e banco, sem foco | 6,0 · 6,3 · 6,0 | 6,7 · 6,3 · 6,3 | +1,0 |
| Academia completa, dor 7 no joelho | **5,3** · 5,7 · 5,3 | **5,0** · 6,3 · 5,3 | +0,3 |
| Em casa, halteres e elásticos, quer braços | 6,0 · 6,3 · 5,0 | 6,0 · 6,3 · 5,0 | 0 |
| **Média** | **5,9 · 6,8 · 5,6** | **6,4 · 7,1 · 6,3** | |

- **O que os revisores dizem da semana de hoje:** "dias de 8 exercícios com 2 séries cada, com cara de lista de compras"; "seis exercícios por dia com 3 séries rendem mais"; "excesso de exercícios por dia para iniciantes, dilui o aprendizado". É a crítica que mais se repete nas revisões da sessão inteira.
- **A única nota que cai:** a de eficiência da pessoa com dor forte no joelho (5,3 → 5,0). Com o limite, os dias dela terminam em 44 a 48 minutos dos 60 e a semana fica sem hip thrust; um revisor sentiu falta de trabalho de perna, outro preferiu assim.
- **Um exemplo** (academia completa, sem foco): a semana vai de 19 exercícios diferentes para 15, de 59 séries para 53 e de 169 minutos para 155 (de 180). O ombro de trás cai de 7 para 4 séries e o abdômen, de 6 para 4.

Páginas, chave e notas: [`revisao-cega/limite-6/`](revisao-cega/limite-6/).

## 4. O que falta para o limite poder entrar

Três consertos, todos conhecidos. Com eles, vale medir de novo e repetir a revisão cega.

1. **O foco em peito** (30 programas): garantir o 2º exercício do foco como o 7º do dia também nos dias em que hoje ele não entra, ou dar ao exercício do foco a série que falta. É o único defeito da régua que aparece.
2. **O tempo que sobra** (músculo abaixo da faixa com o dia abaixo de 85% do tempo): com menos exercícios, sobra tempo, e hoje o iniciante só recebe séries a mais nos exercícios grandes, até 3 séries. Vale testar o iniciante de 6 exercícios com até 3 séries também nos exercícios pequenos. Na revisão cega do pacote 1, subir as séries dos pequenos baixou a nota de iniciantes com 8 exercícios; com 6, o dia tem folga.
3. **O texto "cabem cerca de N exercícios"**: precisa dizer 6 para esse iniciante.

Se entrar, o limite muda o programa da Ana (iniciante de 3 dias; hoje com 45 minutos, ela não muda) só se ela escolher 60 minutos, e pede: a regra em `docs/pesquisa/regras.md` com selo e fonte, a frase em linguagem simples, teste, a medida, a auditoria em duas rodadas e a parada para o Gustavo, como os outros pacotes.

## 5. Ciência, costume de treinador e aposta

- **Ciência:** não há estudo que compare 6 com 8 exercícios por treino para iniciantes. O que há é indireto: variar o exercício não rende mais músculo (`kassiano2022`, moderada), e o iniciante cresce com poucas séries.
- **Costume de treinador:** poucos exercícios, bem aprendidos, para quem começa. É o que os três revisores pedem em todas as rodadas.
- **Aposta do projeto:** o número 6 e o recorte "3 dias de até 60 minutos".

## 6. Como refazer

```bash
PROT=app,ini-6-3x60 npx vite-node scripts/auditoria/retrato.ts -- --processos 4 --motor scripts/auditoria/prototipo/gerador.ts --saida /tmp/limite-6
```

```bash
PROT=app,ini-6-3x60 npx vite-node scripts/auditoria/novos-defeitos.ts -- --antes src/domain/gerador/index.ts --depois scripts/auditoria/prototipo/gerador.ts --passo 7 --cuidados --notas
```

```bash
npx vite-node scripts/auditoria/comparar-retratos.ts -- docs/revisoes/treino-para-todos/medidas/final/retrato.json docs/revisoes/treino-para-todos/medidas/limite-6/retrato.json --grupos
```

## 7. Os consertos (18/11/2026, início da sessão seguinte)

Feitos no protótipo, um por vez, medidos primeiro nos 9.075 programas de iniciante de 3 dias de 60 min (o único grupo que o limite muda; `novos-defeitos.ts --perfil iniciante/3/60 --passo 1`) e depois na população inteira. **Nada mudou no app.**

### Conserto 1: o foco abaixo da meta (chave `ini-6-foco`): entrou no protótipo

- **O mecanismo.** Os 33 programas eram todos de quem quer peito **e** marcou dor forte no cotovelo. Com a dor, saem os supinos, as flexões e quase tudo de puxar; o peito fica só com o crucifixo, um por dia. Sem o limite, o crucifixo do 3º dia entrava no lugar que a dor esvaziou. Com o limite, esse lugar ia para a panturrilha, e o 2º exercício do foco não podia entrar porque a trava "empurrar no máximo 1,5 vez o puxar" o barrava (sobrava pouco para puxar).
- **O conserto.** Com o limite, o lugar que a dor esvaziou vai primeiro para um músculo do foco que está abaixo da meta. Não acrescenta exercício: só muda qual entra.
- **A medida no recorte.** O foco abaixo da meta deixa de aparecer em qualquer programa (antes, +33) e some em 3. Os outros efeitos ficam iguais aos do limite sozinho.
- **Medido e recusado antes dele:** deixar o exercício do foco ser o 7º também no lugar que a dor esvaziou. Consertava os 33, mas criava 14 casos novos (dor forte no ombro, foco em braços) e 513 programas com dois exercícios da mesma função no dia.

### Conserto 2: o tempo que sobra: não tem conserto por séries

- **O que acontece.** Com 6 exercícios por dia, a panturrilha, o ombro de trás e o ombro lateral ficam com **um exercício só na semana**. Um exercício tem no máximo 4 séries, e a faixa do iniciante começa em 6. Por isso esses músculos ficam abaixo da faixa com tempo sobrando no dia (cerca de 47 dos 60 minutos).
- **Medido e recusado:**
  - Os isoladores do iniciante também subirem até 3 séries: muda 12 programas de 9.075. Não compensa uma regra.
  - Até 4 séries por exercício: melhora 69 programas, mas cria um defeito da régua (um músculo com 1 a 3 séries).
  - O abdômen num dia só, para dar o lugar à panturrilha e ao ombro: melhora 4 programas e aumenta as duplas do iniciante (+73).
- **Conclusão.** O custo vem de ter menos exercícios, que é o próprio limite. Ele fica, e é a decisão que o limite pede (abaixo).

### Conserto 3: o texto "cabem cerca de N exercícios" (chave `ini-6-texto`): entrou no protótipo

- Com o limite, o texto passa a dizer: "Com 60 min por treino caberiam cerca de 8 exercícios, mas quem está começando fica com cerca de 6 (no máximo 7), para aprender bem cada um." Conferido: nenhum programa com o limite tem dia com mais de 7.
- **A medida no recorte.** O texto que contradiz o programa vai de +1.746 programas para nenhum.

### A medida na população inteira (680.625 programas; o app de hoje → o protótipo com o limite e os consertos 1 e 3)

| | hoje | com o limite e os consertos |
|---|---:|---:|
| Régua oficial: pares "grupo × defeito" piores que hoje | | **nenhum** (12 melhores) |
| Foco abaixo da meta, com tempo e exercício (programas) | 10.213 | 10.210 |
| Os outros 8 defeitos da régua | iguais | iguais |
| Os 20 cuidados: programas sem nenhum defeito (ponderada) | 57,5% | 55,9% |
| Músculo abaixo da faixa do nível com tempo sobrando (ponderada) | 18,9% | 20,5% |
| Músculo sem exercício direto, havendo exercício possível (ponderada) | 24,3% | 27,7% |
| Dia típico abaixo de 85% do tempo (ponderada) | 36,9% | 38,5% |
| Iniciante com dupla ou drop set (ponderada) | 15,5% | 14,5% |
| Bi-set entre dois exercícios grandes (ponderada) | 26,8% | 26,2% |
| Iniciante com mais de 12 exercícios diferentes na semana (ponderada) | 36,7% | 36,4% |
| O texto "cabem cerca de N" contradiz o programa | igual | igual |

**A revisão cega continua valendo.** As 16 páginas saem idênticas com os consertos (nenhuma das 8 pessoas tem dor no cotovelo, e o texto não aparece nas páginas): 7 de 8 melhoram, nenhuma piora na soma.

Arquivos: [`medidas/limite-6-consertos/retrato.md`](medidas/limite-6-consertos/retrato.md).

### O que falta decidir

Pelo critério da sessão (nenhum defeito da régua pior em nenhum grupo), o limite agora passa. O que sobra é um custo nos 20 cuidados, que são a régua mais fina da sessão: em cerca de 1 de cada 7 iniciantes de 3 × 60, a panturrilha, o ombro de trás ou o ombro lateral ficam com 4 séries por semana, em vez de 6, e um deles fica sem exercício próprio. É o preço de 6 exercícios por treino, e os revisores preferem pagar: a crítica que mais se repete nas revisões da sessão é "8 exercícios de 2 séries, com cara de lista de compras".

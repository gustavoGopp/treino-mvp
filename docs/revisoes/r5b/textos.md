# R5b: os textos novos, para a revisão do Gustavo (09/11/2026)

> Gerado a partir do código desta sessão (branch `claude/lucid-maxwell-sr3ewo`) e da `main` de antes do R5b, com as 6 personas fictícias de `tests/personas/`. Os exercícios das personas **não mudaram**; mudaram os textos. Para regerar, veja "Como reproduzir" no fim.

**O que revisar.** (1) Os avisos de "Sobre o programa", agora com o próximo passo. (2) A 1ª linha do "Por que este exercício", agora específica. (3) A saída do avaliador, "Como está o seu programa". Marque o que soar estranho, longo ou técnico demais; os números e as regras não mudam com a revisão do texto.

## 1. Os avisos do programa: antes e depois

Antes: 2 dos 20 avisos das personas (06/11) diziam o que fazer. Hoje as personas têm 24 avisos (o R5-CL e o R5d acrescentaram alguns); depois do R5b, **24 de 24** terminam com o próximo passo, inclusive "não precisa fazer nada" quando a causa é o equipamento (o app não sugere compra).

### Bruno

- `tempo.corte`
  - antes: Para caber no tempo: superséries entre músculos que não competem.
  - **depois:** Para caber no tempo: superséries entre músculos que não competem. As séries da semana não mudam: não precisa fazer nada.

### Ana

- `equipamento.sem-puxada-vertical`
  - antes: Sem barra fixa nem polia alta: as costas treinam só com remadas.
  - **depois:** Sem barra fixa nem polia alta: as costas treinam só com remadas. Não precisa fazer nada: as remadas seguem treinando as costas.
- `equipamento.escada-carga-leve`
  - antes: Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia.
  - **depois:** Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando ficar fácil, o app passa para o degrau seguinte.
- `selecao.isolador-obrigatorio`
  - antes: Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo.
  - **depois:** Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: os outros exercícios do músculo seguem no programa.
- `tempo.corte`
  - antes: Para caber no tempo: superséries entre músculos que não competem, drop set na última série de alguns isoladores (conta como 2 séries), menos séries.
  - **depois:** Para caber no tempo: superséries entre músculos que não competem, drop set na última série de alguns isoladores (conta como 2 séries), menos séries. Para ter o programa inteiro, escolha mais minutos na rotina.
- `volume.semanal.alvo`
  - antes: Abaixo da meta: ombro (lateral) 0 de 6 séries por semana. Com 45 min cabem ~6 exercícios por treino.
  - **depois:** Abaixo da meta: ombro (lateral) 0 de 6 séries por semana. Com 45 min cabem ~6 exercícios por treino. Para chegar lá, escolha mais minutos na rotina.
- `volume.semanal.alvo`
  - antes: Abaixo da meta: quadríceps 6 de 10 séries por semana. A divisão Corpo todo A/B/C treina este músculo 2x por semana e, com até 4 séries por exercício e 10 por sessão, não cabe mais (falta cadeira extensora).
  - **depois:** Abaixo da meta: quadríceps 6 de 10 séries por semana. A divisão Corpo todo A/B/C treina este músculo 2x por semana e, com até 4 séries por exercício e 10 por sessão, não cabe mais (falta cadeira extensora). Para chegar lá, escolha mais dias na rotina, ou menos grupos de foco.
- `volume.semanal.alvo`
  - antes: Abaixo da meta: posteriores da coxa 7 de 10 séries por semana. Com 45 min cabem ~6 exercícios por treino.
  - **depois:** Abaixo da meta: posteriores da coxa 7 de 10 séries por semana. Com 45 min cabem ~6 exercícios por treino. Para chegar lá, escolha mais minutos na rotina, ou menos grupos de foco.
- `volume.semanal.alvo`
  - antes: Abaixo da meta: panturrilha 6 de 10 séries por semana. Com 45 min cabem ~6 exercícios por treino.
  - **depois:** Abaixo da meta: panturrilha 6 de 10 séries por semana. Com 45 min cabem ~6 exercícios por treino. Para chegar lá, escolha mais minutos na rotina, ou menos grupos de foco.
- `volume.prioridade.competicao`
  - antes: Seus focos disputam o mesmo tempo: quadríceps 6 de 10, posteriores da coxa 7 de 10 e panturrilha 6 de 10 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias. "Pernas" são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pedem o triplo de séries de "peito".
  - **depois:** Seus focos disputam o mesmo tempo: quadríceps 6 de 10, posteriores da coxa 7 de 10 e panturrilha 6 de 10 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias. "Pernas" são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pedem o triplo de séries de "peito".

### Diego

- `equipamento.escada-carga-leve`
  - antes: Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia.
  - **depois:** Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando ficar fácil, o app passa para o degrau seguinte.
- `tempo.corte`
  - antes: Corpo todo C: deve levar ~47 min, mais que os 45 min que você tem.
  - **depois:** Corpo todo C: deve levar ~47 min, mais que os 45 min que você tem. Reserve uns minutos a mais nesse dia, ou escolha 50 min na rotina.
- `tempo.corte`
  - antes: Para caber no tempo: superséries entre músculos que não competem, menos séries.
  - **depois:** Para caber no tempo: superséries entre músculos que não competem, menos séries. Para ter o programa inteiro, escolha mais minutos na rotina.
- `tempo.corte`
  - antes: Abaixo da meta por falta de tempo: costas 9 de 10 séries.
  - **depois:** Abaixo da meta por falta de tempo: costas 9 de 10 séries. Para chegar lá, escolha mais minutos ou mais dias na rotina.
- `volume.prioridade.competicao`
  - antes: Seus focos disputam o mesmo tempo: costas 9 de 10 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias.
  - **depois:** Seus focos disputam o mesmo tempo: costas 9 de 10 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias.

### Elisa

- `equipamento.escada-carga-leve`
  - antes: Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia.
  - **depois:** Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando ficar fácil, o app passa para o degrau seguinte.
- `selecao.isolador-obrigatorio`
  - antes: Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo.
  - **depois:** Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: os outros exercícios do músculo seguem no programa.
- `tempo.corte`
  - antes: Corpo todo B: deve levar ~31 min, mais que os 30 min que você tem.
  - **depois:** Corpo todo B: deve levar ~31 min, mais que os 30 min que você tem. Reserve uns minutos a mais nesse dia, ou escolha 35 min na rotina.
- `tempo.corte`
  - antes: Corpo todo C: deve levar ~31 min, mais que os 30 min que você tem.
  - **depois:** Corpo todo C: deve levar ~31 min, mais que os 30 min que você tem. Reserve uns minutos a mais nesse dia, ou escolha 35 min na rotina.
- `tempo.corte`
  - antes: Para caber no tempo: superséries entre músculos que não competem, menos séries.
  - **depois:** Para caber no tempo: superséries entre músculos que não competem, menos séries. Para ter o programa inteiro, escolha mais minutos na rotina.
- `equipamento.sem-ancoragem`
  - antes: Sem algo para puxar ou levantar: costas, ombro lateral e bíceps ficam sem exercício. O resto do corpo segue no programa.
  - **depois:** Sem algo para puxar ou levantar: costas, ombro lateral e bíceps ficam sem exercício. Não precisa fazer nada: o resto do corpo segue no programa.

### Fábio

- `equipamento.escada-carga-leve`
  - antes: Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia.
  - **depois:** Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando ficar fácil, o app passa para o degrau seguinte.
- `selecao.isolador-obrigatorio`
  - antes: Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo.
  - **depois:** Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: os outros exercícios do músculo seguem no programa.
- `volume.semanal.alvo`
  - antes: Sem exercício possível com o seu equipamento: ombro lateral.
  - **depois:** Sem exercício possível com o seu equipamento: ombro lateral. Não precisa fazer nada: o resto do programa segue.

## 2. O porquê de cada exercício: a 1ª linha

Antes, 61% dos exercícios só tinham textos genéricos ("Vaga de agachar: entre as opções equivalentes, a que melhor cabe no seu equipamento."). Agora a 1ª linha diz a vaga, o músculo dela (e se é o seu foco), quantas séries da semana o exercício leva e por que ficou com a vaga. Os outros porquês (técnica, montagem segura, dor, faixa de repetições, descanso) continuam abaixo. **140 de 140** exercícios das 6 personas têm o porquê específico. Exemplos, um por tipo de motivo:

- **Bruno, Superior A · supino-reto**
  - antes: Vaga de empurrar horizontal: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de empurrar horizontal, para o peito, o seu foco: 3 das 12 séries da semana. É a melhor opção desta vaga no seu equipamento; supino na polia com o banco plano entre as torres fica como alternativa.
- **Bruno, Superior A · puxada-unilateral**
  - antes: Vaga de puxar vertical: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de puxar vertical, para as costas, o seu foco: 3 das 12 séries da semana. Ganhou de puxada ajoelhado na polia alta com barra reta e das outras do mesmo tipo porque tem o guia animado.
- **Bruno, Superior A · remada-apoiada**
  - antes: Vaga de puxar horizontal: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de puxar horizontal, para as costas, o seu foco: 3 das 12 séries da semana. Equivale a remada baixa com triângulo e às outras do mesmo tipo, que ficam como alternativa.
- **Bruno, Inferior A · bulgaro**
  - antes: Vaga de agachar: entre as opções do seu equipamento, a melhor para esta função.
  - **depois:** Vaga de agachar, para o quadríceps: 2 das 8 séries da semana. As opções de cima (como agachamento livre com barra (profundo)) pedem equipamento que você não tem. Entre as que sobram, equivale a agachamento goblet com calcanhar elevado e às outras do mesmo tipo, que ficam como alternativa.
- **Bruno, Inferior A · extensao-joelho-elastico**
  - antes: Vaga de extensora: entre as opções do seu equipamento, a melhor para esta função.
  - **depois:** Vaga de extensora, para o quadríceps: 2 das 8 séries da semana. As opções de cima (como cadeira extensora) pedem equipamento que você não tem; esta é a melhor que sobra.
- **Bruno, Inferior A · abdominal-polia**
  - antes: Vaga de abdômen: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de abdômen, para o abdômen: 2 das 4 séries da semana. Ganhou de abdominal no banco declinado porque deixa pôr mais carga com o seu equipamento.
- **Bruno, Superior B · puxada-barra-reta**
  - antes: Vaga de puxar vertical: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de puxar vertical, para as costas, o seu foco: 2 das 12 séries da semana. Ficou este, e não puxada unilateral ajoelhado na polia alta, para variar os exercícios da semana.
- **Bruno, Inferior B · ponte-gluteo-halter**
  - antes: Vaga de extensão de quadril (glúteo): entre as opções do seu equipamento, a melhor para esta função.
  - **depois:** Vaga de extensão de quadril (glúteo), para os glúteos: 2 das 7 séries da semana. As opções de cima (como hip thrust) pedem um equipamento que você pediu para evitar. Entre as que sobram, ganhou de ponte de glúteo e das outras do mesmo tipo porque deixa pôr mais carga com o seu equipamento.
- **Ana, Corpo todo A · remada-unilateral-halter**
  - antes: Vaga de puxar vertical: entre as opções do seu equipamento, a melhor para esta função.
  - **depois:** Vaga de puxar vertical, para as costas: 2 das 6 séries da semana. As opções de cima (como barra fixa) pedem equipamento que você não tem. Entre as que sobram, ganhou de remada unilateral com halter, sem banco (mão livre na coxa) e das outras do mesmo tipo porque é mais estável e apoiado, mais fácil de aprender.
- **Ana, Corpo todo B · remada-unilateral-halter**
  - antes: Vaga de puxar horizontal: entre as opções equivalentes, a que melhor cabe no seu equipamento.
  - **depois:** Vaga de puxar horizontal, para as costas: 2 das 6 séries da semana. Ganhou de remada unilateral com halter, sem banco (mão livre na coxa) e das outras do mesmo tipo porque é mais estável e apoiado, mais fácil de aprender.
- **Ana, Corpo todo C · abdominal-chao**
  - antes: Vaga de abdômen: entre as opções do seu equipamento, a melhor para esta função.
  - **depois:** Vaga de abdômen, para o abdômen: 4 das 4 séries da semana. As opções de cima (como abdominal na polia com corda, ajoelhado) pedem equipamento que você não tem. Entre as que sobram, ganhou de abdominal invertido no chão porque tem o guia animado.

## 3. "Como está o seu programa": a saída do avaliador

Na tela, a 1ª linha é o resumo ("Está bom: nada a ajustar."); depois vêm, numa caixa de aviso, os pontos de segurança, de alerta e a ajustar, e numa lista os limites e as informações, cada um com o selo. Abaixo, o mesmo em texto corrido, com a tabela por músculo (séries por semana / meta) que a tela ainda não mostra (pedido ao design).

### As personas (programa gerado)

**Bruno**: Está bom: nada a ajustar.
```
peito 12/12 (foco) · costas 12/12 (foco) · ombro lateral 12/12 (foco) · ombro de trás 9,5/6 · bíceps 12,5/12 (foco) · tríceps 12/12 (foco) · quadríceps 8/6 · posteriores da coxa 8/6 · glúteos 7/6 · panturrilha 6/6 · abdômen 4/4
Empurrar 16 × puxar 15. Tempo: Superior A ~70; Inferior A ~40; Superior B ~69; Inferior B ~55 (orçamento 70).
```

**Ana**: Dá para melhorar: 1 ponto a ajustar.
```
peito 6/6 · costas 6/6 · ombro lateral 0/6 · ombro de trás 6/6 · bíceps 6/6 · tríceps 6/6 · quadríceps 6/10 (foco) · posteriores da coxa 7/10 (foco) · glúteos 10,5/10 (foco) · panturrilha 6/10 (foco) · abdômen 4/4
Empurrar 6 × puxar 9. Tempo: Corpo todo A ~44; Corpo todo B ~43; Corpo todo C ~43 (orçamento 45).
AJUSTAR   [volume.semanal.alvo · consenso] Foco abaixo da meta: panturrilha 6 de 10 séries por semana.
          → Suba 1 série em panturrilha no degrau da escada, no treino Corpo todo C.
LIMITE    [volume.semanal.minimo-eficaz · moderada] Abaixo do mínimo que faz crescer: ombro lateral 0 de 4 séries por semana; não cabe mais em 3 treinos de 45 min.
          → Não precisa fazer nada: o resto do programa segue. Para chegar lá, mais minutos ou mais dias.
LIMITE    [volume.semanal.alvo · consenso] Foco abaixo da meta: quadríceps 6 de 10 e posteriores da coxa 7 de 10 séries por semana; não cabe mais em 3 treinos de 45 min.
          → Não precisa fazer nada: o resto do programa segue. Para chegar lá, mais minutos, mais dias ou menos grupos de foco.
INFO      [volume.semanal.maximo · consenso] Acima do máximo do nível iniciante (10 por semana): glúteos 10,5.
          → Não precisa fazer nada se a recuperação estiver boa; se pesar, volte para perto de 10.
```

**Diego**: Está bom dentro do que o seu equipamento e o seu tempo permitem: 2 limites do equipamento ou do tempo, sem nada a fazer.
```
peito 10/10 (foco) · costas 9/10 (foco) · ombro lateral 4/6 · ombro de trás 4,5/6 · bíceps 6,5/6 · tríceps 6,5/6 · quadríceps 6/6 · posteriores da coxa 6/6 · glúteos 5,5/6 · panturrilha 4/6 · abdômen 4/4
Empurrar 10 × puxar 9. Tempo: Corpo todo A ~44; Corpo todo B ~45; Corpo todo C ~47 (orçamento 45).
LIMITE    [volume.semanal.alvo · consenso] Foco abaixo da meta: costas 9 de 10 séries por semana; não cabe mais em 3 treinos de 45 min.
          → Não precisa fazer nada: o resto do programa segue. Para chegar lá, mais minutos, mais dias ou menos grupos de foco.
LIMITE    [tempo.corte · consenso] Um pouco acima dos 45 min: Corpo todo C ~47 min.
          → Não precisa fazer nada: fica dentro de 10% a mais. Se o tempo apertar no dia, faça dois exercícios em sequência (bi-set).
```

**Carla**: Está bom: nada a ajustar.
```
peito 14/14 (foco) · costas 14/14 (foco) · ombro lateral 14/14 (foco) · ombro de trás 10,5/6 · bíceps 10,5/6 · tríceps 12/6 · quadríceps 14/14 (foco) · posteriores da coxa 14/14 (foco) · glúteos 9/6 · panturrilha 14/14 (foco) · abdômen 4/4
Empurrar 18 × puxar 17. Tempo: Superior ~70; Inferior ~68; Empurrar ~50; Puxar ~41; Pernas ~65 (orçamento 75).
```

**Elisa**: Está bom dentro do que o seu equipamento e o seu tempo permitem: 3 limites do equipamento ou do tempo, sem nada a fazer.
```
peito 6/6 · costas 0/6 · ombro lateral 0/6 · ombro de trás 4/6 · bíceps 0/6 · tríceps 6/6 · quadríceps 5/6 · posteriores da coxa 5/6 · glúteos 7/6 · panturrilha 4/6 · abdômen 4/4
Empurrar 6 × puxar 4. Tempo: Corpo todo A ~29; Corpo todo B ~31; Corpo todo C ~31 (orçamento 30).
LIMITE    [volume.semanal.minimo-eficaz · moderada] O seu equipamento não tem exercício para costas, ombro lateral e bíceps.
          → Não precisa fazer nada: o resto do programa compensa o que dá.
LIMITE    [selecao.exercicios-por-musculo · consenso] Um movimento só para o músculo: posteriores da coxa só com flexão de joelho; o seu equipamento não abre outro.
          → Não precisa fazer nada: o volume da semana é o que mais conta.
LIMITE    [tempo.corte · consenso] Um pouco acima dos 30 min: Corpo todo B ~31 min e Corpo todo C ~31 min.
          → Não precisa fazer nada: fica dentro de 10% a mais. Se o tempo apertar no dia, faça dois exercícios em sequência (bi-set).
```

**Fábio**: Está bom dentro do que o seu equipamento e o seu tempo permitem: 2 limites do equipamento ou do tempo, sem nada a fazer.
```
peito 10/6 · costas 16/12 (foco) · ombro lateral 0/6 · ombro de trás 12/6 · bíceps 8/6 · tríceps 9,5/6 · quadríceps 9/6 · posteriores da coxa 10/6 · glúteos 9/6 · panturrilha 8/6 · abdômen 4/4
Empurrar 7 × puxar 20. Tempo: Superior A ~44; Inferior A ~45; Superior B ~43; Inferior B ~45 (orçamento 45).
LIMITE    [volume.semanal.minimo-eficaz · moderada] O seu equipamento não tem exercício para ombro lateral.
          → Não precisa fazer nada: o resto do programa compensa o que dá.
LIMITE    [selecao.exercicios-por-musculo · consenso] Um movimento só para o músculo: costas só com puxar de cima (puxada ou barra) e posteriores da coxa só com flexão de joelho; o seu equipamento não abre outro.
          → Não precisa fazer nada: o volume da semana é o que mais conta.
```

### Os 4 programas publicados (inventário da Carla, intermediário, 60 min, sem foco)

Fonte: `schoenfeld2019b` (PMC6303131, "RT Procedures" (grupo de 3 séries)).

**Corpo todo 3x, 3 séries (Schoenfeld 2019)**: Dá para melhorar: 6 pontos a ajustar.
```
peito 9/6 · costas 18/6 · ombro lateral 4,5/6 · ombro de trás 9/6 · bíceps 9/6 · tríceps 9/6 · quadríceps 27/6 · posteriores da coxa 0/6 · glúteos 9/6 · panturrilha 0/6 · abdômen 0/4
Empurrar 18 × puxar 18. Tempo: Corpo todo A ~60; Corpo todo B ~60; Corpo todo C ~60 (orçamento 60).
AJUSTAR   [volume.semanal.teto-padrao · moderada] Acima de 20 séries por semana: quadríceps 27.
          → Acima de 20, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.
AJUSTAR   [volume.semanal.minimo-eficaz · moderada] Abaixo do mínimo que faz crescer: posteriores da coxa 0 de 4 e panturrilha 0 de 4 séries por semana.
          → Troque cadeira extensora por flexão de joelho na cadeira flexora (sentado) no treino Corpo todo C e troque cadeira extensora por panturrilha unilateral no step no treino Corpo todo C.
AJUSTAR   [volume.semanal.abdomen · consenso] Abaixo do mínimo que faz crescer: abdômen 0 de 4 séries por semana.
          → Troque cadeira extensora por abdominal na polia com corda, ajoelhado no treino Corpo todo C.
AJUSTAR   [selecao.exercicios-por-musculo · consenso] Um movimento só para o músculo: peito só com empurrar reto e glúteos só com agachar ou afundo.
          → Troque supino reto com barra por supino inclinado com halteres no treino Corpo todo C e troque leg press por abdução na cadeira abdutora no treino Corpo todo C. Movimentos diferentes crescem partes diferentes do músculo.
AJUSTAR   [selecao.isolador-obrigatorio · moderada] Falta tríceps acima da cabeça e panturrilha em pé: cobre a cabeça longa do tríceps, que o supino e a flexão não crescem e a panturrilha com o joelho esticado, a que mais cresce.
          → Troque cadeira extensora por tríceps francês na polia com corda no treino Corpo todo C e troque cadeira extensora por panturrilha unilateral no step no treino Corpo todo C.
AJUSTAR   [volume.equilibrio-coxa · consenso] A coxa está desequilibrada: nenhum exercício direto para a parte de trás da coxa (flexão de joelho ou stiff).
          → Troque cadeira extensora por flexão de joelho na cadeira flexora (sentado) no treino Corpo todo C.
INFO      [volume.semanal.maximo · consenso] Acima do máximo do nível intermediário (16 por semana): costas 18.
          → Não precisa fazer nada se a recuperação estiver boa; se pesar, volte para perto de 16.
```

Fonte: `schoenfeld2019b` (PMC6303131, "RT Procedures" (grupo de 5 séries)).

**Corpo todo 3x, 5 séries (Schoenfeld 2019)**: Dá para melhorar: 10 pontos a ajustar.
```
peito 15/6 · costas 30/6 · ombro lateral 7,5/6 · ombro de trás 15/6 · bíceps 15/6 · tríceps 15/6 · quadríceps 45/6 · posteriores da coxa 0/6 · glúteos 15/6 · panturrilha 0/6 · abdômen 0/4
Empurrar 30 × puxar 30. Tempo: Corpo todo A ~95; Corpo todo B ~95; Corpo todo C ~95 (orçamento 60).
AJUSTAR   [volume.series-por-exercicio · moderada] 7 exercícios com mais de 4 séries: supino reto com barra (5), desenvolvimento em pé com barra (5), puxada pela frente no puxador (5), remada baixa com triângulo (5), agachamento livre com barra (profundo) (5), leg press (5) e mais 1.
          → Acima de 4 séries, divida entre 2 exercícios diferentes ou entre 2 dias.
AJUSTAR   [volume.sessao.teto · um estudo] Mais de 10 séries de um músculo no mesmo treino: Corpo todo A: quadríceps 15, Corpo todo B: quadríceps 15 e Corpo todo C: quadríceps 15.
          → Leve parte dessas séries para outro dia: acima de 10 no mesmo treino, as séries a mais rendem pouco.
AJUSTAR   [volume.semanal.teto-padrao · moderada] Acima de 20 séries por semana: costas 30 e quadríceps 45.
          → Acima de 20, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.
AJUSTAR   [frequencia.musculo · consenso] Muitas séries em poucos dias: quadríceps (45 em 3 dias).
          → Divida as séries em mais dias: até 10 séries de um músculo por treino.
AJUSTAR   [volume.semanal.minimo-eficaz · moderada] Abaixo do mínimo que faz crescer: posteriores da coxa 0 de 4 e panturrilha 0 de 4 séries por semana.
          → Troque cadeira extensora por flexão de joelho na cadeira flexora (sentado) no treino Corpo todo C e troque cadeira extensora por panturrilha unilateral no step no treino Corpo todo C.
AJUSTAR   [volume.semanal.abdomen · consenso] Abaixo do mínimo que faz crescer: abdômen 0 de 4 séries por semana.
          → Troque cadeira extensora por abdominal na polia com corda, ajoelhado no treino Corpo todo C.
AJUSTAR   [selecao.exercicios-por-musculo · consenso] Um movimento só para o músculo: peito só com empurrar reto e glúteos só com agachar ou afundo.
          → Troque supino reto com barra por supino inclinado com halteres no treino Corpo todo C e troque leg press por abdução na cadeira abdutora no treino Corpo todo C. Movimentos diferentes crescem partes diferentes do músculo.
AJUSTAR   [selecao.isolador-obrigatorio · moderada] Falta tríceps acima da cabeça e panturrilha em pé: cobre a cabeça longa do tríceps, que o supino e a flexão não crescem e a panturrilha com o joelho esticado, a que mais cresce.
          → Troque cadeira extensora por tríceps francês na polia com corda no treino Corpo todo C e troque cadeira extensora por panturrilha unilateral no step no treino Corpo todo C.
AJUSTAR   [volume.equilibrio-coxa · consenso] A coxa está desequilibrada: nenhum exercício direto para a parte de trás da coxa (flexão de joelho ou stiff).
          → Troque cadeira extensora por flexão de joelho na cadeira flexora (sentado) no treino Corpo todo C.
AJUSTAR   [tempo.corte · consenso] Bem mais longo que os 60 min: Corpo todo A ~95 min, Corpo todo B ~95 min e Corpo todo C ~95 min.
          → Use até 4 séries por exercício e tire os exercícios repetidos de quem não é foco; ou escolha mais minutos.
```

Fonte: `thomas2016` (PMC4836564, tabela 3 (o grupo de baixa frequência)).

**ABC clássica (Thomas e Burns 2016)**: Dá para melhorar: 6 pontos a ajustar.
```
peito 9/6 · costas 9/6 · ombro lateral 7,5/6 · ombro de trás 4,5/6 · bíceps 13,5/6 · tríceps 15/6 · quadríceps 9/6 · posteriores da coxa 9/6 · glúteos 7,5/6 · panturrilha 9/6 · abdômen 3/4
Empurrar 12 × puxar 9. Tempo: A (peito, ombro e tríceps) ~70; B (costas e bíceps) ~53; C (pernas) ~70 (orçamento 60).
AJUSTAR   [volume.series-por-exercicio · moderada] 7 exercícios com mais de 4 séries: supino reto com halteres (6), elevação lateral com halteres (6), tríceps na polia com corda (6), puxada pela frente no puxador (6), rosca alternada com halteres (6), flexão de joelho na cadeira flexora (sentado) (6) e mais 1.
          → Acima de 4 séries, divida entre 2 exercícios diferentes ou entre 2 dias.
AJUSTAR   [volume.sessao.teto · um estudo] Mais de 10 séries de um músculo no mesmo treino: A (peito, ombro e tríceps): tríceps 15 e B (costas e bíceps): bíceps 13,5.
          → Leve parte dessas séries para outro dia: acima de 10 no mesmo treino, as séries a mais rendem pouco.
AJUSTAR   [frequencia.musculo · consenso] Muitas séries em poucos dias: bíceps (13,5 em 1 dia) e tríceps (15 em 1 dia).
          → Divida as séries em mais dias: até 10 séries de um músculo por treino.
AJUSTAR   [volume.semanal.abdomen · consenso] Abaixo do mínimo que faz crescer: abdômen 3 de 4 séries por semana.
          → Suba 1 série em abdominal no chão (crunch), no treino B (costas e bíceps).
AJUSTAR   [selecao.isolador-obrigatorio · moderada] Falta extensora: cobre a parte da frente da coxa que vai até o quadril, que cresce pouco só com agachamento e afundo.
          → Troque leg press por cadeira extensora no treino C (pernas).
AJUSTAR   [tempo.corte · consenso] Mais longo que os 60 min: A (peito, ombro e tríceps) ~70 min e C (pernas) ~70 min.
          → Faça elevação lateral com halteres e tríceps na polia com corda em sequência (bi-set) no treino A (peito, ombro e tríceps) e faça flexão de joelho na cadeira flexora (sentado) e panturrilha em pé na máquina em sequência (bi-set) no treino C (pernas). Ou escolha mais minutos.
INFO      [ordem.sessao · moderada] Isolador antes de um exercício grande: C (pernas).
          → Não precisa fazer nada: a ordem quase não muda o crescimento; os grandes primeiro ganham mais força.
```

Fonte: `carneiro2024` (PMC11236007, seção 2.6 (o grupo dividido); o texto diz 75 séries por semana, mas as séries por exercício somam 85: valem as da seção 2.6).

**5 dias, 1x por músculo (Carneiro 2024)**: Dá para melhorar: 3 pontos a ajustar.
```
peito 10/6 · costas 10/6 · ombro lateral 5/6 · ombro de trás 5/6 · bíceps 10/6 · tríceps 10/6 · quadríceps 10/6 · posteriores da coxa 20/6 · glúteos 15/6 · panturrilha 10/6 · abdômen 10/4
Empurrar 10 × puxar 10. Tempo: Segunda ~38; Terça ~27; Quarta ~38; Quinta ~42; Sexta ~65 (orçamento 60).
AJUSTAR   [volume.series-por-exercicio · moderada] 11 exercícios com mais de 4 séries: supino reto com barra (10), tríceps na polia com corda (5), leg press (5), agachamento livre com barra (profundo) (5), remada baixa com triângulo (10), rosca com barra W (5) e mais 5.
          → Acima de 4 séries, divida entre 2 exercícios diferentes ou entre 2 dias.
AJUSTAR   [selecao.exercicios-por-musculo · consenso] Um movimento só para o músculo: peito só com empurrar reto, costas só com remada e quadríceps só com agachar.
          → Acrescente supino inclinado com halteres (2 séries) no treino Quarta, acrescente puxada unilateral ajoelhado na polia alta (2 séries) no treino Segunda e troque agachamento livre com barra (profundo) por afundo estático com halteres no treino Terça. Movimentos diferentes crescem partes diferentes do músculo.
AJUSTAR   [selecao.isolador-obrigatorio · moderada] Falta tríceps acima da cabeça e extensora: cobre a cabeça longa do tríceps, que o supino e a flexão não crescem e a parte da frente da coxa que vai até o quadril, que cresce pouco só com agachamento e afundo.
          → Acrescente tríceps francês na polia com corda (2 séries) no treino Quarta e acrescente cadeira extensora (2 séries) no treino Quinta.
LIMITE    [tempo.corte · consenso] Um pouco acima dos 60 min: Sexta ~65 min.
          → Não precisa fazer nada: fica dentro de 10% a mais. Se o tempo apertar no dia, faça dois exercícios em sequência (bi-set).
INFO      [volume.semanal.maximo · consenso] Acima do máximo do nível intermediário (16 por semana): posteriores da coxa 20.
          → Não precisa fazer nada se a recuperação estiver boa; se pesar, volte para perto de 16.
INFO      [ordem.sessao · moderada] Isolador antes de um exercício grande: Sexta.
          → Não precisa fazer nada: a ordem quase não muda o crescimento; os grandes primeiro ganham mais força.
```

### Segurança: o programa do Bruno sem dor, avaliado com o ombro em 7 hoje

**Bruno com dor no ombro**: Segurança primeiro: 1 ponto de segurança.
```
peito 12/12 (foco) · costas 12/12 (foco) · ombro lateral 12/12 (foco) · ombro de trás 9,5/6 · bíceps 12,5/12 (foco) · tríceps 12/12 (foco) · quadríceps 8/6 · posteriores da coxa 8/6 · glúteos 7/6 · panturrilha 6/6 · abdômen 4/4
Empurrar 16 × puxar 15. Tempo: Superior A ~70; Inferior A ~40; Superior B ~69; Inferior B ~55 (orçamento 70).
SEGURANÇA [seguranca.dor.programa · consenso] 17 exercícios carregam a região marcada com dor no ombro (7 hoje): supino reto com halteres, puxada unilateral ajoelhado na polia alta, remada com halteres, peito apoiado no banco inclinado, desenvolvimento sentado com halteres, tríceps francês na polia com corda, elevação lateral com halteres e mais 11.
          → Enquanto a dor não baixar, eles saem do treino (no lugar: rosca inclinada com halteres → rosca Scott com halter, braço apoiado no encosto do banco inclinado e rosca na polia baixa, de costas para a torre → rosca Scott com halter, braço apoiado no encosto do banco inclinado). Procure avaliação profissional.
```


## Como reproduzir

Os textos acima saem de três scripts curtos que geram os programas das personas e dos publicados e imprimem os avisos, o 1º porquê de cada exercício e a avaliação (`gerarPrograma`, `avaliar`), um na `main` de antes do R5b e outro neste branch. Os programas publicados estão em `tests/unit/programas-publicados.ts`, com a fonte de cada um.

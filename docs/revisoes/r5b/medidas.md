# Medidas do R5b: o avaliador e o porquê

> Gerado por `npx vite-node scripts/auditoria/r5b.ts`. Dados fictícios. Não editar à mão. O contexto e as decisões estão em `README.md`, nesta pasta.

## 1. O avaliador na grade reduzida

5.850 programas: os 6 cenários comuns (academia, condomínio, casa, só o peso do corpo, só elásticos, halteres e banco) × 3 níveis × 2 a 6 dias × 30 a 90 min × 13 prioridades, sem dor (`scripts/auditoria/grade-reduzida.ts`).

| veredito | programas | % |
| --- | ---: | ---: |
| está bom | 2.410 | 41,2% |
| só limite | 2.314 | 39,6% |
| dá para ajustar | 1.126 | 19,2% |
| bloqueado (segurança) | 0 | 0% |
| **está bom ou só limite** | **4.724** | **80,8%** |
| com um "ajustar" que o gerador não avisa | 0 | 0% |

| gravidade | regra | tipo | programas | % |
| --- | --- | --- | ---: | ---: |
| ajustar | `volume.semanal.alvo` | meta-cabe | 567 | 9,7% |
| ajustar | `volume.semanal.alvo` | meta-troca | 201 | 3,4% |
| ajustar | `selecao.exercicios-por-musculo` | funcoes | 199 | 3,4% |
| ajustar | `avaliador.equilibrio.coxa` | coxa | 147 | 2,5% |
| ajustar | `volume.semanal.minimo-eficaz` | meta-cabe | 121 | 2,1% |
| ajustar | `avaliador.equilibrio.empurrar-puxar` | empurrar-puxar | 73 | 1,2% |
| ajustar | `selecao.isolador-obrigatorio` | isolador | 6 | 0,1% |
| ajustar | `volume.semanal.minimo-eficaz` | meta-troca | 6 | 0,1% |
| ajustar | `volume.semanal.alvo` | meta-excesso | 1 | 0% |
| limite | `volume.semanal.alvo` | meta-tempo | 2.027 | 34,6% |
| limite | `tempo.corte` | tempo-limite | 1.046 | 17,9% |
| limite | `volume.semanal.minimo-eficaz` | meta-tempo | 995 | 17% |
| limite | `selecao.exercicios-por-musculo` | funcoes-equipamento | 975 | 16,7% |
| limite | `volume.semanal.minimo-eficaz` | meta-equipamento | 975 | 16,7% |
| limite | `selecao.isolador-obrigatorio` | isolador-tempo | 579 | 9,9% |
| limite | `volume.semanal.alvo` | meta-equipamento | 450 | 7,7% |
| limite | `selecao.exercicios-por-musculo` | funcoes-tempo | 147 | 2,5% |
| info | `volume.semanal.maximo` | maximo-nivel | 369 | 6,3% |

Por duração (está bom ou só limite):

| minutos | % |
| ---: | ---: |
| 30 | 62,7% |
| 45 | 81,5% |
| 60 | 88,2% |
| 75 | 88,2% |
| 90 | 83,1% |

## 2. Os avisos que o avaliador acrescenta ao programa gerado

Uma função só num músculo grande, a coxa, empurrar ÷ puxar e o isolador que faltou: 425 achados na grade reduzida. Com 15 min a mais por treino, o mesmo achado some em 339 (79,8%); é a base do "mais minutos por treino costumam resolver" do texto.

## 3. O mesmo exercício em duas vagas (a flexão, o supino reto, a remada)

Músculos grandes cuja 2ª função vem do mesmo exercício em outra vaga: 1.982 casos na grade reduzida; em 975 deles (49,2%) não há outro exercício possível para o músculo. Contar 1 função marcaria esses programas com "uma função só". A decisão (README.md): conta 2 quando é o exercício que a tabela de funções escolhe para a outra vaga com aquele equipamento.

## 4. As 3 correções do gerador (depois)

Grade reduzida mais 1 caso a cada 20 da grade de `cenarios.ts` (com dor): 13.338 programas.

| defeito | programas |
| --- | ---: |
| um dia com mais de 10 séries de um músculo, contando as indiretas pela metade | 0 (0%) |
| glúteo sem extensão de quadril nem stiff, com a ponte possível (sem dor, 30 min ou mais) | 1 de 6.669 (0%) |
| um dia com afundo na vaga de agachar e a vaga de afundo | 51 (0,4%) |

## 5. As 6 personas

### Bruno

```
Veredito: está bom: nada a ajustar
peito 12/12 (foco) · costas 12/12 (foco) · ombro lateral 12/12 (foco) · ombro de trás 9,5 · bíceps 12,5/12 (foco) · tríceps 12/12 (foco) · quadríceps 8 · posteriores da coxa 8 · glúteos 7 · panturrilha 6 · abdômen 4
Empurrar 16 × puxar 15; quadríceps 8 × posteriores 8.
Tempo: Superior A ~70 min; Inferior A ~40 min; Superior B ~69 min; Inferior B ~55 min (orçamento 70).
```

Avisos do programa:

- [`tempo.corte`] Para caber no tempo: superséries entre músculos que não competem. Não precisa fazer nada; com mais minutos por treino, o programa precisa de menos cortes.

### Ana

```
Veredito: está bom dentro do que o seu equipamento, a dor ou o tempo permitem
peito 6 · costas 6 · ombro lateral 4 · ombro de trás 6 · bíceps 6 · tríceps 6 · quadríceps 6/8 (foco) · posteriores da coxa 6/8 (foco) · glúteos 10/8 (foco) · panturrilha 7/8 (foco) · abdômen 4
Empurrar 6 × puxar 9; quadríceps 6 × posteriores 6.
Tempo: Corpo todo A ~42 min; Corpo todo B ~44 min; Corpo todo C ~46 min (orçamento 45).
LIMITE [volume.semanal.alvo · consenso] Abaixo da meta: quadríceps 6 de 8, posteriores da coxa 6 de 8 e panturrilha 7 de 8 séries por semana; com 3 treinos de 45 min não cabe mais. Não precisa fazer nada; para chegar lá, mais minutos por treino, mais um dia ou menos grupos de foco.
LIMITE [tempo.corte · consenso] Mais longo que os 45 min: Corpo todo C ~46 min. Tirar mais deixaria algum músculo abaixo do mínimo. Não precisa fazer nada: dá para treinar assim, ou escolher uma duração maior na rotina.
```

Avisos do programa:

- [`equipamento.sem-puxada-vertical`] Sem barra fixa nem polia alta: as costas treinam só com remadas. Não precisa fazer nada: as remadas mantêm o volume das costas.
- [`equipamento.escada-carga-leve`] Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando um degrau ficar fácil, o app sugere o próximo.
- [`selecao.isolador-obrigatorio`] Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: o agachamento e o afundo seguem no programa.
- [`tempo.corte`] Corpo todo C: deve levar ~46 min, mais que os 45 min que você tem. Dá para treinar assim, ou escolher mais minutos em Meus dados, "Mudar a rotina ou a divisão".
- [`tempo.corte`] Para caber no tempo: superséries entre músculos que não competem, drop set na última série de alguns isoladores (conta como 2 séries), menos séries. Não precisa fazer nada; com mais minutos por treino, o programa precisa de menos cortes.
- [`tempo.corte`] Abaixo da meta por falta de tempo: quadríceps 6 de 8 séries; posteriores da coxa 6 de 8 séries; panturrilha 7 de 8 séries. Para chegar à meta, mais minutos por treino ou mais dias: dá para mudar em Meus dados, "Mudar a rotina ou a divisão".
- [`volume.prioridade.competicao`] Seus focos disputam o mesmo tempo: quadríceps 6 de 8, posteriores da coxa 6 de 8 e panturrilha 7 de 8 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias. "Pernas" são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pedem o triplo de séries de "peito".

### Diego

```
Veredito: está bom: nada a ajustar
peito 8/8 (foco) · costas 8/8 (foco) · ombro lateral 5 · ombro de trás 4 · bíceps 6 · tríceps 6 · quadríceps 6 · posteriores da coxa 6 · glúteos 6,5 · panturrilha 4 · abdômen 4
Empurrar 8 × puxar 8; quadríceps 6 × posteriores 6.
Tempo: Corpo todo A ~41 min; Corpo todo B ~45 min; Corpo todo C ~45 min (orçamento 45).
```

Avisos do programa:

- [`equipamento.escada-carga-leve`] Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando um degrau ficar fácil, o app sugere o próximo.
- [`tempo.corte`] Para caber no tempo: superséries entre músculos que não competem, menos séries. Não precisa fazer nada; com mais minutos por treino, o programa precisa de menos cortes.

### Carla

```
Veredito: dá para ajustar
peito 14/14 (foco) · costas 14/14 (foco) · ombro lateral 14/14 (foco) · ombro de trás 10,5 · bíceps 10,5 · tríceps 12 · quadríceps 14/14 (foco) · posteriores da coxa 14/14 (foco) · glúteos 9 · panturrilha 12/14 (foco) · abdômen 4
Empurrar 18 × puxar 17; quadríceps 14 × posteriores 14.
Tempo: Superior ~70 min; Inferior ~63 min; Empurrar ~50 min; Puxar ~41 min; Pernas ~65 min (orçamento 75).
AJUSTAR [volume.semanal.alvo · consenso] Abaixo da meta, e cabe mais: panturrilha 12 de 14 (acrescente panturrilha em pé na máquina no treino Inferior).
```

Avisos do programa:

- [`volume.semanal.alvo`] Abaixo da meta: panturrilha 12 de 14 séries por semana. A divisão Superior/Inferior + Empurrar/Puxar/Pernas treina este músculo 2x por semana, e os exercícios dele já estão no limite de 4 séries por exercício e 10 por treino. Para chegar à meta, mais um dia na semana ou outra divisão: dá para mudar em Meus dados, "Mudar a rotina ou a divisão".
- [`volume.prioridade.competicao`] Seus focos disputam o mesmo tempo: panturrilha 12 de 14 séries por semana. Com 5 treinos de 75 min não cabe tudo: para o foco render, escolha 1 ou 2 grupos, ou aumente os minutos ou os dias. "Pernas" são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pedem o triplo de séries de "peito".

### Elisa

```
Veredito: está bom dentro do que o seu equipamento, a dor ou o tempo permitem
peito 6 · costas 0 · ombro lateral 0 · ombro de trás 0 · bíceps 0 · tríceps 3 · quadríceps 6 · posteriores da coxa 6 · glúteos 8 · panturrilha 4 · abdômen 4
Empurrar 6 × puxar 0; quadríceps 6 × posteriores 6.
Tempo: Corpo todo A ~30 min; Corpo todo B ~28 min; Corpo todo C ~26 min (orçamento 30).
LIMITE [volume.semanal.minimo-eficaz · moderada] Sem exercício possível com o seu equipamento: costas 0 de 6, ombro lateral 0 de 6, ombro de trás 0 de 6 e bíceps 0 de 6 séries por semana. Não precisa fazer nada: o resto do programa segue igual.
LIMITE [volume.semanal.minimo-eficaz · moderada] Abaixo da meta: tríceps 3 de 6 séries por semana; com 3 treinos de 30 min não cabe mais. Não precisa fazer nada; para chegar lá, mais minutos por treino, mais um dia.
LIMITE [selecao.exercicios-por-musculo · consenso] Uma função só: posteriores da coxa só com flexão de joelho. O seu equipamento (ou a dor de hoje) não abre outra: não precisa fazer nada.
```

Avisos do programa:

- [`equipamento.escada-carga-leve`] Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando um degrau ficar fácil, o app sugere o próximo.
- [`selecao.isolador-obrigatorio`] Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: o agachamento e o afundo seguem no programa.
- [`tempo.corte`] Para caber no tempo: superséries entre músculos que não competem, menos exercícios. Não precisa fazer nada; com mais minutos por treino, o programa precisa de menos cortes.
- [`equipamento.sem-ancoragem`] Sem algo para puxar ou levantar: costas, ombro lateral, ombro de trás e bíceps ficam sem exercício. Não precisa fazer nada: o resto do corpo segue no programa.
- [`volume.semanal.alvo`] Abaixo da meta: tríceps 3 de 6 séries por semana. Com 30 min cabem ~4 exercícios por treino. Com mais minutos por treino, o músculo ganha séries: dá para mudar em Meus dados, "Mudar a rotina ou a divisão".

### Fabio

```
Veredito: está bom dentro do que o seu equipamento, a dor ou o tempo permitem
peito 12 · costas 12/12 (foco) · ombro lateral 0 · ombro de trás 6 · bíceps 6 · tríceps 10 · quadríceps 9 · posteriores da coxa 10 · glúteos 9 · panturrilha 8 · abdômen 4
Empurrar 4 × puxar 12; quadríceps 9 × posteriores 10.
Tempo: Superior A ~33 min; Inferior A ~45 min; Superior B ~33 min; Inferior B ~45 min (orçamento 45).
LIMITE [volume.semanal.minimo-eficaz · moderada] Sem exercício possível com o seu equipamento: ombro lateral 0 de 6 séries por semana. Não precisa fazer nada: o resto do programa segue igual.
LIMITE [selecao.exercicios-por-musculo · consenso] Uma função só: costas só com puxar vertical e posteriores da coxa só com flexão de joelho. O seu equipamento (ou a dor de hoje) não abre outra: não precisa fazer nada.
```

Avisos do programa:

- [`equipamento.escada-carga-leve`] Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não precisa fazer nada: quando um degrau ficar fácil, o app sugere o próximo.
- [`selecao.isolador-obrigatorio`] Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: o agachamento e o afundo seguem no programa.
- [`volume.semanal.alvo`] Sem exercício possível com o seu equipamento: ombro lateral. Não precisa fazer nada: o resto do programa segue.

Total: 20 avisos, 137 exercícios (todos com o porquê específico), 15 músculos com a meta do programa abaixo da do nível na Semana.

## 6. Os 4 programas publicados

Avaliados como a Carla (academia completa), intermediário, 60 min, sem foco. Fonte e escolhas de equipamento em `tests/publicados/index.ts`.

### schoenfeld2019b-3-series (`schoenfeld2019b`, PMC6303131, seção "RT Procedures")

```
Veredito: dá para ajustar
peito 9 · costas 18 · ombro lateral 4,5 · ombro de trás 9 · bíceps 9 · tríceps 9 · quadríceps 27 · posteriores da coxa 0 · glúteos 9 · panturrilha 0 · abdômen 0
Empurrar 18 × puxar 18; quadríceps 27 × posteriores 0.
Tempo: Segunda ~57 min; Quarta ~57 min; Sexta ~57 min (orçamento 60).
AJUSTAR [volume.semanal.teto-padrao · moderada] Mais de 20 séries por semana: quadríceps 27. Acima de ~20, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.
AJUSTAR [volume.semanal.minimo-eficaz · moderada] Abaixo da meta, e cabe se trocar um exercício de músculos que já passaram da meta: posteriores da coxa 0 de 6 (no treino Segunda, troque puxada pela frente no puxador por flexão de joelho na cadeira flexora (sentado)) e panturrilha 0 de 6 (no treino Segunda, troque remada baixa com triângulo por panturrilha unilateral no step).
AJUSTAR [volume.semanal.abdomen · consenso] Abaixo da meta, e cabe se trocar um exercício de músculos que já passaram da meta: abdômen 0 de 4 (no treino Segunda, troque agachamento livre com barra (profundo) por abdominal na polia com corda, ajoelhado).
AJUSTAR [avaliador.equilibrio.coxa · consenso] Frente × trás da coxa: quadríceps 27 × posteriores 0 séries por semana, sem nenhum exercício direto de posteriores. Acrescente uma flexão de joelho ou um stiff.
LIMITE [selecao.exercicios-por-musculo · consenso] Uma função só: peito só com empurrar horizontal; com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, entra outra função.
LIMITE [selecao.gluteo · um estudo] Uma função só: glúteos só com agachar ou afundo; com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, entra outra função.
LIMITE [selecao.isolador-obrigatorio · moderada] Fica de fora, por falta de tempo, o isolador que cobre o que os multiarticulares não cobrem: tríceps acima da cabeça (tríceps francês na polia com corda) e panturrilha em pé (panturrilha unilateral no step); com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, ele entra.
info [volume.semanal.maximo · consenso] Acima do máximo indicado para o seu nível (16 por semana), sem ser foco: costas 18. Não é um problema; se faltar tempo para outro músculo, é daqui que as séries podem sair.
```

### schoenfeld2019b-5-series (`schoenfeld2019b`, PMC6303131, seção "RT Procedures")

```
Veredito: dá para ajustar
peito 15 · costas 30 · ombro lateral 7,5 · ombro de trás 15 · bíceps 15 · tríceps 15 · quadríceps 45 · posteriores da coxa 0 · glúteos 15 · panturrilha 0 · abdômen 0
Empurrar 30 × puxar 30; quadríceps 45 × posteriores 0.
Tempo: Segunda ~90 min; Quarta ~90 min; Sexta ~90 min (orçamento 60).
AJUSTAR [volume.series-por-exercicio · moderada] Mais de 4 séries num exercício só: supino reto com barra, 5 séries (nos 3 dias), desenvolvimento em pé com barra, 5 séries (nos 3 dias), puxada pela frente no puxador, 5 séries (nos 3 dias), remada baixa com triângulo, 5 séries (nos 3 dias), agachamento livre com barra (profundo), 5 séries (nos 3 dias), leg press, 5 séries (nos 3 dias) e cadeira extensora, 5 séries (nos 3 dias). Divida as séries entre 2 exercícios da mesma função, ou entre 2 dias.
AJUSTAR [volume.sessao.teto · um estudo] Mais de 10 séries de um músculo num treino (contando as indiretas pela metade): quadríceps 15 (nos 3 dias). Leve as séries que passam para outro dia.
AJUSTAR [volume.semanal.teto-padrao · moderada] Mais de 20 séries por semana: costas 30 e quadríceps 45. Acima de ~20, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.
AJUSTAR [frequencia.musculo · consenso] Séries demais em poucos dias: quadríceps 45 em 3 dias. Com mais de 10 séries por semana, divida o músculo em pelo menos 2 dias.
AJUSTAR [volume.semanal.minimo-eficaz · moderada] Abaixo da meta: posteriores da coxa 0 de 6 e panturrilha 0 de 6 séries por semana, enquanto costas tem 30 e quadríceps tem 45 (acima do máximo do nível). Passe séries de lá para cá: o tempo é o mesmo.
AJUSTAR [volume.semanal.abdomen · consenso] Abaixo da meta: abdômen 0 de 4 séries por semana, enquanto costas tem 30 e quadríceps tem 45 (acima do máximo do nível). Passe séries de lá para cá: o tempo é o mesmo.
AJUSTAR [avaliador.equilibrio.coxa · consenso] Frente × trás da coxa: quadríceps 45 × posteriores 0 séries por semana, sem nenhum exercício direto de posteriores. Acrescente uma flexão de joelho ou um stiff.
AJUSTAR [tempo.corte · consenso] Mais longo que os 60 min que você tem: Segunda e Quarta ~90 min (para caber: tire 3 séries de supino reto com barra, tire 3 séries de desenvolvimento em pé com barra, tire 3 séries de puxada pela frente no puxador, tire 3 séries de remada baixa com triângulo e tire 1 série de agachamento livre com barra (profundo)) e Sexta ~90 min (para caber: tire 3 séries de supino reto com barra, tire 1 série de desenvolvimento em pé com barra, tire 3 séries de puxada pela frente no puxador, tire 3 séries de remada baixa com triângulo e tire 3 séries de agachamento livre com barra (profundo)). Assim o dia cabe sem deixar nenhum músculo abaixo da meta; ou escolha uma duração maior na rotina.
LIMITE [selecao.exercicios-por-musculo · consenso] Uma função só: peito só com empurrar horizontal; com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, entra outra função.
LIMITE [selecao.gluteo · um estudo] Uma função só: glúteos só com agachar ou afundo; com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, entra outra função.
LIMITE [selecao.isolador-obrigatorio · moderada] Fica de fora, por falta de tempo, o isolador que cobre o que os multiarticulares não cobrem: tríceps acima da cabeça (tríceps francês na polia com corda) e panturrilha em pé (panturrilha unilateral no step); com 3 treinos de 60 min não cabe mais. Não precisa fazer nada; com mais minutos, ele entra.
```

### thomas2016-abc (`thomas2016`, PMC4836564, tabela 3 e "Training Protocol")

```
Veredito: dá para ajustar
peito 9 · costas 9 · ombro lateral 7,5 · ombro de trás 4,5 · bíceps 13,5 · tríceps 15 · quadríceps 9 · posteriores da coxa 9 · glúteos 7,5 · panturrilha 9 · abdômen 3
Empurrar 12 × puxar 9; quadríceps 9 × posteriores 9.
Tempo: A ~66 min; B ~51 min; C ~68 min (orçamento 60).
AJUSTAR [volume.series-por-exercicio · moderada] Mais de 4 séries num exercício só: supino reto com halteres, 6 séries (A), elevação lateral com halteres, 6 séries (A), tríceps na polia com corda, 6 séries (A), puxada pela frente no puxador, 6 séries (B), rosca alternada com halteres, 6 séries (B), flexão de joelho na cadeira flexora (sentado), 6 séries (C) e panturrilha em pé na máquina, 9 séries (C). Divida as séries entre 2 exercícios da mesma função, ou entre 2 dias.
AJUSTAR [volume.sessao.teto · um estudo] Mais de 10 séries de um músculo num treino (contando as indiretas pela metade): tríceps 15 (A) e bíceps 13,5 (B). Leve as séries que passam para outro dia.
AJUSTAR [frequencia.musculo · consenso] Séries demais em poucos dias: bíceps 13,5 em 1 dia e tríceps 15 em 1 dia. Com mais de 10 séries por semana, divida o músculo em pelo menos 2 dias.
AJUSTAR [volume.semanal.abdomen · consenso] Abaixo da meta, e cabe mais: abdômen 3 de 4 (suba 1 série em abdominal no chão (crunch), no treino B).
AJUSTAR [selecao.isolador-obrigatorio · moderada] Falta o isolador que cobre o que os multiarticulares não cobrem. Acrescente: extensora (cadeira extensora) no treino B.
AJUSTAR [tempo.corte · consenso] Mais longo que os 60 min que você tem: A ~66 min (para caber: tire 1 série de supino inclinado com halteres e tire 2 séries de supino reto com halteres) e C ~68 min (para caber: tire 1 série de agachamento no hack, tire 1 série de leg press, tire 1 série de afundo estático com halteres e tire 1 série de flexão de joelho na cadeira flexora (sentado)). Assim o dia cabe sem deixar nenhum músculo abaixo da meta; ou escolha uma duração maior na rotina.
info [ordem.sessao · moderada] Isolador antes de multiarticular: C. A hipertrofia é a mesma; se quiser mais força no multiarticular, faça-o primeiro.
```

### carneiro2024-dividido (`carneiro2024`, PMC11236007, seção 2.6)

```
Veredito: dá para ajustar
peito 10 · costas 10 · ombro lateral 5 · ombro de trás 5 · bíceps 10 · tríceps 10 · quadríceps 10 · posteriores da coxa 20 · glúteos 15 · panturrilha 10 · abdômen 10
Empurrar 10 × puxar 10; quadríceps 10 × posteriores 20.
Tempo: Segunda ~37 min; Terça ~25 min; Quarta ~37 min; Quinta ~45 min; Sexta ~60 min (orçamento 60).
AJUSTAR [volume.series-por-exercicio · moderada] Mais de 4 séries num exercício só: supino reto com barra, 10 séries (Segunda), tríceps na polia com corda, 5 séries (Segunda), leg press, 5 séries (Terça), agachamento livre com barra (profundo), 5 séries (Terça), remada baixa com triângulo, 10 séries (Quarta), rosca com barra w, 5 séries (Quarta), flexão de joelho na cadeira flexora (sentado), 10 séries (Quinta), panturrilha em pé na máquina, 10 séries (Quinta), elevação lateral com halteres, 5 séries (Sexta), abdominal na máquina, 10 séries (Sexta) e hiperextensão no banco romano, 10 séries (Sexta). Divida as séries entre 2 exercícios da mesma função, ou entre 2 dias.
AJUSTAR [selecao.exercicios-por-musculo · consenso] Uma função só: peito só com empurrar horizontal. Funções diferentes crescem regiões diferentes do músculo: acrescente supino inclinado com halteres no treino Quarta.
AJUSTAR [selecao.exercicios-por-musculo · consenso] Uma função só: costas só com puxar horizontal (remada). Funções diferentes crescem regiões diferentes do músculo: acrescente puxada unilateral ajoelhado na polia alta no treino Segunda.
AJUSTAR [selecao.exercicios-por-musculo · consenso] Uma função só: quadríceps só com agachar. Funções diferentes crescem regiões diferentes do músculo: no treino Terça, troque agachamento livre com barra (profundo) por afundo estático com halteres.
AJUSTAR [selecao.isolador-obrigatorio · moderada] Falta o isolador que cobre o que os multiarticulares não cobrem. Acrescente: tríceps acima da cabeça (tríceps francês na polia com corda) no treino Quarta e extensora (cadeira extensora) no treino Quinta.
info [volume.semanal.maximo · consenso] Acima do máximo indicado para o seu nível (16 por semana), sem ser foco: posteriores da coxa 20. Não é um problema; se faltar tempo para outro músculo, é daqui que as séries podem sair.
info [ordem.sessao · moderada] Isolador antes de multiarticular: Sexta. A hipertrofia é a mesma; se quiser mais força no multiarticular, faça-o primeiro.
```


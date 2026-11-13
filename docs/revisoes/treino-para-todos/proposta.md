# Proposta: o que mudar no treino recomendado, com o efeito medido

> Sessão "treino para todos", etapa 1 (12 e 13/11/2026). **Nada mudou no app.** Cada mudança abaixo foi escrita num protótipo (`scripts/auditoria/prototipo/`, uma cópia do gerador que, com tudo desligado, dá programas idênticos aos do app) e medida em 680.625 programas fictícios, em duas contas: a grade (cada combinação vale igual) e a ponderada (as combinações mais prováveis valem mais; os pesos são estimativa, `diagnostico.md`, seção 1.2). O retrato de hoje está em [`diagnostico.md`](diagnostico.md); as doze pessoas, em [`exemplos/`](exemplos/README.md). Nada entra sem a decisão do Gustavo (seção 10).

## 1. Em uma olhada

| | Hoje | Proposta |
|---|---:|---:|
| Programas sem nenhum defeito na régua oficial, conta ponderada | 79,0% | **96,2%** |
| Idem, na grade | 80,3% | **89,8%** |
| O pior grupo (dor forte no cotovelo), na grade | 50,0% | **71,9%** |
| Programas de 30 min sem defeito, na grade | 67,6% | 74,6% |
| Dia típico abaixo de 70% do tempo pedido, sem aviso (ponderada) | 15,2% | 0,0% |
| Séries por músculo por semana (média ponderada) | 7,3 | 8,0 |
| Intermediários e avançados com a média abaixo da faixa do nível (ponderada) | 51,6% | 41,2% |
| Dia de 5 exercícios ou mais com 2 séries em todos (ponderada) | 21,8% | 11,3% |
| Exercício escolhido pela ordem alfabética (programas com pelo menos um caso, ponderada) | 93,3% | 0,0% |
| Dia com menos de 3 exercícios ou sem exercício grande (grade) | 10,6% | 4,8% |
| Com dor forte no joelho, programas com exercício ajoelhado (ponderada) | 43,1% | 0,0% |
| Revisão cega, 2ª rodada: eficiente · adequada · agradável (1 a 10) | 5,5 · 5,8 · 5,3 | **6,0 · 6,4 · 5,8** |
| Revisão cega: pessoas com nota melhor / igual / pior (18 pessoas) | — | 9 / 8 / 1 |

**As três mudanças que mais importam:**
1. **O treino passa a usar o tempo e o nível da pessoa, com ou sem foco** (pacote 1). É dose de treino: a única com evidência robusta na direção. A Marina (intermediária, academia, 4 dias de 60 min, sem foco) recebe hoje dias de 37 a 46 min com 2 séries de tudo; passa a receber dias de 52 a 59 min, com 3 a 4 séries.
2. **A escolha entre exercícios equivalentes deixa de cair na animação e no alfabeto** (pacote 2): o exercício de referência e de dois lados vem antes do raro e de um lado só; para o iniciante, o mais simples primeiro.
3. **Com dor forte, a semana é montada com o que sobrou em vez de deixar dias quase vazios** (pacote 3), e os exercícios ajoelhados saem com dor forte no joelho (pacote 0, de segurança).

**O que a proposta não resolve** (dito sem enfeite): quem tem 30 minutos continua sendo o pior grupo (74,6% sem defeito); quem é forte e não tem equipamento recebe quase a mesma semana (nota 4,3 a 5,0 nas duas versões); sem nada para puxar, costas e bíceps continuam a zero; o iniciante continua com duplas de exercícios e, com 60 min, 8 exercícios por dia.

---

## 2. As mudanças, da mais importante para a menos

Cada regra foi medida sozinha (as outras desligadas) e todas juntas. "Régua" = programas sem nenhum defeito da régua oficial da G5 (`scripts/auditoria/regua.ts`). A tabela completa de cada regra está em `medidas/` (uma pasta por regra não foi versionada; os números abaixo saem de `scripts/auditoria/comparar-retratos.ts`).

| regra (pacote) | régua sem defeito, grade: hoje → com a regra | ponderada | pior grupo de hoje (dor forte no cotovelo) | defeitos da régua que pioram em algum grupo |
| --- | --- | --- | --- | --- |
| 0. joelho (ajoelhados carregam o joelho) | 80,3% → 80,3% | 79,0% → 79,0% | 50,0% → 50,0% | D1 |
| 1. usa-tempo (o tempo que sobra vira série) | 80,3% → 83,5% | 79,0% → 94,2% | 50,0% → 50,0% | A2, C1, D1 |
| 2. escolha (referência, dois lados, iniciante simples) | 80,3% → 80,4% | 79,0% → 77,9% | 50,0% → 49,8% | A4, B1, C1, E1 |
| 2. sem-repetir (nunca em todos os dias, em todo caminho) | 80,3% → 80,7% | 79,0% → 79,2% | 50,0% → 51,9% | — |
| 2. fadiga (lombar) | 80,3% → 80,3% | 79,0% → 79,0% | 50,0% → 50,0% | — |
| 3. dor (corpo todo quando um dia esvazia) | 80,3% → 85,6% | 79,0% → 80,3% | 50,0% → 67,5% | B1, D1, D3 |
| 3. curto (protegidos em dias diferentes) | 80,3% → 80,6% | 79,0% → 79,3% | 50,0% → 50,0% | — |
| 3. tecnicas (bi-set sem barra, pares juntos, iniciante sem drop set) | 80,3% → 80,1% | 79,0% → 78,5% | 50,0% → 49,9% | A3, D1 |
| 4. iniciante-simples (o iniciante repete) | 80,3% → 80,4% | 79,0% → 79,1% | 50,0% → 50,4% | A3, A4 |
| **todas juntas** | 80,3% → 89,8% | 79,0% → 96,2% | 50,0% → 71,9% | A3, B1, C1, D1, D3 |

Cada regra foi medida com as outras desligadas; os efeitos não se somam exatamente, porque uma regra muda o terreno da outra. "Defeitos que pioram": algum dos 9 defeitos da régua oficial sobe mais de 0,05 ponto em algum dos 44 grupos (equipamento, nível, minutos, dias, foco, dor); o tamanho de cada piora está no texto de cada pacote.

### Pacote 0. Segurança: os exercícios ajoelhados carregam o joelho (regra `joelho`)

- **O problema em uma frase:** com dor forte no joelho, o app tira agachamento e leg press, mas ainda manda a pessoa ficar de joelhos no chão para a puxada e o abdominal na polia.
- **A regra nova:** `puxada-unilateral`, `puxada-barra-reta` e `abdominal-polia` passam a carregar o joelho na biblioteca (`exercicios.json`, campo `articulacoes`). Com dor acima de 5 no joelho, saem; com dor de 3 a 5, o app prefere outro.
- **Selo e fonte:** consenso (pressão direta com o joelho todo dobrado; achado de dois revisores da revisão cega; `23-dor-pressao-alta-e-gestacao.md`). Vai na direção de mais cuidado, que é o princípio do projeto.
- **Efeito medido:** com dor 7 no joelho, os programas com um exercício ajoelhado vão de 43,1% (ponderada; 7,3% na grade) para 0. **`joelho`:** régua sem defeito: 80,3% → 80,3% na grade e 79,0% → 79,0% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 50,0%. **Defeitos da régua que pioram em algum grupo:** D1 em dor joelho 7 (0,4% → 0,5%).
- **O que piora e para quem:** quem tem dor forte no joelho e só a polia alta para puxar perde a puxada (fica com a remada).
- **Para quem já usa:** só quem marcou dor acima de 5 no joelho vê "Há uma versão nova do seu programa".
- **A conferir com um profissional (não entra agora):** a panturrilha no leg press com dor no joelho (21,5% dos programas com dor 7 no joelho, ponderada), o agachamento com a barra nas costas e a rosca Scott com dor no ombro. Dois revisores os apontaram; não achamos fonte.

### Pacote 1. O treino usa o tempo e o nível da pessoa (regra `usa-tempo`)

- **O problema em uma frase:** sem grupo de foco, todo músculo fica com cerca de 6 séries por semana, seja qual for o nível e o tempo; o tempo que sobra só vira série nos dias em que falta exercício por causa do equipamento.
- **A regra nova (`tempo.sobra-series` reescrita, `volume.semanal.alvo` e `tempo.sobra` com texto novo):**
  1. O tempo que sobra vira série **em todos os dias**, uma série por vez, primeiro no músculo mais longe do alvo, no exercício com menos séries e no dia mais vazio, enquanto o dia couber nos minutos. Nunca acima de 4 séries por exercício, 10 por músculo na sessão e 20 na semana (como hoje).
  2. **Sem foco:** até o alvo do nível, 8, 12 e 14 séries por músculo (iniciante, intermediário, avançado). Com pouco tempo, o piso continua em ~6.
  3. **Com 1 ou 2 grupos de foco:** o foco primeiro, até o máximo do nível (10, 16, 20); os outros depois, ficando pelo menos 6 séries abaixo do foco (a regra de 08/11, que já valia nos dias com vaga vazia).
  4. **Com 3 grupos de foco ou mais:** o foco fica na meta (10, 12, 14) e não sobe além dela nos dias sem vaga vazia.
  5. Se, com tudo isso, o dia típico ainda usa menos de 70% do tempo, o app diz: "O seu treino completo dura cerca de X min: as séries já chegaram ao que rende bem no seu nível. Dá para escolher uma duração menor; para usar mais tempo, escolha um grupo de foco."
- **Selo e fonte:** a direção (mais séries rendem mais músculo, com retorno decrescente; 4 por semana é o mínimo detectável) é **robusta** (`pelland2026`, `schoenfeld2017a`, `bazvalle2022`). Os números 8, 12, 14 e 10, 16, 20 são **consenso** (as diretrizes pedem 10 ou mais: `acsm2026`, `schoenfeld2021b`; nenhum ensaio valida faixas por nível). O limite de 2 focos para o bônus é **consenso** (`volume.prioridade.ate-dois`) e veio da revisão cega: na 1ª rodada, a pessoa com 4 focos foi a 122 séries por semana e os três revisores baixaram a nota.
- **Efeito medido:** **`usa-tempo`:** régua sem defeito: 80,3% → 83,5% na grade e 79,0% → 94,2% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 50,0%. O que mais muda: o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4: 7,6% → 0,0% na grade, 23,2% → 0,0% na ponderada; dia de 5 exercícios ou mais com 2 séries em todos: 24,0% → 15,3% na grade, 21,8% → 11,4% na ponderada; dia típico abaixo de 70% dos minutos, sem o aviso (A4): 3,2% → 0,0% na grade, 15,2% → 0,0% na ponderada; dia típico abaixo de 85% dos minutos: 53,9% → 51,0% na grade, 45,8% → 34,1% na ponderada. **Defeitos da régua que pioram em algum grupo:** C1 em foco inferiores (3,0% → 3,3%); D1 em foco peito (3,6% → 3,9%); A2 em grupo par (16,4% → 16,6%); A2 em foco abdomen (9,9% → 10,1%); A2 em foco bracos (10,2% → 10,4%); e mais 18 casos menores.
- **O que piora e para quem:** treinos mais longos (até o tempo que a pessoa pediu) e mais cansativos para quem não escolheu foco; "algum músculo acima da faixa do nível" sobe de 12,4% para 18,6% dos programas (ponderada), quase sempre o iniciante que passa de 10 por causa das séries indiretas. O foco se dilui um pouco para quem tem foco e tempo sobrando (a nota C2 fica igual: 7,2% → 7,4%).
- **Isto reabre uma decisão.** Em 07/11, "usar todo o tempo que sobra para todos" (E-c) foi descartado porque contradizia o "foco com manutenção" e diluía o foco. O que há de novo: (a) a leitura de `pelland2026` e das duas diretrizes, que põem 6 séries entre o mínimo e o recomendado; (b) a medida na população com pesos: 1 em cada 4 programas com o dia abaixo de 70% do tempo, 15 em 100 sem aviso; (c) a regra "o foco primeiro" de 08/11, que não existia em 07/11 e segura a diluição; (d) a revisão cega: a crítica nº 1 dos três revisores, nas duas rodadas, é o tempo mal usado, e as pessoas sem foco na academia são as que mais sobem de nota (Marina +3,3; Perfil X2 +9,3 na soma das três notas).
- **Para quem já usa:** quase todo mundo sem foco e com 60 min ou mais vê "Há uma versão nova do seu programa", com mais séries nos mesmos exercícios. As cargas registradas continuam valendo.

### Pacote 2. A escolha do exercício (regras `escolha`, `sem-repetir`, `fadiga`)

- **O problema em uma frase:** entre exercícios equivalentes, o app escolhe o que tem animação e, no empate, o primeiro pela ordem alfabética; na academia completa, o 1º puxar sai "puxada unilateral ajoelhado" em vez da puxada comum.
- **A regra nova (`selecao.funcao-da-vaga`, o desempate):** entre os exercícios do mesmo nível da função, na ordem:
  1. o que já está em todos os dias menos um fica por último (`sem-repetir`: a regra da repetição passa a valer em todos os caminhos, e não só no último dia);
  2. poupar a região com dor leve (como hoje);
  3. para o iniciante, o de menor complexidade; depois o estável (como hoje);
  4. depois de um exercício que carrega a lombar sem apoio, o exercício de tronco que não carrega (`fadiga`; os de perna, no máximo dois no dia);
  5. o que deixa pôr mais carga (como hoje);
  6. com carga à vontade, o de dois lados antes do de um lado só (com pouca carga, o de um lado continua valendo como degrau);
  7. variedade entre os dias, preferência da pessoa e animação (como hoje);
  8. no empate total, **a ordem de referência da lista da função** (o exercício mais comum primeiro), e não a alfabética. A ordem das listas de `funcoes.json` passa a ser dado curado; nesta etapa mudaram 4 listas (puxar vertical, flexão de braço, afundo, abdômen).
- **Selo e fonte:** consenso de treinadores (`25-treinadores-e-aplicativos.md`). A pesquisa não achou diferença de resultado entre um lado e dois lados (`kassiano2025`) nem entre máquina e peso livre (`haugen2023`), com intervalos largos; o motivo dos dois lados é o tempo (o dobro por série) e a simplicidade. A regra da lombar não tem ensaio: é consenso.
- **Efeito medido:** **`escolha`:** régua sem defeito: 80,3% → 80,4% na grade e 79,0% → 77,9% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 49,8%. O que mais muda: exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa: 73,9% → 0,0% na grade, 93,3% → 0,0% na ponderada; exercício escolhido por ter animação, com um equivalente sem uso no programa: 32,9% → 30,6% na grade, 82,1% → 74,9% na ponderada; dois exercícios seguidos que carregam a lombar sem apoio: 10,5% → 9,1% na grade, 30,2% → 23,2% na ponderada; o multiarticular mais técnico (complexidade 3) não é o 1º da sua região: 12,5% → 13,9% na grade, 9,9% → 15,0% na ponderada. **Defeitos da régua que pioram em algum grupo:** A4 em grupo persona (10,4% → 10,6%); E1 em grupo atalho (0,2% → 0,5%); B1 em dor cotovelo 7 (2,0% → 2,2%); A4 em grupo atalho (14,3% → 14,5%); B1 em grupo atalho (0,7% → 0,8%); e mais 26 casos menores. **`fadiga`:** régua sem defeito: 80,3% → 80,3% na grade e 79,0% → 79,0% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 50,0%. O que mais muda: três exercícios ou mais no dia que carregam a lombar sem apoio: 4,1% → 0,7% na grade, 4,7% → 0,6% na ponderada; exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa: 73,9% → 76,2% na grade, 93,3% → 95,2% na ponderada; dois exercícios seguidos que carregam a lombar sem apoio: 10,5% → 9,4% na grade, 30,2% → 29,3% na ponderada. Nenhum defeito da régua piora em nenhum grupo. **`sem-repetir`:** régua sem defeito: 80,3% → 80,7% na grade e 79,0% → 79,2% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 51,9%. Nenhum defeito da régua piora em nenhum grupo.
- **O que piora e para quem:** **sozinha, a regra `escolha` piora a régua na conta ponderada (79,0% → 77,9%)**: o exercício de dois lados gasta menos tempo que o de um lado só, o dia encurta e mais programas ficam abaixo de 70% do tempo sem aviso (A4: 15,2% → 16,6%). Com a `usa-tempo` ligada, esse defeito vai a zero; por isso a `escolha` só entra depois dela (seção 8). Com todas as regras juntas, a animação ainda decide em 74,8% dos programas (ponderada; era 82,1%), porque ela continua antes da ordem de referência. Pôr a referência antes da animação resolveria, ao custo de mais cartões de texto; fica para quando as animações do pedido chegarem. "O exercício mais técnico não é o 1º da região" sobe de 9,9% para 17,3% (nota; todas as regras juntas, ponderada): entra mais terra romeno e supino com barra depois de outro exercício.
- **Para quem já usa:** quem treina em academia vê 3 a 7 exercícios trocados (o Bruno, 7; a Carla, 7; a Marina, 6). O progresso dos exercícios que saem fica guardado; os que entram começam pela 1ª série de acerto. **É a mudança que mais mexe no dia a dia de quem já usa.**

### Pacote 3. Dor que não desmonta o dia, tempo curto e técnicas (regras `dor`, `curto`, `tecnicas`)

- **O problema em uma frase:** com dor forte, a divisão recomendada fica com dias de 5 a 12 minutos; com 30 min, o abdômen e a panturrilha entram os dois no mesmo dia, que passa do tempo; e o bi-set junta agachamento com barra e supino.
- **As regras novas:**
  1. **`dor`** (`seguranca.dor.programa`, parte nova): quando a dor acima de 5 deixa algum dia da divisão recomendada com menos de 3 exercícios ou sem exercício grande, e a pessoa não escolheu a divisão à mão, o programa sai na divisão do mesmo número de dias com menos dias fracos (quase sempre a de corpo todo), com o aviso: "Por causa da dor…, a semana foi montada em Corpo todo: na divisão recomendada, um dos dias ficaria quase vazio. Quando a dor baixar, atualize a nota e a divisão recomendada volta." **Nada do que a dor tirou volta.**
  2. **`curto`** (`tempo.musculo-protegido`): o músculo protegido que tem menos dias onde entrar escolhe primeiro (a panturrilha só tem vaga num dia do Corpo todo A/B; o abdômen vai para o outro).
  3. **`tecnicas`** (`tempo.corte`): o bi-set nunca usa um exercício livre com barra nem junta dois que carregam a lombar sem apoio; os dois exercícios de um bi-set ficam um depois do outro na lista; o iniciante não recebe drop set.
- **Selo e fonte:** `dor`: consenso (a divisão não muda o resultado com o volume igual: robusta, `divisao.equivalencia`). `curto`: consenso. `tecnicas`: consenso (`iversen2021` não aconselha esses métodos em exercícios livres pesados; a restrição do drop set ao iniciante é de treinadores).
- **Efeito medido:** **`dor`:** régua sem defeito: 80,3% → 85,6% na grade e 79,0% → 80,3% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 67,5%. O que mais muda: dia com menos de 3 exercícios ou sem multiarticular (A2): 10,6% → 4,9% na grade, 2,0% → 0,5% na ponderada; exercícios por dia fora da faixa dos minutos (A1): 20,2% → 16,2% na grade, 4,6% → 3,4% na ponderada; dia de 5 exercícios ou mais com 2 séries em todos: 24,0% → 26,1% na grade, 21,8% → 22,6% na ponderada; dois exercícios da mesma função no mesmo dia: 31,9% → 29,6% na grade, 14,2% → 13,7% na ponderada. **Defeitos da régua que pioram em algum grupo:** B1 em dor ombro 7 (2,3% → 4,6%); B1 em dor cotovelo 7 (2,0% → 4,0%); B1 em dias 4 (0,0% → 1,5%); B1 em grupo par (1,1% → 1,9%); B1 em grupo persona (1,0% → 1,8%); e mais 33 casos menores. **`curto`:** régua sem defeito: 80,3% → 80,6% na grade e 79,0% → 79,3% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 50,0%. O que mais muda: exercícios por dia fora da faixa dos minutos (A1): 20,2% → 19,1% na grade, 4,6% → 3,6% na ponderada. Nenhum defeito da régua piora em nenhum grupo. **`tecnicas`:** régua sem defeito: 80,3% → 80,1% na grade e 79,0% → 78,5% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 49,9%. O que mais muda: bi-set com os dois exercícios separados na lista do dia: 6,3% → 0,0% na grade, 5,4% → 0,0% na ponderada; bi-set em que os dois carregam a lombar ou dependem da pegada: 1,9% → 0,8% na grade, 5,2% → 3,1% na ponderada; o multiarticular mais técnico (complexidade 3) não é o 1º da sua região: 12,5% → 12,6% na grade, 9,9% → 12,4% na ponderada. **Defeitos da régua que pioram em algum grupo:** A3 em min 30 (16,0% → 17,0%); A3 em dias 2 (9,6% → 10,6%); A3 em grupo par (7,1% → 7,7%); A3 em grupo persona (6,5% → 7,1%); A3 em grupo atalho (6,0% → 6,5%); e mais 31 casos menores.
- **O que piora e para quem:** **sozinha, a regra `dor` quase dobra o defeito "o mesmo exercício em todos os dias"** (B1: 0,39% → 0,70% na grade; com dor forte no ombro, 2,3% → 4,6%); a `sem-repetir` zera esse defeito, e por isso a `dor` só entra depois dela. **Sozinha, a `tecnicas` piora a régua (79,0% → 78,5%, ponderada):** sem o bi-set com barra, o dia passa do tempo mais vezes (A3: 3,0% → 3,5% na ponderada; com 30 min, 16,0% → 17,0% na grade). Com todas juntas, o A3 cai (4,0% → 3,6% na grade; com 30 min, 16,0% → 14,3%), mas sobra a piora com 3 dias por semana (4,9% → 5,2%), que está na lista do que falta zerar (seção 8). Com a dor e o corpo todo em 4 a 6 dias, o mesmo músculo aparece mais vezes em dias seguidos (nota: de 4,8% para 7,2% dos programas, ponderada). Sem o drop set, o iniciante com pouco tempo perde uma ou outra série (o Gilberto, 1).
- **Para quem já usa:** quem tem dor forte marcada vê outra divisão, com o aviso; quem treina 30 min vê um exercício mudar de dia.

### Pacote 4. O iniciante (regra `iniciante-simples`, mais o que falta desenhar)

- **O problema em uma frase:** 86 de cada 100 programas de iniciante têm mais de 12 exercícios diferentes na semana.
- **A regra medida:** o iniciante repete o exercício que já está na semana quando a função se repete (prática antes de variedade), mas nunca em todos os dias havendo outro do mesmo nível.
- **Selo e fonte:** consenso de treinadores (`25`; variar não rende mais músculo: `kassiano2022`, moderada).
- **Efeito medido:** **`iniciante-simples`:** régua sem defeito: 80,3% → 80,4% na grade e 79,0% → 79,1% na ponderada; o pior grupo de hoje (dor cotovelo 7) vai de 50,0% para 50,4%. O que mais muda: exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa: 73,9% → 81,2% na grade, 93,3% → 96,4% na ponderada; iniciante com mais de 12 exercícios diferentes na semana: 18,9% → 12,0% na grade, 38,7% → 36,0% na ponderada; exercício escolhido por ter animação, com um equivalente sem uso no programa: 32,9% → 33,5% na grade, 82,1% → 83,2% na ponderada. **Defeitos da régua que pioram em algum grupo:** A3 em foco inferiores (12,8% → 13,0%); A3 em grupo par (7,1% → 7,2%); A3 em min 30 (16,0% → 16,2%); A3 em nivel iniciante (2,4% → 2,5%); A3 em grupo persona (6,5% → 6,5%); e mais 3 casos menores.
- **O que foi medido e recusado:** limitar o iniciante a 6 exercícios por treino. Os três revisores pedem 5 ou 6, mas, com os dias de hoje, o limite esquecia músculos (músculo sem nenhuma série: de 10,4% para 14,1% dos iniciantes, ponderada) e soltava séries (menos de 4: de 21,1% para 32,4%). Para o limite funcionar, o iniciante precisa de dias próprios (dois treinos que se alternam, com 5 ou 6 exercícios que cobrem o corpo todo). Fica para a etapa 2, medido antes de entrar.
- **O que falta na biblioteca:** uma flexão mais fácil (seção 5).

### Pacote 5. O longo prazo: o aviso de "sem melhora" (medido num simulador; não está no protótipo do gerador)

- **O problema em uma frase:** quem progride no ritmo normal lê "três sessões sem melhora" em metade dos treinos, por meses.
- **A regra nova (`progressao.estagnacao`):** a janela cresce com o nível: 4 sessões para o iniciante, 8 para o intermediário, 16 para o avançado (do mesmo exercício, com a mesma carga, sem ganhar nenhuma repetição no total).
- **Selo e fonte:** consenso. O ganho de força desacelera muito com o tempo de treino (`steele2023`); nenhum ensaio define a janela.
- **Efeito medido** (`medidas/longo-prazo.md`; o corpo é um modelo): avisos por exercício em 48 sessões: iniciante 24 → 17; intermediário 36 → 17; avançado 41 → 17. A carga sobe as mesmas vezes.
- **Ressalva:** os números da janela deveriam ser conferidos com o export do uso real do Gustavo (a decisão de 02/11 foi esperar por ele). A proposta é aplicar a janela agora e recalibrar quando houver export.
- **Também do longo prazo, sem protótipo:** oferecer a revisão do nível aos ~6 meses (a regra do próprio app reclassificaria; pede estado novo e tela) e mostrar o degrau de partida na semana para quem treina com o peso do corpo (pedido ao design).

---

## 3. A revisão cega da proposta

Método em `diagnostico.md`, seção 8. As páginas, as notas e a chave estão em [`revisao-cega/`](revisao-cega/).

| Rodada | Eficiente: hoje → proposta | Adequada | Agradável | Pessoas melhor / igual / pior |
|---|---|---|---|---|
| 1ª (1ª versão da proposta) | 5,56 → 5,93 | 5,80 → 6,37 | 5,35 → 5,67 | 8 / 7 / 3 |
| 2ª (depois dos ajustes) | 5,48 → 6,02 | 5,76 → 6,44 | 5,30 → 5,78 | 9 / 8 / 1 |

**O que a 1ª rodada fez mudar** (e por isso existe a 2ª):
- A Carla (4 focos) tinha ido a 122 séries por semana, com dias de 75 min cravados: os três revisores baixaram a nota de adequação de 7,7 para 6,0. A regra do foco passou a valer só para até 2 grupos; na 2ª rodada a nota dela é igual à de hoje (7,0 · 8,0 · 6,3).
- O Diego (iniciante) tinha recebido elevação de joelhos na barra no lugar do abdominal no chão: a ordem da lista do abdômen foi corrigida.
- Os revisores apontaram pares de bi-set separados na lista, exercício ajoelhado com dor no joelho e flexão sem versão mais fácil: viraram a regra dos pares juntos, o pacote 0 e o pedido de exercício novo.

**2ª rodada, pessoa a pessoa** (média dos 3 revisores; eficiente · adequada · agradável):

| Pessoa | Hoje | Proposta | Diferença na soma das 3 notas |
| --- | --- | --- | ---: |
| Ana | 5,7 · 5,0 · 5,0 | 6,3 · 6,7 · 6,0 | +3,3 |
| Bruno | 5,3 · 6,0 · 5,0 | 5,3 · 6,0 · 5,0 | 0 |
| Carla | 7,0 · 8,0 · 6,3 | 7,0 · 8,0 · 6,3 | 0 |
| Diego | 6,0 · 6,0 · 5,3 | 6,0 · 6,0 · 5,3 | 0 |
| Elisa | 5,0 · 6,0 · 5,0 | 5,0 · 6,0 · 5,0 | 0 |
| Fábio | 6,7 · 7,3 · 6,3 | 6,7 · 7,0 · 6,3 | -0,3 |
| Gilberto | 5,3 · 3,3 · 4,7 | 5,3 · 4,7 · 5,3 | +2,0 |
| Íris | 6,0 · 6,0 · 5,7 | 6,0 · 6,0 · 6,0 | +0,3 |
| Jonas | 5,0 · 5,0 · 5,0 | 6,0 · 6,3 · 6,0 | +3,3 |
| Kátia | 4,3 · 5,0 · 4,3 | 4,3 · 5,0 · 4,3 | 0 |
| Leandro | 6,0 · 5,7 · 5,3 | 6,3 · 7,0 · 6,0 | +2,3 |
| Marina | 5,0 · 5,3 · 6,0 | 6,3 · 6,7 · 6,7 | +3,3 |
| Perfil X1 (iniciante, casa, 2 × 30 min) | 5,7 · 5,3 · 5,7 | 6,3 · 6,0 · 6,0 | +1,7 |
| Perfil X2 (avançado, academia, 5 × 90 min) | 3,7 · 4,0 · 4,7 | 7,0 · 7,7 · 7,0 | +9,3 |
| Perfil X3 (dor 7 no ombro, academia, 4 × 60 min) | 3,7 · 5,3 · 3,3 | 6,0 · 6,7 · 5,0 | +5,3 |
| Perfil X4 (iniciante, sem nada, foco em glúteos) | 5,7 · 6,7 · 5,7 | 5,7 · 6,7 · 5,7 | 0 |
| Perfil X5 (condomínio, foco em peito e costas) | 7,0 · 7,3 · 6,7 | 7,0 · 7,3 · 6,7 | 0 |
| Perfil X6 (avançada, halteres até 12 kg, foco em pernas) | 5,7 · 6,3 · 5,3 | 5,7 · 6,3 · 5,3 | 0 |

**A única pessoa com nota menor** é o Fábio (só barra fixa): 7,3 → 7,0 em adequação, porque um revisor não gostou de o afundo para trás virar búlgaro (que pede um apoio para o pé); outro revisor elogiou a mesma troca. A troca vem da ordem da lista do afundo, sem motivo de treino; na etapa 2 a lista fica com o mais simples na frente e a troca some.

**O critério de pronto da etapa 2 ("nenhuma persona pior") ainda não está cumprido** por causa dele; as médias sobem nas três notas.

**As críticas que continuam nas duas versões:** dor que tira o músculo inteiro (quadríceps a zero com dor no joelho); costas a zero sem equipamento; estímulo fraco para quem é forte e treina com o peso do corpo; duplas e 8 exercícios por dia para o iniciante; isoladores repetidos em vários dias para quem escolhe muitos focos; elevação lateral no dia de pernas.

---

## 4. As perguntas novas do cadastro

Nenhuma pergunta nova é proposta com ganho medido nesta etapa. O que a pesquisa diz de cada dado (`22-pessoas-diferentes-e-cadastro.md`):

| Pergunta | O treino mudaria como? | Evidência | Ganho medido | Recomendação |
|---|---|---|---|---|
| Sexo | Não mudaria | Ganho relativo igual entre os sexos (`refalo2025`, conferido) | — | **Não perguntar.** |
| Peso, altura | Não mudaria; a 1ª série de acerto já calibra os exercícios com o peso do corpo | Sem ensaio de programa diferente | — | **Não perguntar.** |
| "Tenho 60 anos ou mais" (sim ou não, opcional) | Sem duplas de exercícios grandes; o mais estável primeiro por mais tempo; volta de pausa mais lenta | Quase tudo consenso; volume baixo já serve (`radaelli2025`) | **Não medido.** O único sinal é a revisão cega: o Gilberto (67 anos) tem a nota de adequação mais baixa das doze (3,3 hoje; 4,7 na proposta) | **Decisão do Gustavo.** Minha recomendação: não acrescentar agora; medir a regra num protótipo na etapa 2 e só então decidir, porque muda o estado guardado. |
| "Tenho 18 anos ou mais" | O app não deveria montar treino para menor sem supervisão | Posicionamentos pedem supervisão (lidos só no resumo) | Não é ganho de treino; é limite de uso | **Decisão do Gustavo**, com os termos de uso; não é do gerador. |

---

## 5. A biblioteca: o que acrescentar, corrigir e tirar

| O quê | Por quê | Fonte e selo | Efeito |
|---|---|---|---|
| **Corrigir:** os 3 exercícios ajoelhados passam a carregar o joelho | pacote 0 | consenso | 43,1% → 0 dos programas com dor forte no joelho (ponderada) |
| **Acrescentar:** flexão de braço com as mãos num apoio firme (cadeira, banco ou mesa encostada na parede), como degrau mais fácil da flexão | hoje a flexão no chão é o degrau mais baixo e aparece em 84% dos programas da grade; quem não faz 8 repetições não tem para onde descer; os três revisores apontaram | consenso de treinadores; a fração do peso do corpo que a flexão carrega não foi conferida na fonte (`ebben2011`, só o resumo) | não medido (pede exercício novo, ficha e animação: está em `pedidos-a-animacao.md`) |
| **Curar:** a ordem das listas de `funcoes.json` (o exercício de referência primeiro) | pacote 2 | consenso de treinadores | exercício escolhido pelo alfabeto: 93,3% → 0 dos programas |
| **Tirar:** nada | — | — | — |
| **Não acrescentar:** puxar improvisado sem equipamento (mesa, toalha, porta) | recusado em 03/11 por segurança; a pesquisa desta sessão não trouxe nada novo | — | — |

A contagem de exercícios por músculo em cada cenário está em [`medidas/biblioteca.md`](medidas/biblioteca.md): nos cenários comuns não falta exercício para nenhum músculo.

---

## 6. O que a pesquisa sugere e fica fora do escopo (vai para o backlog)

- **Nutrição no objetivo "manter na dieta":** o déficit atrapalha o ganho de músculo (`murphy2022`); o app segue sem prescrever dieta.
- **Atividade aeróbia no objetivo "saúde":** as diretrizes pedem 150 a 300 min por semana; o app segue só dizendo isso.
- **Treino de potência (subir rápido) para 60 anos ou mais:** benefício pequeno e certeza baixa (`balachandran2022`); sem a pergunta de idade, não há a quem aplicar.
- **Semana leve planejada e periodização:** nenhum ensaio mostra ganho; seguem fora.
- **Restrição de fluxo sanguíneo e excêntrica acentuada** para quem tem pouca carga: fora.
- **Triagem com as perguntas de seguimento do PAR-Q+** (liberar hipertensão e doença crônica controladas): depende de profissional e da licença do PAR-Q+; já estava no backlog.

---

## 7. O que não vale a pena mexer agora, e por quê

| Ideia | Por que não |
|---|---|
| Subir o descanso dos exercícios grandes de 1 min 45 s para 2 min ou mais | O consenso da IUSCA pede 2 min; a meta-análise (`singer2024`, conferida) vê benefício pequeno acima de 60 s e nada claro acima de ~90 s. Custaria 2 a 3 min por treino de 60 min, que hoje viram série. Não medido no protótipo. |
| Faixas de repetições diferentes por tipo de exercício | São consenso; de 5 a 30 repetições perto da falha rende parecido. Nada a ganhar mexendo. |
| Metas de séries diferentes por músculo | Só um estudo de panturrilha e um de tríceps. |
| Limite de 6 exercícios para o iniciante, com os dias de hoje | Medido: esquece músculos e solta séries (pacote 4). Precisa de dias próprios. |
| Proibir o bi-set de exercícios grandes ao iniciante | Medido na 1ª versão do protótipo, que tinha a proibição: os treinos de 30 min do iniciante acima do tempo iam de 10,7% para 24,3%; sem ela, ficam em 9,9%. Nenhuma fonte fala de iniciantes. |
| Trocar o agachamento comum por um de uma perna para quem é forte e não tem carga | Medido: outra regra (dois tipos de exercício de coxa na semana) devolve o agachamento comum; o programa quase não muda. Precisa mexer nas duas regras juntas. |
| Variar os exercícios por blocos de semanas | Não rende mais músculo (moderada); as queixas mais citadas de treino "de máquina" são justamente a troca constante. |
| Perguntar sexo, peso ou altura | Nada mudaria no treino. |
| Sugerir compra de equipamento | Decisão do Gustavo de 03/11; a honestidade do aviso (o que falta e o que isso muda) já existe. |

---

## 8. O plano em pacotes

Para quem já usa, cada mudança do gerador mostra "Há uma versão nova do seu programa". Por isso a proposta são **duas entregas**, e não oito:

| Entrega | Pacotes | O que a pessoa vê | Depende de |
|---|---|---|---|
| **A** | 0 (joelho), 1 (tempo e nível), 2 (escolha), 3 (dor, tempo curto, técnicas) e a parte medida do 4 (o iniciante repete) | um programa novo, de uma vez: mais séries para quem tinha tempo sobrando, exercícios mais conhecidos, dias inteiros com dor | decisões 1 a 5 (seção 10); as trocas de exercício pedem cartões ou animações (`pedidos-a-animacao.md`); 2 textos novos (`pedidos-ao-design.md`) |
| **B** | 5 (aviso de "sem melhora"), o resto do 4 (dias próprios do iniciante, flexão mais fácil), o degrau de partida na semana, a revisão do nível | menos avisos repetidos; treino de iniciante mais enxuto | export do uso real; exercício novo com animação; estado guardado novo (migração e teste) |

Ordem dentro da entrega A, uma regra por vez, cada uma com `regras.md` primeiro, depois o teste, o código e a medida: joelho → usa-tempo → escolha → sem-repetir → fadiga → dor → curto → tecnicas → iniciante-simples. A ordem não é livre: medidas sozinhas, três regras pioram algum defeito que outra conserta (a `escolha` precisa da `usa-tempo` antes; a `dor`, da `sem-repetir`; a `tecnicas`, da `curto`, e mesmo assim sobra a piora com 3 dias por semana). Na etapa 2, a medida de cada passo é a soma das regras já ligadas, e uma regra que piore algum grupo nessa soma não entra.

**Antes de a entrega A ficar pronta, falta zerar no protótipo:** as pioras pequenas de dois defeitos de equilíbrio em alguns grupos (empurrar ÷ puxar: +0,1 a +0,4 ponto; frente ÷ trás da coxa: +0,1 a +0,6 ponto com dor forte no quadril), o dia acima do tempo com 3 dias (4,9% → 5,2%) e a nota do Fábio. O critério de pronto da etapa 2 é nenhum defeito pior em nenhum grupo, e ele ainda não fecha: na medida de todas as regras juntas, sobem 33 pares defeito × grupo: D3 em dor quadril 7 (1,8% → 2,4%); D1 em foco peito (3,6% → 4,0%); A3 em dias 3 (4,9% → 5,2%); D1 em grupo persona (0,7% → 0,9%); D1 em dor quadril 7 (0,4% → 0,6%); D3 em min 30 (0,5% → 0,7%); D1 em dias 3 (1,0% → 1,2%); B1 em dor joelho 7 (0,0% → 0,2%); D3 em grupo atalho (0,5% → 0,6%); D3 em grupo persona (0,4% → 0,5%); B1 em dias 5 (0,0% → 0,1%); D1 em min 60 (0,3% → 0,4%); D3 em grupo par (0,3% → 0,4%); D1 em dor lombar 7 (0,6% → 0,7%); D3 em foco superiores (0,1% → 0,2%); D3 em foco nenhum (0,1% → 0,2%); D3 em foco gluteos (0,1% → 0,2%); D3 em foco bracos (0,1% → 0,2%); C1 em foco inferiores (3,0% → 3,1%); D3 em dias 5 (0,0% → 0,1%); D3 em dias 4 (0,0% → 0,1%); D1 em nivel avancado (0,7% → 0,8%); D1 em dor joelho 7 (0,4% → 0,5%); D1 em foco superiores (1,1% → 1,2%); D1 em min 45 (0,5% → 0,6%); D1 em grupo atalho (0,7% → 0,8%); B1 em dias 4 (0,0% → 0,1%); D1 em dias 5 (0,0% → 0,1%); D1 em dias 4 (0,1% → 0,1%); D1 em dor lombar 4 (0,7% → 0,8%); D1 em grupo par (0,7% → 0,8%); D1 em todos (0,5% → 0,6%); D1 em dor tornozelo 7 (0,6% → 0,6%).

---

## 9. A revisão por um profissional de Educação Física

**Recomendo fazer, antes de abrir o app a desconhecidos, e com uma pauta fechada.** Hoje está "de lado" desde 01/11. O que mudou: esta sessão chegou ao limite do que dá para decidir só com literatura e revisores simulados. Os itens abaixo são exatamente os que a pesquisa não resolve e que mexem com segurança:

1. **Dor acima de 5:** tirar tudo o que carrega a articulação (hoje) ou trocar por variações que costumam ser toleradas (amplitude menor, cadeia fechada, isometria)? A pesquisa acha base para a troca em dor crônica e estável, com fisioterapeuta (`smith2017`); para um app sem profissional, não há ensaio. Com dor 7 no joelho, o quadríceps fica com zero séries.
2. **Quais exercícios carregam cada articulação:** os ajoelhados (pacote 0), a panturrilha no leg press com dor no joelho, o agachamento com a barra nas costas e a rosca Scott com dor no ombro.
3. **A triagem:** o bloqueio do app (pressão alta, doença crônica, remédio contínuo, gravidez) é mais rígido que o PAR-Q+ 2025; afrouxar depende de profissional e da licença do PAR-Q+.
4. **O iniciante e a pessoa de 60 anos ou mais:** duplas de exercícios grandes, barra fixa só na descida, flexão nórdica sem apoio, búlgaro.
5. **A lista de verificação de um bom treinador** (`25-treinadores-e-aplicativos.md`, 25 itens) e as doze pessoas-exemplo: um profissional de verdade lê as 24 semanas em 2 horas.

Um profissional de Educação Física cobre os itens 2, 4 e 5; os itens 1 e 3 pedem também um fisioterapeuta ou médico. **As entregas A e B não dependem disso**, porque nenhuma afrouxa a segurança (o pacote 0 aperta).

---

## 10. As decisões que dependem do Gustavo

Uma por vez, com a minha recomendação; nada vem marcado.

1. **O tempo que sobra vira série para todos (pacote 1)?** Reabre a decisão de 07/11. *Recomendo sim.* É a mudança com a melhor base (direção robusta) e o maior efeito medido; veja a Marina e o Perfil X2 nos exemplos.
2. **Os exercícios de referência entram mesmo sem animação (pacote 2)?** Até as animações chegarem, a puxada no puxador, o hip thrust e outros aparecem como cartão de texto. *Recomendo sim, junto com o pedido à animação.* A alternativa é segurar o pacote 2 até as animações ficarem prontas.
3. **Os exercícios ajoelhados saem com dor forte no joelho (pacote 0)?** *Recomendo sim, já.*
4. **Com dor forte, a semana vira corpo todo quando um dia ficaria quase vazio (pacote 3)?** *Recomendo sim.* Veja o Perfil X3: dois dias de 12 min viram quatro dias de 43 a 51 min.
5. **O iniciante sem drop set e repetindo exercícios (pacotes 3 e 4)?** *Recomendo sim.* O limite de exercícios por dia fica para a entrega B.
6. **O aviso de "sem melhora" com a janela pelo nível (pacote 5): aplicar agora ou esperar o export do seu uso?** *Recomendo aplicar a janela 4, 8 e 16 agora e recalibrar com o export.* Se você já tem algumas semanas de uso, `npm run ler-export` mostra quantas vezes o aviso apareceu para você.
7. **A pergunta "tenho 60 anos ou mais"?** *Recomendo não agora:* medir a regra no protótipo antes (entrega B).
8. **A revisão por um profissional antes de abrir a desconhecidos?** *Recomendo sim, com a pauta da seção 9.*
9. **Duas entregas (A e B) ou outra ordem?** *Recomendo A inteira primeiro.*

Lembrete para a hora de levar à `main`: exportar os dados do app antes (Meus dados → Exportar), porque o programa de quem já usa muda.

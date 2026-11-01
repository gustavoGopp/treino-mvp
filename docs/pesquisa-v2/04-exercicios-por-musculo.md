# 4. Escolha dos exercícios, músculo por músculo (tema T3)

> Pesquisa de 01/11/2026. Todo estudo citado teve o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID); o texto completo não foi lido. Os selos seguem `docs/pesquisa/00-metodo.md`.
>
> **Objetivo:** trocar as "vagas" e a "ordem" copiadas do programa de referência (`src/domain/gerador/divisoes.ts` e o campo `ordem` da biblioteca) por regras de escolha com base. **Até aqui, a escolha era cópia do programa de referência, e não pesquisa.**

## 1. O que vale para todos os músculos

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Equipamento não decide o crescimento** | Máquina e peso livre: mesmo ganho de força e de tamanho. Um ensaio grande com 8 exercícios mediu cada músculo e achou diferença ≤ 2% entre os dois tipos, sem mais dor articular. | robusta | Haugen 2023 (PMID 37582807); Hernández-Belmonte et al. 2023, *Med Sci Sports Exerc* (37535335); ACSM 2026 (41843416) |
| **Unilateral ou bilateral** | Mesmo crescimento; a força segue a especificidade (cresce mais no tipo treinado). | moderada (meta-análise com poucos estudos) | Kassiano et al. 2025, *Sports Med* (39794667) |
| **Músculo alongado** | Em vários músculos, treinar na posição em que o músculo fica mais alongado cresceu mais. Exemplos abaixo: tríceps, posteriores, panturrilha, reto femoral. Uma revisão narrativa descreve o mecanismo. | moderada (o mesmo grupo de pesquisa, resultados coerentes em vários músculos; amostras pequenas) | ver cada músculo; revisão narrativa (37556026) |
| **Parcial alongada × amplitude completa** | Em treinados, deu resultado parecido nos braços. A recomendação é **enfatizar a posição alongada**, pela amplitude completa ou por parciais na parte alongada. | um estudo | Wolf et al. 2025 (39959841) |
| **Multiarticular basta?** | Em homens treinados, acrescentar rosca e tríceps a um programa só de multiarticulares não aumentou o tamanho dos braços em 8 semanas. Mas alguns músculos **só crescem bem com o isolador** certo (reto femoral, cabeça longa do tríceps, gastrocnêmio). | um estudo (para os braços); moderada (para os isoladores específicos) | de França et al. 2015 (26244600); ver os músculos |
| **Variar** | Variar de forma sistemática ajuda o crescimento regional; variar demais e ao acaso pode atrapalhar. | moderada (revisão) | Kassiano 2022 (35438660) |

**Consequência para o gerador** **[opinião, a partir da tabela]**:
- a vaga deixa de pedir um equipamento e passa a pedir uma **função**: o padrão de movimento e, quando houver evidência, a **posição alongada**;
- o equipamento só entra para dizer o que é possível;
- entre opções equivalentes, a escolha vai por estabilidade (para iniciante), carga disponível e variedade entre os dias.

## 2. Músculo por músculo

Legenda da coluna "Ordem de preferência": a lista é **por função**; o exercício concreto sai do equipamento que a pessoa tem. "≈" quer dizer equivalentes.

| Músculo | Ordem de preferência (por função) | Base | Selo |
|---|---|---|---|
| **Peito** | 1) empurrar horizontal (supino com halteres, barra ou máquina ≈ flexão de braço com carga equivalente); 2) empurrar **inclinado** como 2º exercício da semana; 3) crucifixo ou voador (posição alongada) como complemento | O supino inclinado cresceu mais a parte de cima do peitoral em iniciantes (Chaves et al. 2020, 32922646). Flexão ≈ supino com carga de ~40% de 1RM (Kikuchi & Nakazato 2017, 29541130). Para o crucifixo, não achei ensaio de hipertrofia: é consenso. | um estudo; consenso para o crucifixo |
| **Costas** | 1) puxar vertical (barra fixa, puxada; pegadas equivalentes, ver `docs/pesquisa/08-tecnica-guia.md`); 2) puxar horizontal (remada apoiada, na polia ou na máquina); idealmente 1 de cada por semana | Não achei ensaio de hipertrofia comparando puxada e remada; a base é a EMG e a anatomia. A pegada da puxada mudou a ativação, não o crescimento medido (24662157, EMG). | consenso |
| **Ombro anterior** | Normalmente já coberto pelos empurrares (série indireta = 0,5); desenvolvimento como opção quando o ombro é prioridade | Contagem fracionada (Pelland 2026, 41343037) | moderada (a contagem); consenso (dispensar isolador) |
| **Ombro lateral** | Elevação lateral com halter ≈ na polia ≈ no elástico | Halter e polia deram crescimento igual em treinados (Larsen et al. 2025, *Front Physiol*, 40692697) | um estudo |
| **Ombro posterior** | Crucifixo invertido (halter, polia, voador invertido) ou face pull; também recebe série indireta das remadas | Não achei ensaio de hipertrofia; é consenso | consenso |
| **Bíceps** | 1) rosca com o braço **à frente do corpo** (Scott, ou rosca na polia por trás) **ou** rosca inclinada (braço atrás do corpo); alternar entre os blocos de semanas; 2) também recebe série indireta das puxadas | Inclinada × Scott: o crescimento total dos flexores foi igual, com diferenças pequenas por músculo (o braquial e o braquiorradial cresceram um pouco mais na Scott) (Kobayashi et al. 2026, *J Sports Sci*, 42829982). A Scott cresceu a região distal do braço em mulheres treinadas (Zabaleta-Korta et al. 2023, 37559762). | um estudo cada |
| **Tríceps** | 1) extensão de cotovelo com o **braço acima da cabeça** (francês com halter, na polia por trás, elástico); 2) tríceps na polia com o braço ao lado do corpo como complemento; 3) série indireta dos empurrares | Acima da cabeça cresceu **muito mais**, sobretudo a cabeça longa, mesmo com carga menor (Maeo et al. 2023, *Eur J Sport Sci*, 35819335) | um estudo (efeito grande) |
| **Quadríceps** | 1) agachar (agachamento livre **profundo**, leg press, hack, goblet, búlgaro); 2) **cadeira extensora** sempre que houver, para o reto femoral | O leg press cresceu os vastos tanto quanto a extensora, e ainda o glúteo e o adutor; mas **a extensora é essencial para o reto femoral** (Kinoshita et al. 2026, *Med Sci Sports Exerc*, 41630124). O agachamento completo cresceu mais o glúteo e o adutor do que o meio agachamento, e nenhum dos dois cresceu o reto femoral (Kubo et al. 2019, *Eur J Appl Physiol*, 31230110). No leg press, a amplitude do joelho não mudou o crescimento do quadríceps em treinados (Larsen et al. 2025, 40113586). | um estudo cada (coerentes entre si) |
| **Posteriores da coxa** | 1) **flexão de joelho sentada** (cadeira flexora) > deitada; 2) dobrar o quadril (stiff, terra romeno) como 2º exercício; a flexão de joelho na bola ou no elástico quando não há máquina | A flexora sentada cresceu mais que a deitada: +14% × +9% (Maeo et al. 2021, *Med Sci Sports Exerc*, 33009197). Stiff e nórdico crescem partes diferentes dos posteriores, e os autores recomendam ter os dois tipos, flexão de joelho e extensão de quadril (Morin et al. 2025, 40644669). | um estudo cada |
| **Glúteos** | 1) agachar **profundo** ou afundo; 2) hip thrust ou ponte como opção de glúteo com pouca carga no joelho; 3) abdução (máquina ou polia) como complemento para o glúteo médio | Hip thrust ≈ agachamento para o glúteo; o agachamento cresceu mais o quadríceps e o adutor (Plotkin et al. 2023, 37877099). O agachamento completo cresceu mais o glúteo que o meio agachamento (Kubo 2019). O leg press também cresce o glúteo (Kinoshita 2026). Para abdução, não achei ensaio de hipertrofia: é consenso. | um estudo cada; consenso para a abdução |
| **Panturrilha** | **Panturrilha em pé** (máquina, step, leg press, unilateral com halter), com ênfase na parte alongada (calcanhar bem abaixo); a sentada só como complemento para o sóleo | A em pé cresceu muito mais o gastrocnêmio: +9% a +12% × +1% a +2% na sentada (Kinoshita et al. 2023, *Front Physiol*, 38156065). A parcial na parte alongada cresceu mais que a amplitude completa em mulheres jovens (Kassiano et al. 2023, *J Strength Cond Res*, 37015016). | um estudo cada (efeito grande e coerente) |
| **Abdômen** | Flexão de tronco com carga (crunch na polia, no chão, no banco declinado) | Não achei ensaio de hipertrofia de abdômen que sirva aqui; é consenso. | consenso |

## 3. Quantos exercícios e como montar a semana

| Regra proposta | Valor | Selo | Base |
|---|---|---|---|
| `selecao.funcao-da-vaga` | A vaga pede padrão de movimento + função (ex.: "extensão de cotovelo com o braço acima da cabeça"), nunca um equipamento | consenso (decisão do projeto, apoiada na equivalência de equipamentos) | seção 1 |
| `selecao.alongado` | Quando houver opção com o músculo mais alongado e evidência para aquele músculo, ela vem primeiro: tríceps acima da cabeça, flexora sentada, panturrilha em pé, extensora para o reto femoral | moderada | seção 2 |
| `selecao.exercicios-por-musculo` | Músculos grandes (peito, costas, quadríceps, posteriores, glúteos): 2 exercícios diferentes por semana, de funções complementares (ex.: costas = puxar vertical + puxar horizontal; posteriores = flexão de joelho + dobrar o quadril). Músculos pequenos: 1 exercício por semana basta; 2 se forem prioridade. | consenso, apoiado em Kassiano 2022 e Morin 2025 | variação sistemática |
| `selecao.isolador-obrigatorio` | Quando o equipamento permite, entra o isolador que cobre o que os multiarticulares não cobrem: **extensora** (reto femoral), **tríceps acima da cabeça** (cabeça longa), **panturrilha em pé** (gastrocnêmio) | moderada | Kinoshita 2026, Maeo 2023, Kinoshita 2023, Kubo 2019 |
| `selecao.series-por-exercicio` | 2 a 4 séries por exercício por sessão; mais que isso, melhor dividir em 2 exercícios ou 2 dias | consenso; respeita o teto de ~10 séries por músculo por sessão | `volume.sessao.teto`; a regra atual `volume.series-por-exercicio` |
| `selecao.equivalencia` | Exercícios da mesma função e do mesmo músculo são **alternativas** entre si (aparelho ocupado, dor, preferência); entre eles, unilateral = bilateral e máquina = peso livre | robusta (equipamento); moderada (unilateral) | Haugen 2023; Hernández-Belmonte 2023; Kassiano 2025 |
| `selecao.manter-no-bloco` | Mantém os exercícios por 4 a 8 semanas; ao trocar de bloco, varia dentro da mesma função (ex.: inclinada ↔ Scott para o bíceps) | moderada | Kassiano 2022 (já é a regra `selecao.variacao`) |

## 4. O que muda no app
1. **Os modelos de dia** (`divisoes.ts`) passam a ser listas de **funções**, não de vagas copiadas. Para a divisão superior/inferior, por exemplo:
   - superior = empurrar horizontal, puxar vertical, puxar horizontal, elevação lateral, tríceps acima da cabeça, bíceps;
   - inferior = agachar, flexão de joelho sentada, dobrar o quadril, extensora, panturrilha em pé, abdômen.

   O que cabe depende dos minutos (tema T4).
2. **O campo `ordem`** da biblioteca deixa de ser uma preferência fixa herdada. Ele é substituído por `selecao.alongado`, pela estabilidade (só para iniciante), pela carga disponível e pela variedade entre os dias.
3. **Exercícios a acrescentar** (vão para o T7):
   - tríceps acima da cabeça na polia (já existe como "tríceps francês na polia");
   - rosca Scott;
   - panturrilha em pé na máquina;
   - abdução de quadril;
   - hip thrust;
   - agachamento livre profundo;
   - hack;
   - voador.
4. **Personas a revisar:** a Ana ganha extensora? Não, porque ela não tem a máquina; o gerador explica a lacuna. A Carla ganha extensora, flexora sentada e panturrilha em pé (hoje a extensora nunca aparece).

## 5. O que fica sem resposta
- Para costas, ombro posterior, crucifixo de peito e abdômen **não achei ensaio de hipertrofia** comparando exercícios. Fica consenso, com o selo dizendo isso.
- Quase tudo vem de estudos pequenos (10 a 30 pessoas), de 8 a 12 semanas, e muitos de um mesmo grupo de pesquisa (Maeo e colegas). Os resultados são coerentes, mas faltam réplicas independentes.
- Os estudos de músculo alongado foram feitos sobretudo com pessoas não treinadas ou pouco treinadas. O efeito em treinados pode ser menor (Wolf 2025 achou parcial ≈ completa em treinados).

## 6. Mudanças propostas para `regras.md` (só com aprovação)
- **Novas:** `selecao.funcao-da-vaga`, `selecao.alongado`, `selecao.exercicios-por-musculo`, `selecao.isolador-obrigatorio`, `selecao.equivalencia`.
- **Revistas:**
  - `selecao.variacao`, que passa a citar a variação dentro da mesma função;
  - `volume.series-por-exercicio`, que passa a ser 2 a 4.
- **Fontes novas para `fontes.md`, com status resumo-PubMed:**
  - Hernández-Belmonte 2023 (37535335);
  - Kassiano 2025 (39794667);
  - Chaves 2020 (32922646);
  - Kikuchi & Nakazato 2017 (29541130);
  - Larsen 2025, elevação lateral (40692697), e Larsen 2025, leg press (40113586);
  - Kobayashi 2026 (42829982);
  - Zabaleta-Korta 2023 (37559762);
  - Maeo 2023 (35819335);
  - Kinoshita 2026 (41630124) e Kinoshita 2023 (38156065);
  - Kubo 2019 (31230110);
  - Morin 2025 (40644669);
  - Kassiano 2023 (37015016);
  - de França 2015 (26244600);
  - revisão narrativa sobre posição alongada (37556026).

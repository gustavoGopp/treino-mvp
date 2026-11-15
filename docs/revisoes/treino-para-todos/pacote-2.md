# Pacote 2: a escolha entre exercícios equivalentes

> Sessão "treino para todos", etapa 2 (15/11/2026). **Está no ramo `claude/nifty-albattani-mltt95`, não na `main`.** Parado aqui para a revisão do Gustavo. Todas as pessoas são fictícias. As notas da revisão cega são de revisores simulados no papel de treinadores: opinião, não evidência. "Grade" = cada combinação vale igual; "ponderada" = as combinações mais prováveis valem mais (os pesos são estimativa).

## 1. O que mudou

O problema: entre exercícios que servem para a mesma vaga, o app escolhia o que tem animação e, no empate, o primeiro pela ordem alfabética. Na academia completa, o 1º exercício de puxar saía "puxada unilateral ajoelhado na polia alta" em vez da puxada comum no puxador.

Entraram quatro regras, uma por vez (regra escrita em `docs/pesquisa/regras.md`, teste, código, medida):

| # | Regra | O que faz | Selo |
| --- | --- | --- | --- |
| 1 | `selecao.funcao-da-vaga`: a ordem de referência | No empate total, vale a ordem da lista da função (o exercício mais comum e mais simples de montar primeiro), e não a alfabética. A ordem das listas de `funcoes.json` virou dado curado; quatro listas mudaram de ordem (puxar de cima, flexão de braço, afundo, abdômen). | costume de treinador |
| 2 | `selecao.funcao-da-vaga`: dois lados antes de um lado só | Em máquina, polia ou barra, o exercício de dois lados vem antes do de um lado só (a série leva metade do tempo). Com halter ou kettlebell nada muda; e o de um lado só não perde lugar quando carrega uma região com dor leve, nem quando a pessoa marcou "prefiro este". | costume; a pesquisa não achou diferença de resultado entre um lado e dois (`kassiano2025`) |
| 3 | `selecao.lombar-no-dia` (regra nova) | Depois de um exercício que carrega a lombar sem apoio, o próximo exercício de tronco que também carrega fica por último entre os do mesmo nível (os de perna, depois de dois). Só ordena: havendo outro, entra o apoiado. | costume, sem ensaio |
| 4 | `volume.prioridade.foco-primeiro`: a trava do empurrar | Nem o empurrar do foco sobe uma série se isso levar empurrar ÷ puxar acima de 1,5: as costas e o ombro de trás sobem antes. | moderada (`kolber2010`) para a razão; a trava é escolha do projeto |

A regra 4 não estava na proposta. Entrou porque as regras 1 e 2 a pediram: o exercício mais rápido abria tempo no dia, o supino do foco subia uma série sozinho e a razão passava de 1,5.

**O que é ciência, o que é costume e o que é aposta.** Nenhuma das três regras de escolha tem ensaio a favor: a pesquisa não achou diferença de resultado entre exercícios equivalentes (máquina × peso livre, um lado × dois lados). O ganho é de tempo, de simplicidade e de o programa parecer feito por um treinador. A aposta é que isso pesa mais do que ter a animação: os exercícios de referência que entram são, hoje, cartão de texto.

## 2. O antes e o depois, em pessoas

O "antes" é o ramo depois do pacote 3. Das doze personas, sete mudam; Diego, Elisa, Fábio, Íris e Kátia (elásticos, peso do corpo, casa) ficam iguais.

- **Carla (avançada, academia completa, 5 dias).** No dia de Superior, sai a puxada unilateral ajoelhado e entra a puxada pela frente no puxador; no de Empurrar, sai a elevação lateral de um lado só na polia e entra a com halteres, e sai o crucifixo com halteres e entra o voador; no de Pernas, sai o coice na máquina e entra o hip thrust. Os dias de Superior e Empurrar ficam 4 e 2 min mais curtos.
- **Marina (intermediária, academia, 4 dias de 60 min).** Puxada pela frente no lugar da unilateral ajoelhado; hip thrust no lugar do coice na máquina; elevação lateral com halteres; rosca Scott no lugar da rosca na máquina.
- **Jonas (30 min).** A puxada pela frente no lugar da unilateral ajoelhado: o dia vai de 34 para 31 min (cabe no tempo).
- **Bruno (prédio com polia dupla, sem puxador).** Como não tem puxador, a puxada passa a ser a ajoelhado com barra reta (dois lados) nos dois dias de Superior; o agachamento goblet entra no lugar do búlgaro na vaga de agachar.
- **Ana e Gilberto (halteres em casa).** Goblet no lugar do búlgaro na vaga de agachar; o Gilberto troca o abdominal na bola pelo abdominal no chão.
- **Leandro (iniciante, academia).** Voador no lugar do crucifixo com halteres; voador invertido no lugar do crucifixo inverso com halteres.
- **O Fábio (só peso do corpo)** fica com o afundo e o afundo para trás, e não com o búlgaro: era a pessoa que piorava (−0,3) no protótipo da etapa 1, por causa da ordem da lista do afundo sem carga, que foi curada.

A lista completa, dia por dia, está em [`exemplos/README.md`](exemplos/README.md).

## 3. O antes e o depois, medido

680.625 programas (`medidas/pacote-2/retrato.md`). Comparação com o ramo depois do pacote 3 e com a `main` medida com a régua de agora.

| | `main` | pacote 3 | **pacote 2** |
| --- | ---: | ---: | ---: |
| Régua oficial: programas sem nenhum defeito (grade) | 79,4% | 90,6% | **90,7%** |
| Idem (ponderada) | 78,1% | 96,4% | **96,8%** |
| Pior grupo | dor 7 no cotovelo: 50,0% | 30 min: 72,9% | **30 min: 73,4%** |
| Dia mais longo acima de 110% do tempo (A3), programas | 27.039 | 24.312 | **23.465** |
| Dia fraco: menos de 3 exercícios ou sem exercício grande (A2) | 71.999 | 29.159 | **29.089** |
| Empurrar ÷ puxar acima de 1,5 (D1) | 3.606 | 3.491 | **3.340** |
| Foco abaixo da meta com tempo e exercício (C1) | 11.864 | 10.168 | **10.212** |
| Mesmo exercício em todos os dias havendo outro (B1) | 2.646 | 0 | **0** |
| Segurança (exercício que não devia entrar) | 7.773 | 0 | **0** |

O que a escolha em si muda (notas dos 20 cuidados; pacote 3 → pacote 2, grade e ponderada):

| Cuidado | grade | ponderada |
| --- | ---: | ---: |
| Exercício escolhido pela ordem alfabética, com um equivalente sem uso | 73,4% → 0,0% | 93,2% → 0,0% |
| Exercício escolhido por ter animação, com um equivalente sem uso | 31,6% → 30,4% | 82,0% → 80,0% |
| Dois exercícios seguidos que carregam a lombar sem apoio | 10,6% → 8,8% | 29,5% → 19,3% |
| Três exercícios ou mais no dia que carregam a lombar sem apoio | 4,0% → 0,7% | 4,6% → 0,6% |
| Dois exercícios da mesma função no mesmo dia | 29,4% → 28,0% | 13,8% → 10,7% |
| O exercício mais técnico não é o 1º da sua região | 12,4% → 12,5% | 9,9% → 11,0% |

Cada regra, medida sozinha por cima da anterior (programas com o defeito, em 680.625):

| Regra | A3 (acima do tempo) | A2 (dia fraco) | D1 (empurrar ÷ puxar) | C1 (foco abaixo da meta) |
| --- | ---: | ---: | ---: | ---: |
| 1. Ordem de referência | −397 | −30 | +41 | +28 |
| 2 e 3. Dois lados (versão estreita) e lombar | −450 | −6 | −13 | +16 |
| 4. Trava do empurrar | 0 | −34 | −179 | 0 |
| **Pacote inteiro** | **−847** | **−70** | **−151** | **+44** |

(A regra 3, medida sozinha sobre a versão larga da regra 2: A3 −82 e nenhum par grupo × defeito pior.)

### O que piora, com o tamanho

O critério da etapa 2 é "nenhum defeito pior que na `main` em nenhum grupo". No total todos os defeitos caem frente à `main`; por grupo, **19 pares grupo × defeito ficam acima da `main`**, e 242 ficam abaixo. Os maiores:

| Grupo | Defeito | `main` → pacote 2 | Tamanho do grupo |
| --- | --- | ---: | ---: |
| Avançado, 2 dias | C1 (foco abaixo da meta com tempo) | 2.000 → 2.028 (+28) | 45.375 |
| Cenários de dois aparelhos | D1 (empurrar ÷ puxar) | 366 → 385 (+19) | 49.500 |
| Cenários das personas | D1 | 525 → 541 (+16) | 74.250 |
| Intermediário, 2 dias | C1 | 643 → 652 (+9) | 45.375 |
| Cada situação de dor leve e sem dor | C1 | 641 → 647 (+6) | 45.375 |

Os outros são de +1 a +5 programas. Frente ao pacote 3 (e não à `main`), quem treina 2 dias tem D1 em mais 65 programas (1.955 → 2.020 de 136.125) e C1 em mais 54.

**O que são esses casos.**
- **C1 (+44 no total).** São programas em que o foco **já** estava abaixo da meta (quase sempre o avançado que quer peito em 2 dias de 75 ou 90 min, com os exercícios de peito já em 4 séries e o dia já com o máximo de exercícios). O dia ficou 2 a 7 min mais curto com os exercícios de dois lados, passou para baixo de 85% do tempo, e a régua começou a contar "havia tempo". As séries do foco são as mesmas. Exemplo: avançado, academia, 2 dias de 90 min, quer peito: o dia A vai de 79 para 73 min, com as mesmas 12 séries de peito.
- **D1 em 2 dias (+65 frente ao pacote 3).** O exercício mais rápido abre tempo, a distribuição inicial das séries dá a 4ª série ao supino do foco, e a puxada fica com 2. A regra 4 segura isso no laço das séries (−179 programas), mas não na distribuição inicial. Exemplo: intermediário, condomínio, 2 dias de 45 min, quer peito: supino 3 → 4 séries, puxada 3 → 2.

Os dois ficam no backlog com o número (uma trava da razão na distribuição inicial; e o 4º exercício do foco quando há tempo).

## 4. O que foi medido e não entrou

- **"Para o iniciante, o exercício mais simples primeiro" (`esc-simples`).** Medida em 23.470 programas (1 a cada 29), por cima do app: iniciante com mais de 12 exercícios diferentes na semana cai em 300 programas, mas aparecem 4 programas com dia fraco (iniciante com dor forte no quadril: a flexão de joelho com elástico, mais simples, entra no lugar da flexão na bola, o glúteo fica sem nenhuma série e a semana de corpo todo deixa de ser aceita) e 1 com empurrar ÷ puxar acima de 1,5. E troca o que o iniciante vê (medido na 1ª versão da regra): o supino com halteres (animado) sai de 48% dos programas de iniciante (ponderada) para entrar o supino na máquina e o voador (cartões de texto); os cartões por dia do iniciante vão de 2,34 para 2,51. **Não entrou: piora um defeito num grupo e tira animação de quem mais precisa dela.** Fica para o pacote do iniciante, com decisão do Gustavo.
- **A regra 2 na versão larga** (qualquer exercício com carga a partir de 20 kg). Dava mais ganho de tempo (A3 −1.243 no pacote, em vez de −847), mas a revisão cega mostrou duas pessoas piores (seção 5) e o C1 subia 79 em vez de 44. Trocada pela versão estreita.
- **Poupar a série de puxar no corte de tempo** (`corte-puxar`). Em 23.470 programas, só 20 mudam e 1 deixa de ter D1: o caminho do D1 em 2 dias não é o corte. Não entrou.

## 5. A revisão cega

Doze pessoas, a semana do pacote 3 e a de agora, 24 páginas embaralhadas, três revisores (eficiência; adequação e segurança; "treinador ou máquina"). **A comparação é com o pacote 3, para isolar este pacote** (nos pacotes anteriores foi com a `main`). Páginas, chave e notas em [`revisao-cega/pacote-2/`](revisao-cega/pacote-2/).

**Rodada 1 (regra 2 na versão larga).** Médias: eficiente 6,35 → 6,53; adequada 6,53 → 6,74; agradável 6,10 → 6,36. Duas pessoas piores:
- a intermediária com **dor leve na lombar** (−1,0 na soma das três notas): recebia o terra romeno com barra no lugar do stiff de um lado só;
- o avançado com **halteres de até 20 kg, sem banco** (−0,3): perdia o stiff de um lado só, que fazia os 20 kg renderem.

As duas vinham da regra 2. Ela foi estreitada (só máquina, polia e barra; nunca contra a dor leve) e a revisão foi refeita.

**Rodada 2 (versão final).** Soma das três notas, média dos três revisores:

| Pessoa | Antes | Depois | Diferença |
| --- | ---: | ---: | ---: |
| Iniciante, academia, 3 dias de 60 min | 18,7 | 20,0 | +1,3 |
| Iniciante, academia, 4 dias de 45 min, quer glúteos | 19,0 | 20,7 | +1,7 |
| Intermediária, academia, 4 dias de 60 min, quer glúteos e pernas | 17,7 | 19,7 | +2,0 |
| Intermediário, academia, 5 dias de 60 min | 21,3 | 22,0 | +0,7 |
| Avançado, academia, 6 dias de 75 min, quer peito e costas | 20,0 | 20,7 | +0,7 |
| Avançado, academia, 2 dias de 90 min, quer peito | 16,7 | 16,7 | 0,0 |
| Intermediária, condomínio, 3 dias de 45 min | 18,3 | 18,0 | −0,3 |
| Iniciante, condomínio, 3 dias de 45 min | 17,0 | 19,0 | +2,0 |
| Intermediário, casa com halteres e elásticos, 4 dias de 45 min | 18,0 | 18,0 | 0,0 |
| Intermediária, academia, 4 dias de 60 min, dor leve na lombar | 17,7 | 17,3 | −0,3 |
| Avançado, só halteres de 2 a 20 kg, 4 dias de 60 min | 19,0 | 19,0 | 0,0 |
| Intermediário, só peso do corpo, 3 dias de 45 min | 12,7 | 12,7 | 0,0 (páginas iguais) |

Médias: eficiente 5,94 → 6,06; adequada 6,31 → 6,61; agradável 5,75 → 5,97. **Duas pessoas ficam 0,3 abaixo** (uma nota de um revisor, de um ponto):
- a intermediária do condomínio: a única troca é o goblet no lugar do búlgaro e o abdominal no chão no lugar do da bola; o revisor que baixou a nota pediu, na página de antes, exatamente "trocar o búlgaro por goblet". Leio como ruído;
- a intermediária com dor leve na lombar: o hip thrust (4 séries) entrou no lugar do coice na máquina, e os revisores somaram o hip thrust ao stiff como "carga na lombar". A biblioteca não marca a lombar no hip thrust. **Fica como dúvida aberta** (decisão 3).

A regra 4 entrou depois da rodada 2 e não muda a semana de nenhuma das doze pessoas (conferido página a página).

O que os três revisores continuam apontando, e que não é deste pacote: tempo sobrando para o avançado de 2 dias; iniciante com 8 exercícios de 2 séries; pares estranhos; dor leve na lombar que não reduz o stiff; peso do corpo sem nenhum exercício de puxar.

## 6. O guia: mais cartões de texto

É o custo combinado na decisão de 15/11. Medido em 23.470 programas, pacote 3 → pacote 2:

| | grade | ponderada |
| --- | ---: | ---: |
| Programas com algum exercício trocado | 19,4% | 70,3% |
| Cartões de texto por dia (média) | 0,74 → 0,76 | 1,92 → 2,04 |
| Programas com um dia de 3 cartões ou mais | 14,6% → 14,8% | 62,8% → 63,4% |

Os que mais entram (ponderada): puxada pela frente (37,1% dos programas), hip thrust (29,8%), voador (22,3%), agachamento goblet (19,9%, animado), leg press (18,4%), rosca Scott (16,5%). O pedido à animação foi atualizado com essa ordem (`pedidos-a-animacao.md`).

## 7. Os registros de teste que mudaram (regravados em 15/11/2026, com o ok do Gustavo)

Sete registros de programa (snapshots) acusavam a mudança e **foram regravados depois do "sim, pode regravar" do Gustavo** (só esses sete; conferido): os programas do Bruno, da Ana e da Carla; os três do retorno de 30 dias (Ana, Carla, Bruno na academia do bairro); e os 4 dias do Bruno no 2º local. O conteúdo da mudança é o da seção 2.

Dezoito testes antigos usavam um exercício trocado como exemplo (o búlgaro na vaga de agachar, a puxada unilateral do Bruno, o hack "pela ordem alfabética"). Foram ajustados para provar a mesma coisa com o exercício de agora, sem apagar nenhuma verificação; um por um em [`testes-ajustados-pacote-2.md`](testes-ajustados-pacote-2.md). Um efeito real que apareceu nesse ajuste: **para o Bruno, a sugestão de semana leve chega uma semana mais cedo** (os dois dias de Superior passam a repetir quatro exercícios, e quem não progride chega aos "3 treinos sem progresso" na 2ª semana, e não na 3ª).

## 8. Conferências

| | |
| --- | --- |
| `npm run check` | limpo (979 testes; 23 novos em `tests/unit/escolha-do-exercicio.test.ts`) |
| Protótipo de conferência = app | 0 programas diferentes em 23.470 |
| A simulação de meses | refeita: idêntica (o pacote não mexe na progressão) |
| `npm run test:e2e` e `npm run auditoria:verificar` | ver o fim deste arquivo |
| `src/engine/`, telas, `src/styles.css`, `api/`, `CLAUDE.md` | sem mudança |

## 9. Para quem já usa

Quem treina em academia ou condomínio vê "Há uma versão nova do seu programa", com 2 a 6 exercícios trocados (da Carla saem 6 e entram 5; da Marina e do Bruno saem 4; do Jonas e do Leandro, 2). O progresso dos exercícios que saem fica guardado; os que entram começam pela 1ª série de acerto. **É o pacote que mais mexe no dia a dia de quem já usa.** Quem treina em casa com halteres vê 1 ou 2 trocas; com elásticos ou peso do corpo, nenhuma.

## 10. Decisões (uma por vez)

1. ~~Regravar os 7 registros de teste (seção 7)?~~ **Decidido em 15/11/2026: sim.** Regravados.
2. **A regra 4 (a trava do empurrar do foco) fica?** Ela não estava na proposta. Tira 179 programas com empurrar ÷ puxar acima de 1,5 e 34 com dia fraco, sem piorar nenhum defeito em nenhum grupo; a nota "o foco fica a menos de 1,3 vez a mediana dos outros" vai de 16,3% para 16,4%. *Recomendo sim.*
3. **O hip thrust conta como carga na lombar para quem marcou dor leve na lombar?** Hoje não conta. Os revisores acham que sim. É dado da biblioteca (uma linha) e precisa de fonte; *recomendo levar para o tema de dor da pesquisa, e não mudar agora.*
4. **Os resíduos da seção 3** (C1 em +44 programas e D1 em +65 para quem treina 2 dias, de 680.625) **são aceitáveis para este pacote**, com as duas correções no backlog? *Recomendo sim: o total de todos os defeitos cai, e os casos são de programas que já tinham o problema ou ficaram mais curtos.*
5. **O próximo pacote.** *Recomendo o pacote 4 (o iniciante: menos exercícios por dia, as três regras de dupla que ficaram para depois, a revisão do corte de tempo e a decisão sobre "o mais simples primeiro").* A alternativa é o pacote 5 (o aviso de "sem melhora").

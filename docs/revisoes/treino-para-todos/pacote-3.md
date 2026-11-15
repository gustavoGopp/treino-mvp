# Pacote 3: a dor que não desmonta a semana, os 30 minutos e as duplas

> Sessão "treino para todos", etapa 2 (15/11/2026). **Está no ramo `claude/nifty-albattani-mltt95`, não na `main`.** Parado aqui para a revisão do Gustavo. Todas as pessoas são fictícias. As notas da revisão cega são de revisores simulados no papel de treinadores: opinião, não evidência.

## 1. O que mudou

Cinco regras entraram, uma por vez, cada uma medida. Todas têm o selo **consenso** (costume de treinador); a base científica que existe é que, com as mesmas séries, a divisão da semana não muda o resultado (robusta).

1. **A semana é remontada quando a dor esvazia um dia** (`selecao.dia-sem-principal`). Com dor acima de 5, se algum dia da divisão recomendada fica com menos de 3 exercícios ou sem exercício grande, e a pessoa não escolheu a divisão à mão, a semana sai na outra divisão oferecida para aquele número de dias (quase sempre a de corpo todo). Nada do que a dor tirou volta, e o app diz por que a divisão mudou.
2. **O mesmo exercício nunca em todos os dias, em todo caminho da escolha** (`selecao.variacoes-equivalentes`). A regra já existia para a vaga do último dia; faltava nos outros caminhos, e a regra 1 sozinha faria o mesmo exercício se repetir.
3. **Com 30 minutos, o abdômen e a panturrilha vão para dias diferentes** (`tempo.musculo-protegido`): escolhe primeiro o que tem menos dias onde entrar.
4. **Os dois exercícios de uma dupla ficam juntos na lista** (`tempo.superserie`). Antes, o par do 1º exercício podia aparecer em 3º.
5. **Com 6 dias, a regra 1 pode usar o Corpo todo 6x** (decisão do Gustavo em 15/11, depois de ver a medida da seção 5). Ele continua fora das divisões que a pessoa escolhe.

## 2. O antes e o depois, em pessoas

**Com dor forte no cotovelo** (intermediário, academia completa, 4 dias de 60 min; é o pior grupo desde o começo da sessão):

| | Antes (main) | Agora |
|---|---|---|
| Divisão | Superior/Inferior | Corpo todo 4x, com o aviso do motivo |
| Os quatro dias | 20, 36, 22 e 44 min | 44, 58, 55 e 59 min |
| Os dias de "superior" | 3 exercícios pequenos cada (elevação lateral e dois crucifixos) | não existem mais: cada dia tem pernas, peito e ombro |
| Séries na semana | 46 | 81 |
| O que a dor tirou | costas, bíceps e tríceps quase a zero | igual: costas 2, bíceps 0, tríceps 0 |

**Com dor forte no ombro e só halteres** (avançada, halteres de 1 a 12 kg e banco, 5 dias de 75 min, quer pernas): os dias eram de **3**, 61, 43, **8** e 44 min (um deles era só "2 séries de rosca"); agora são de 31, 63, 45, 34 e 47 min.

**O Jonas** (intermediário, academia, 2 dias de 30 min): o abdominal e a panturrilha caíam os dois no 1º dia, que ficava com 38 min; agora o abdominal vai para o 2º dia e o 1º fica com 34. Ele perde a cadeira flexora com drop set do 2º dia (os posteriores ficam com o stiff) e passa de 24 para 21 séries.

**A Ana e a Íris**: só a ordem muda. O par de cada exercício em dupla vem logo depois dele.

As outras nove pessoas dos exemplos ficam iguais.

O app passa a dizer, para quem teve a semana remontada: "Por causa da dor no cotovelo (7 hoje), a semana foi montada em Corpo todo 4x: na divisão recomendada (Superior/Inferior (2x)), um dos dias ficaria quase vazio. Quando a dor baixar, atualize a nota na triagem e a divisão recomendada volta."

## 3. O antes e o depois, medido

Em 680.625 programas fictícios; o "antes" é o gerador da `main`, medido com a régua de agora.

| | Antes (main) | Depois do pacote 0 | Agora (pacote 3) |
|---|---:|---:|---:|
| Programas sem nenhum defeito, na grade | 79,4% | 83,6% | **90,6%** |
| Idem, na conta ponderada | 78,1% | 94,4% | **96,4%** |
| **O pior grupo até aqui (dor 7 no cotovelo), na grade** | 50,0% | 50,0% | **75,0%** |
| Idem, na conta ponderada | 42,7% | 42,7% | **85,1%** |
| Dor 7 no ombro, na grade | 65,4% | 65,4% | 89,8% |
| Dor 7 no quadril, na grade | 62,6% | 62,6% | 89,5% |
| Treinos de 30 min, na grade | 66,9% | 67,7% | 72,9% |
| Quem treina 6 dias, na grade | 73,3% | 80,5% | 91,3% |
| Programas com um dia de menos de 3 exercícios ou sem exercício grande | 71.999 | 71.860 | 29.159 |
| Programas com o mesmo exercício em todos os dias, havendo outro | 2.646 | 2.646 | 0 |
| Programas com um dia acima de 110% do tempo | 27.039 | 27.025 | 24.312 |
| Duplas com os dois exercícios separados na lista (ponderada) | 5,4% | 5,4% | 0 |

**Em relação ao pacote 0, um único par de grupo e defeito sobe, em 1 programa** (com dor 7 no ombro, "foco abaixo da meta, tendo tempo" vai de 487 para 488 de 45.375). Em relação à `main`, ficam 4 pares do pacote 0, com 1 a 5 programas a mais cada. **É a primeira vez que o pior grupo melhora, e ele deixa de ser o pior:** agora o pior são os treinos de 30 min (72,9%), seguidos da dor forte no cotovelo (75,0%).

**O que piora um pouco (são "notas", não defeitos):** remontar a semana em corpo todo tem um preço conhecido.

- "O mesmo músculo com 3 séries ou mais em dias seguidos": de 5,3% para 5,9% dos programas (ponderada).
- "O mesmo exercício em todos os dias, sem outro do mesmo nível para trocar": de 16,6% para 18,7% na grade (igual na ponderada).
- "Algum músculo acima da faixa do nível": de 12,4% para 12,9% (ponderada).

## 4. O que foi medido e não entrou

A regra só entra se não piorar nada. Estas ficaram de fora, com o número:

| Regra | Por que não entrou |
|---|---|
| Proibir a dupla com um exercício livre com barra (agachamento, supino) | em 23.470 programas da amostra, 11 passam a ter um dia acima do tempo e 4 a empurrar mais do que puxar |
| Proibir a dupla de dois exercícios que carregam a lombar sem apoio | 35 programas passam a ter um dia acima do tempo |
| Tirar o drop set do iniciante | 9 programas passam a ter um dia acima do tempo |
| Trocar a divisão sem olhar o custo (a 1ª versão da regra 1) | 301 de 35.292 programas com dor forte ganhavam um músculo sem nenhuma série; 32 tiravam a coxa do equilíbrio. A regra que entrou só troca quando a divisão nova não esquece músculo, não desequilibra a coxa nem o empurrar e puxar, não passa do tempo e não baixa o foco |

As três primeiras são pedidos dos revisores (e a da barra tem apoio de uma revisão, que não aconselha duplas em exercícios livres pesados). Elas tiram uma saída que o app usa para caber no tempo; para entrarem, o corte de tempo precisa de outra saída antes. Fica no backlog.

## 5. Uma decisão que apareceu e foi tomada: o corpo todo em 6 dias

Com 6 dias, as divisões oferecidas são Empurrar/Puxar/Pernas e Superior/Inferior 3x. O Corpo todo 6x existe no app, mas por decisão sua de 06/11 só entra para quem não tem nada para puxar. Resultado: o iniciante de 6 dias com dor forte no ombro saía com dias de 5, 9, 34, 5, 9 e 38 min e agora sai com 7, 32, 7, 33, 9 e 33. Melhorou pouco: continuam três dias de menos de 10 minutos.

Medi primeiro sem levar ao app: em 35.292 programas com dor forte, mais 1.372 deixavam de ter um dia fraco, sem defeito novo. **O Gustavo decidiu sim em 15/11**, e a regra entrou (é a regra 5). Medido na população inteira: os programas com um dia fraco vão de 41.471 para 29.159; quem treina 6 dias vai de 82,3% para 91,3% sem defeito; esse iniciante passa a ter seis dias de corpo todo, nenhum com menos de 20 minutos. O preço são as mesmas notas da seção 3. As tabelas deste relatório já incluem a regra; a revisão cega da seção 6 foi feita antes dela (só 1 das 14 pessoas treina 6 dias: o iniciante com dor no ombro, que tinha subido 1,7 ainda com três dias curtos).

## 6. A revisão cega

Catorze pessoas (nove com dor forte, três com 30 min, duas com duplas), a semana da `main` e a de agora, 28 páginas embaralhadas, três revisores. Páginas, chave e notas em [`revisao-cega/pacote-3/`](revisao-cega/pacote-3/). **A comparação é com a `main`, então soma os pacotes 1, 0 e 3.**

Médias: eficiente 5,1 → 5,9 · adequada 5,3 → 5,7 · agradável 4,9 → 5,4. Nove sobem, quatro ficam iguais, **uma cai**.

| Pessoa | Antes (main) | Agora | Diferença na soma |
| --- | --- | --- | ---: |
| Intermediária; academia completa; 4 dias de 60 min; marcou dor no ombro, nota 7 hoje; sem grupo de foco | 3,0 · 3,7 · 2,7 | 4,0 · 5,0 · 4,3 | +4,0 |
| Intermediário; academia completa; 4 dias de 60 min; marcou dor no cotovelo, nota 7 hoje; sem grupo de foco | 3,7 · 4,7 · 4,0 | 5,3 · 6,0 · 5,7 | +4,7 |
| Intermediária; em casa, com halteres montáveis (2 a 18 kg) e elásticos; 3 dias de 45 min; marcou dor no quadril, nota 7 hoje; sem grupo de foco | 5,0 · 6,0 · 5,7 | 6,0 · 6,0 · 6,0 | +1,3 |
| Avançado; academia completa; 5 dias de 75 min; marcou dor na lombar, nota 7 hoje; quer pernas | 7,0 · 7,0 · 6,0 | 6,3 · 5,7 · 4,7 | -3,3 |
| Iniciante; academia do condomínio (multifuncional com puxador e remada, halteres de 2 a 20 kg, banco regulável, bola); 3 dias de 45 min; marcou dor no cotovelo, nota 7 hoje; sem grupo de foco | 5,3 · 5,7 · 5,3 | 5,3 · 5,7 · 5,3 | 0 |
| Avançada; halteres de 1 a 12 kg e banco reto; 5 dias de 75 min; marcou dor no ombro, nota 7 hoje; quer glúteos e pernas | 3,0 · 3,3 · 2,3 | 5,0 · 5,3 · 5,0 | +6,7 |
| Iniciante; academia completa; 6 dias de 45 min; marcou dor no ombro, nota 7 hoje; sem grupo de foco | 2,3 · 3,0 · 2,0 | 3,3 · 3,3 · 2,3 | +1,7 |
| Intermediário; em casa, com halteres montáveis (2 a 18 kg) e elásticos; 5 dias de 60 min; marcou dor no punho, nota 7 hoje; sem grupo de foco | 5,0 · 5,3 · 5,7 | 7,0 · 5,0 · 6,3 | +2,3 |
| Avançada; academia completa; 4 dias de 60 min; marcou dor no quadril, nota 7 hoje; quer costas | 6,3 · 7,0 · 6,3 | 8,0 · 8,0 · 6,3 | +2,7 |
| Intermediário; academia completa; só consegue 2 dias de 30 min; sem grupo de foco | 5,7 · 4,3 · 5,0 | 6,3 · 6,0 · 5,7 | +3,0 |
| Iniciante; academia do condomínio (multifuncional com puxador e remada, halteres de 2 a 20 kg, banco regulável, bola); 2 dias de 30 min; sem grupo de foco | 6,0 · 5,7 · 5,7 | 6,0 · 6,0 · 5,7 | +0,3 |
| Iniciante; academia completa; 3 dias de 30 min; quer pernas | 5,3 · 5,0 · 4,7 | 5,3 · 5,0 · 4,7 | 0 |
| Intermediária; treina em casa só com elásticos (3 intensidades); 4 dias de 30 min; sem grupo de foco | 7,0 · 7,3 · 6,7 | 7,0 · 7,3 · 6,7 | 0 |
| Avançado; em casa, com halteres montáveis (2 a 18 kg) e elásticos; 3 dias de 45 min; quer peito e costas | 7,0 · 6,0 · 6,7 | 7,0 · 6,0 · 6,7 | 0 |

**A que cai (−3,3) não é deste pacote, e é um aviso sobre o pacote 1.** É o avançado de 5 dias de 75 min, com dor na lombar e foco em pernas. O pacote 3 não muda nada nele: as duas páginas são exatamente as mesmas que os revisores do pacote 0 avaliaram, e lá a diferença foi de +0,3. Dois grupos de revisores, as mesmas páginas, +0,3 e −3,3. O que mudou para essa pessoa foi o pacote 1: o foco (pernas) subiu de 14 para 16 séries por músculo, a panturrilha inclusive, e os dias de pernas foram de 63 e 69 para 73 e 75 min. Os três revisores desta rodada escreveram a mesma coisa: "105 séries, panturrilha com 16, dias sem nenhuma folga, com a lombar doendo".

É a terceira vez que os revisores reclamam de dia cheio até o limite (o Leandro e o iniciante do condomínio, no pacote 1; este agora). Não mexi: o pacote 1 foi aprovado, e a Marina e o avançado de 90 min, que também enchem o tempo, foram os que mais subiram. Mas fica a pergunta para depois: deixar uma folga de 5 a 10% do tempo no pacote 1. Está no backlog, para medir.

O que os revisores continuam apontando e não é deste pacote: a dor que zera costas, peito ou ombro em vez de trocar por um movimento tolerado (pauta do profissional); dupla e drop set no iniciante e búlgaro como 1º exercício (pacotes 2 e 4); o foco em pernas com as mesmas séries do resto em 30 min.

## 7. Os registros de teste que mudaram (regravados em 15/11/2026, com o ok do Gustavo)

Dois registros mudam, os dois da **Ana**, e só na ordem dos exercícios (as duplas ficaram juntas). O Gustavo viu a lista abaixo e autorizou a regravação em 15/11/2026; a diferença gravada são exatamente estas linhas, e `npm run check` voltou a passar inteiro.

| Registro | O que muda |
|---|---|
| `gerador.test.ts`, cenário da Ana | Corpo todo A: o supino (par do búlgaro) sobe da 3ª para a 2ª posição, antes da ponte de glúteo. Corpo todo C: a flexão de braço (par do afundo) sobe da 3ª para a 2ª |
| `personas-r2.test.ts`, a Ana na volta de 30 dias | a mesma troca de ordem, na lista de cargas dos dois dias |

Um teste antigo trocou de exemplo: em `avaliador.test.ts`, o caso "dia acima do tempo sem corte possível" usava o iniciante de 2 dias de 30 min; com a regra 3 ele deixou de ter o problema, e o exemplo passou a ser o intermediário do mesmo cenário.

Testes novos: `tests/unit/semana-com-dor.test.ts` (10 testes): o perfil com dor no ombro sai em corpo todo, sem dia de 16 minutos e sem nada do que a dor tirou; o aviso e o porquê dizem quem escolheu a divisão; quem escolheu a divisão à mão fica com ela; sem dor forte ou sem dia fraco a divisão é a recomendada; em 84 perfis (12 personas × 7 regiões), a troca só acontece quando diminui os dias fracos e não custa outra coisa; nenhum deles tem o mesmo exercício em todos os dias havendo outro; o Jonas fica com abdômen e panturrilha em dias diferentes; em toda dupla, o par é vizinho; com 6 dias e dor no ombro, a semana sai no Corpo todo 6x, sem dia de menos de 20 minutos; e ele continua fora do que a pessoa escolhe e de quem não tem dor forte.

## 8. Conferências

| Conferência | Resultado |
|---|---|
| `npm run check` (lint, tipos, testes) | limpo: 61 arquivos, 955 testes (depois de regravar os 2 registros da seção 7, com o ok do Gustavo) |
| `npm run test:e2e` (o app no navegador) | E2E |
| `npm run auditoria:verificar` (duas rodadas idênticas e a linha de base da régua) | em andamento quando este relatório foi escrito (leva mais de uma hora e meia); o resultado entra aqui |
| O protótipo com as regras adotadas dá o mesmo programa que o app | sim, nas 12 personas |
| A simulação de meses | refeita: idêntica (o pacote não mexe na progressão) |
| `src/engine/`, telas, `api/`, `src/storage/` | sem mudança. Mudaram `src/domain/gerador` e `src/domain/regras/regras.json` |

## 9. Para quem já usa

Quem marcou dor forte e tinha um dia quase vazio vê "Há uma versão nova do seu programa", com outra divisão e o aviso do motivo. Quem treina 30 minutos pode ver o abdominal ou a panturrilha mudar de dia. Quem tem duplas vê a ordem da lista mudar. O progresso dos exercícios continua guardado.

## 10. Decisões

Uma por vez, com a minha recomendação; nada vem marcado.

1. ~~Posso regravar os 2 registros de teste da Ana (seção 7)?~~ **Decidido em 15/11/2026: sim.** Regravados.
2. ~~O Corpo todo 6x também entra quando a dor esvazia um dia (seção 5)?~~ **Decidido em 15/11/2026: sim.** Entrou como a regra 5, medida.
3. ~~As três regras de dupla que não entraram (seção 4) ficam para depois?~~ **Decidido em 15/11/2026: sim, ficam para depois**, junto com uma revisão do corte de tempo, no pacote do iniciante.
4. **O próximo pacote.** *Recomendo o pacote 2 (a escolha dos exercícios).* Depende de você aceitar exercícios sem animação aparecendo como cartão de texto (decisão 2 da proposta).

# D3 da conferência: os 15 itens que a conferência regra por regra deixou para o pacote D3

> Feito em 23/11/2026, no ramo `claude/d3-conferencia`, a partir da `main` (`1850e60c`), a pedido do Gustavo ("fazer tudo que falta" para fechar a versão inicial). A lista dos 15 está em `docs/backlog.md`, seção "Da conferência regra por regra, pacote D1 (22/11/2026)", em "Para o pacote D3"; os exemplos dos conferentes, em `docs/revisoes/regras-x-codigo/`. **Nada daqui foi para a `main`: espera a verificação completa e o ok do Gustavo.**

## Em uma frase

Dos 15 itens, **4 entraram e 1 entrou pela metade** (o 1, que muda programas, na 3ª tentativa; o 13 e o 14, que mudam as fases e a reserva, e não o programa; o 15, de tela; e metade do 12), **1 ficou reduzido pelo item 1** (o 6), **7 foram tentados, medidos e saíram** porque pioravam algum defeito em algum grupo de programas, e **2 ficam para decisão do Gustavo**. O ramo inteiro, contra a `main`, tira o dia fraco de 3.536 programas da população e não piora nenhum defeito da régua em nenhum grupo. As 12 personas ficam iguais.

## Como cada item foi feito

1. **Reproduzir** o exemplo do conferente, rodando o gerador da `main`.
2. **A regra antes do código** (`docs/pesquisa/regras.md`, `node scripts/gerar-regras.mjs`; a frase de "Entenda o treino" quando muda o que o app faz), **o teste que prende o defeito** (`tests/unit/conferencia-d3.test.ts`; conferido: cada teste falha sem o conserto) e **o conserto**, com a mesma mudança no protótipo (`scripts/auditoria/prototipo/`, uma chave `dc-*` por item, para medir cada um ligado e desligado com os outros no lugar).
3. **A medida**, em três camadas:
   - **A grade dos itens** (um script desta rodada, fora do repositório): a grade da régua (55 equipamentos × 3 níveis × 2 a 6 dias × 30, 45, 60 e 90 min × 11 focos × sem dor, ombro 7 e joelho 7 = 108.900 programas, a divisão recomendada) e mais 39.600 com a divisão escolhida (todas as oferecidas, sem dor, focos de pernas e glúteos). Conta o defeito de cada item e a régua da G5 inteira (`scripts/auditoria/regua.ts`).
   - **A população** (`scripts/auditoria/retrato.ts`, 680.625 programas, por grupo), cada item ligado e desligado, e o ramo inteiro contra a `main`; as grades oficiais (`npm run auditoria:verificar`, com a de qualidade, 911.625, e a da régua, 108.900).
   - **As 12 personas** (`tests/personas/`).
4. **O critério do D3:** nenhum par "grupo × defeito da régua" pode subir em relação à `main` (nem em 1 programa), e só entra o que melhora alguma medida. Os "cuidados do tipo defeito" do retrato (uma medida mais larga) também foram olhados. O que não passou saiu do ramo (`git revert`, ou nem chegou a ser enviado quando a medida foi feita antes do commit) e está registrado abaixo e na regra. Três tentativas no máximo por item.

O que o D3 aprendeu valeu aqui também, e mais de uma vez: um ajuste que entra na escolha da divisão ou da montagem pode mudar a escolha e piorar casos que nada têm a ver com ele. O item 1 só passou quando a comparação foi feita no programa pronto.

## Os 15 itens

| # | Regra | Reproduziu? | Ficou | A medida |
|---|---|---|---|---|
| 1 | `selecao.peitoral-inclinado` | sim | **feito** (3ª tentativa) | dia de Empurrar com o lugar do inclinado num isolador e sem supino nem flexão: 493 → 248 dias na grade da régua, 196 → 76 com a divisão escolhida; o dia fraco (A2) na população, 28.394 → 24.858 |
| 2 | `selecao.triceps-acima-cabeca` | sim | **saiu** (2 tentativas) | sem tríceps acima da cabeça: 3.575 → 0; mas, programa a programa, o dia acima de 110% aparece em 208, empurrar ÷ puxar em 26 e o dia fraco em 2 |
| 3 | `selecao.complementos` | sim | **decisão do Gustavo** | — |
| 4 | `selecao.estabilidade` | sim | **saiu** | o crucifixo com halteres no lugar do da polia: 274 → 0; nenhum defeito da régua muda, mas dois cuidados do tipo defeito sobem (+10 e +6) e nenhuma medida melhora |
| 5 | `selecao.panturrilha-alongada` | sim | **saiu** (2 versões) | 1ª: o C1 (foco abaixo da meta com tempo) +674 na grade da régua; 2ª: o C1 +20 na população |
| 6 | `selecao.dia-sem-principal` | sim | **reduzido pelo item 1** | o aviso que culpa a dor por um dia fraco que já existia sem ela: 81 → 39 (grade de 39.600 programas com dor 7) |
| 7 | `selecao.aducao-complemento` | sim | **saiu** (2 versões) | 2ª versão: o dia acima de 110% −248, o C1 −37 no total, mas 12 grupos com algum defeito a mais (1 a 3 programas cada) |
| 8 | `volume.semanal.minimo` | sim | **saiu** | o dia acima de 110% +1.390 na grade da régua (+2.328 com a divisão escolhida) |
| 9 | `volume.semanal.maximo` | sim | **decisão do Gustavo** | — |
| 10 | `volume.equilibrio-coxa` | sim | **saiu** | coxa fora da faixa: 818 → 3 (divisão escolhida); mas o C1 +13 e o dia acima de 110% +9 |
| 11 | `tempo.sobra-series` | sim | **saiu** (2 tentativas; revertido) | isolador do iniciante acima de 3 séries: 21.533 → 12.775; mas o dia fraco +12, o C1 +2 a +4 e o E1 +1 |
| 12 | `tempo.superserie` | sim (as duas metades) | **metade feita** | iniciante com dupla nas semanas 1 e 2 de uma volta de pausa: 274 → 0 em cada faixa de pausa (1.100 programas cada); a tela conduzir a dupla fica fora (tela e decisão) |
| 13 | `iniciante.fase-aprendizado` | sim | **feito** | iniciante com pausa de 2 semanas sem a fase de aprendizado: 1.100 → 0 |
| 14 | `readaptacao.gatilho` | sim | **feito** | o exemplo (10 semanas em 3 dias, depois 4 dias): RIR +1 nos 4 dias novos → em nenhum |
| 15 | `divisao.sem-puxar` | sim | **feito** | sem nada para puxar, a etiqueta "Recomendada" numa divisão que o programa não usa: 228 → 0, de 380 casos |

E, de carona, o comentário errado de `src/features/entenda/Entenda.tsx` (só o comentário; `601d8af5`).

### 1. `selecao.peitoral-inclinado`: feito, na 3ª tentativa

- **Reproduziu:** halteres de 1 a 12 kg e banco reto, intermediário, 5 dias de 30 min: o dia de Empurrar saía com crucifixo, elevação lateral e tríceps francês, sem supino.
- **A causa:** sem banco inclinável, a vaga inclinada recebe um 2º empurrar só num dia sem outra vaga de empurrar horizontal; o código olhava o modelo do dia, e com 30 min essa vaga (complemento) não cabia, mas ainda contava.
- **1ª versão (`54de5b18`):** conta a vaga que coube no dia. Na população, o dia fraco cai 3.555, mas o dia acima de 110% sobe em 28 programas, em 28 grupos (com 30 min, 5 e 6 dias, dor na lombar, foco em pernas e glúteos), e o dia fraco em 4 com dor no quadril.
- **2ª versão (`ede3a740`):** a mesma, com uma trava na montagem (só vale se não custar um dia acima do tempo nem um dia fraco). Não pegou: o dia acima de 110% subiu 34.
- **Por quê:** o dia de Empurrar que deixa de ser fraco também deixa de pedir a troca de divisão pela dor (`selecao.dia-sem-principal`), e a divisão de corpo todo, a de antes, era a que cabia no tempo (halteres e banco reto, 5 dias de 30 min, dor 7 no joelho, foco em glúteos: o dia de Pernas com 39 min em 30).
- **3ª versão (`75fae069`, a que ficou):** quando a regra nova muda o 2º empurrar de algum dia, o programa pronto é comparado com o da conta de antes, e o novo só vale se não tiver um dia a mais acima de 110% nem um dia fraco a mais. A 2ª geração só acontece nesses casos. O teste novo prende o caso da dor no joelho (`cbaf0587`).
- **A medida:** ver "A medida do ramo inteiro", abaixo (o item 1 é o único que muda programas no ramo).

### 2. `selecao.triceps-acima-cabeca`: saiu (2 tentativas, medidas antes do commit)

- **Reproduziu:** academia completa, intermediário, 3 dias de 30 min: nenhum tríceps na semana (nem ombro lateral).
- **Tentado:** nos treinos curtos (até 4 exercícios), no último dia da semana que tem a vaga, se nenhum dia antes teve o exercício, ela passava à frente das outras vagas-base do dia; a 2ª tentativa guardava o dia com 2 multiarticulares ou mais.
- **A medida (grade da régua):** sem tríceps acima da cabeça, 3.575 → 0; no total, o dia acima de 110% −138 e empurrar ÷ puxar −94, mas, programa a programa, o dia acima de 110% aparece em 208, empurrar ÷ puxar em 26 e o dia fraco em 2 (e somem em 346 e 120). As duas tentativas deram o mesmo número: o tríceps tira o lugar de um exercício grande, e as séries dele vão para os outros dias, que passam do tempo. A persona Jonas (2 × 30 min) mudava.
- **Fica:** a frase de "Entenda o treino" já diz "quando ele cabe no tempo (nos treinos mais curtos pode não caber)". Garantir 1 por semana com 30 min pede tirar uma vaga-base de um dia de 4 exercícios: decisão de produto.

### 3. `selecao.complementos`: decisão do Gustavo

- **Reproduziu:** academia completa, 2 dias de 60 min, sem foco: 1 exercício de tríceps na semana.
- **Por que fica de fora:** esta regra (2 por semana para quadríceps, posteriores, tríceps e peito) foi generalizada pela `selecao.exercicios-por-musculo`, mais nova, que dá ao músculo pequeno 1 exercício (2 se for foco). Pôr o tríceps nas famílias de complementos (`src/domain/gerador/familias.ts`) contraria a regra mais nova e muda também a medida do avaliador e da régua, que usam as mesmas famílias. A frase de "Entenda o treino" já diz o que o app faz ("O tríceps recebe o 2º quando o dia tem lugar para o complemento"). Qual das duas vale para o tríceps é decisão de produto.

### 4. `selecao.estabilidade`: saiu

- **Reproduziu:** polia dupla, halteres e banco regulável (o inventário do Bruno), iniciante de 4 dias de 60 min: o crucifixo com halteres ganhava do crucifixo na polia "por ser mais estável e apoiado".
- **Tentado (`ae62ad2d`):** a polia conta como estável pela carga (a regra lista máquina, banco e polia), e o porquê de um exercício de polia dizia "a polia guia o movimento".
- **A medida:** o caso some (274 → 0 na grade da régua). Na população, nenhum defeito da régua muda, mas dois cuidados do tipo defeito do retrato sobem: músculo com 1 a 3 séries havendo exercício (+10) e, com foco, outro músculo com menos de 4 séries (+6), em geral porque o iniciante passa a receber exercícios de polia de um lado só (a elevação lateral unilateral na polia, por exemplo), que levam o dobro do tempo. Nenhuma medida melhora.
- **Revertido** (`e4325089`); a regra registra a medida. Uma 3ª tentativa possível: só a polia de dois lados conta como estável.

### 5. `selecao.panturrilha-alongada`: saiu (2 versões)

- **Reproduziu:** sem equipamento, foco em pernas, 3 dias de 60 min: o iniciante tinha o Corpo todo A só com a panturrilha no chão (o calcanhar não desce), com o degrau da escada possível.
- **1ª versão (`644d076d`):** a do chão sai de todo caminho com o degrau possível. Na grade da régua, ela some de 35.240 programas, mas o C1 sobe 674 (964 com a divisão escolhida): era ela que, ao lado do degrau, levava a panturrilha do foco à meta.
- **2ª versão (`8377f0ad`):** a do chão nunca no lugar do degrau, mas ao lado dele sim, e só no programa já escolhido. Na população, o C1 sobe 20 (com 3 dias, com dor no quadril, com foco em abdômen).
- **Revertido** (`f8ace0c0`); a regra registra a medida.

### 6. `selecao.dia-sem-principal`: reduzido pelo item 1

- **Reproduziu:** na `main`, iniciante, 5 dias de 30 min, halteres e banco reto, dor 7 no joelho: o aviso dizia "Por causa da dor no joelho, a semana foi montada em Corpo todo 5x", mas o dia fraco (o Empurrar sem supino) já existia sem a dor.
- **A medida:** numa grade de 39.600 programas com dor 7 (55 equipamentos × 3 níveis × 2 a 6 dias × 4 durações × 4 focos × 3 regiões), as trocas de divisão em que a divisão recomendada já tinha o dia fraco sem a dor: 81 na `main`, 39 no ramo (a maior parte vinha do item 1).
- **O texto não mudou:** um aviso novo para esse caso ("Com o seu equipamento, um dos dias da divisão recomendada ficaria quase vazio...") foi escrito e retirado, porque pede gerar o programa sem a dor em cada troca de divisão (cerca de 1/3 a mais de conta nesses casos). Fica no backlog, como decisão: mudar o texto ou a condição da troca.

### 7. `selecao.aducao-complemento`: saiu (2 versões)

- **Reproduziu:** iniciante sem equipamento, 3 dias de 75 min, pernas e glúteos: o Corpo todo B tinha a adução e não tinha o abdominal; e, no corte de tempo direto (academia, corpo todo 4x, pernas, de 90 para 60 min), saía o abdominal e ficava a adução.
- **1ª versão (`37920e66`):** a adução entra por último na montagem e é o primeiro isolador a sair no corte, mesmo sendo o único exercício dos adutores. Dentro das comparações entre montagens e divisões, trocava a escolha de alguns casos com dor: na grade da régua, o dia fraco aparecia em 38 programas (sumia em 169).
- **2ª versão (`8377f0ad`):** só no programa já escolhido. Na população: no total, o dia acima de 110% −248, o C1 −37, empurrar ÷ puxar −17, o dia fraco −3; mas 12 grupos com algum defeito a mais, de 1 a 3 programas cada (o C1 com 5 dias e com foco em glúteos, o dia fraco com 45 min, empurrar ÷ puxar com 60 min).
- **Revertido** (`f8ace0c0`); a regra registra a medida.

### 8. `volume.semanal.minimo`: saiu (medido antes do commit)

- **Reproduziu:** o inventário do Bruno, iniciante, 2 dias de 30 min, foco em braços: bíceps e tríceps já abaixo do mínimo (6) e perdiam mais séries no corte.
- **Tentado:** nos cortes de sempre, o músculo do foco que já está abaixo do mínimo não perde mais séries.
- **A medida (grade da régua):** o dia acima de 110% +1.390 (de 1.771 para 3.161), empurrar ÷ puxar +24; com a divisão escolhida, o dia acima de 110% +2.328. O dia passa do tempo em vez de cortar. A regra e a frase já dizem, desde o D1, que o foco abaixo do mínimo pode perder séries.

### 9. `volume.semanal.maximo`: decisão do Gustavo

- **Reproduziu:** o inventário do Bruno, iniciante, 6 dias de 45 min, sem foco: peito 12 e tríceps 11 séries (o máximo do iniciante é 10), com todos os exercícios em 2 séries.
- **Por que fica de fora:** as séries já estão no mínimo de 2 por exercício; fazer o máximo valer pede tirar exercícios do programa. O máximo do nível é limite de verdade, ou só o alvo do tempo que sobra (o que a frase diz desde o D1)? É decisão de produto.

### 10. `volume.equilibrio-coxa`: saiu (medido antes do commit)

- **Reproduziu:** halteres de 1 a 12 kg e banco reto, avançado, Superior/Inferior 3x escolhida, 60 min, foco em glúteos e pernas: quadríceps 6 e posteriores 14 (razão 0,43).
- **Tentado:** na distribuição das séries até a meta, a série a mais não tira quadríceps ÷ posteriores da faixa.
- **A medida (só aparece com a divisão escolhida):** coxa fora da faixa, 818 → 3; mas o C1 +13 e o dia acima de 110% +9: o posterior do foco para abaixo da meta para a razão caber, e o tempo vai para outro lugar.

### 11. `tempo.sobra-series`: saiu (2 tentativas; revertido)

- **Reproduziu:** iniciante sem foco, sem equipamento, 2 dias de 60 min: a flexão de joelho deslizante (isolador) com 4 séries nos dois dias, 8 de posteriores com meta de 6.
- **1ª tentativa (`aa0911a6`):** a trava do iniciante (fora do foco, só os multiarticulares sobem, até 3 séries) vale também no 1º passo, nos dias com vaga vazia. Isolador do iniciante acima de 3 séries, 21.533 → 12.775 na grade da régua; mas o dia fraco +12, o C1 +4 e o E1 +1.
- **2ª tentativa:** a trava no 1º passo só no programa já escolhido. Mesma medida (o dia fraco +12, o C1 +2, o E1 +1): com menos séries sobra tempo, e a 2ª família de exercícios do glúteo entra noutro dia, que fica sem multiarticular (exemplo: só a máquina voadora, iniciante, 4 dias de 30 min, dor 7 no joelho).
- **Revertido** (`f966f20d`); a regra registra a medida.

### 12. `tempo.superserie`: metade feita

- **(b) feito (`cd4bb529`):** o iniciante que declara pausa de 3 semanas ou mais (ou que volta de uma pausa no uso) recebia dupla nas semanas 1 e 2 da readaptação. Agora a dupla só volta na 3ª semana, como já era na fase de aprendizado. Na grade (iniciante, 55 equipamentos × 5 dias × 4 durações, sem foco), os programas com dupla nas semanas 1 e 2: 274 → 0 em cada faixa de pausa (2, 4 e 12 semanas). O nível vem do programa guardado (campo que já existe); no programa antigo, sem ele, nada muda. Não muda o programa nem o que fica guardado.
- **(a) fica de fora:** a tela do treino não conduz a dupla (cada série ganha o descanso inteiro, e o tempo estimado conta 15 s entre os dois). É tela (a outra frente trabalha no descanso), e conduzir a dupla ou deixar de contar a economia é decisão de produto. A frase de "Entenda o treino" já diz "No treino, o app ainda não conduz a dupla".

### 13. `iniciante.fase-aprendizado`: feito (`9d4d1afd`)

- **Reproduziu:** iniciante com "parei há umas 2 semanas": só o RIR +1 na 1ª sessão de cada dia, com o programa completo e dupla desde a semana 1.
- **Decidido pela sessão [opinião]:** o iniciante com pausa de 2 semanas recebe a fase de aprendizado (2 semanas, RIR 3–4, 3/4 das séries, sem dupla), que já tem mais reserva que o +1. Com 3 semanas ou mais, segue a readaptação, mais leve na semana 1. Registrado na regra.
- **A medida:** iniciante com pausa de 2 semanas sem a fase: 1.100 → 0. Não muda exercícios nem séries do programa, só as fases.

### 14. `readaptacao.gatilho`: feito (`19ce2369`)

- **Reproduziu:** intermediário com pausa de 2 semanas no cadastro, 10 semanas de 3 dias, depois 4 dias: os 4 dias novos levavam RIR +1, dois meses e meio depois da pausa.
- **O conserto:** o +1 da pausa do cadastro vale na 1ª volta pelo programa (enquanto o 1º bloco tem menos treinos que dias no programa). A pausa detectada no uso não muda. Não muda o que fica guardado.

### 15. `divisao.sem-puxar`: feito (`7bdd7301`)

- **Reproduziu:** só com o banco reto, 4 dias: a tela da rotina (Meus dados) marcava "Recomendada" na Superior/Inferior, e o programa saía em Corpo todo 4x. Com 6 dias, o aviso de quem manteve a escolha mandava "escolher Corpo todo na rotina", que a tela de 6 dias não oferece.
- **O conserto:** a tela marca a mesma que o programa usa, com o porquê; com 6 dias, nenhuma das duas oferecidas leva a etiqueta, e o aviso manda tocar em "Deixar o app escolher". O gerador ganhou `nadaParaPuxar(perfil, inventário)`, a mesma conta que ele faz por dentro.
- **A medida:** 380 casos sem nada para puxar (26 equipamentos × 3 níveis × 5 dias): a etiqueta numa divisão que o programa não usa, 228 → 0.
- **Tela mudada:** `src/features/onboarding/Rotina.tsx` (só a etiqueta e o texto da opção). Teste de tela novo em `tests/e2e/onboarding.spec.ts`, **não rodado** nesta rodada (combinado).

## A medida do ramo inteiro contra a `main`

No ramo, só o item 1 muda programas (os itens 12, 13 e 14 mudam as fases e a reserva da semana, e não o programa; o 15 muda a tela e um aviso). As medidas abaixo comparam o gerador da `main` com o do ramo, com a mesma régua e a mesma biblioteca.

**A população** (`scripts/auditoria/retrato.ts`: 680.625 programas, todas as combinações de equipamento, nível, dias, minutos, foco e dor; "ponderada" pesa as combinações mais prováveis):

| Medida | `main` | O ramo |
|---|---:|---:|
| Programas sem nenhum defeito da régua (grade · ponderada) | 630.535 (92,6%) · 98,18% | **633.933 (93,1%) · 98,48%** |
| Dia com menos de 3 exercícios ou sem multiarticular (A2) | 28.394 | **24.858** |
| Dia mais longo acima de 110% dos minutos (A3) | 10.064 | 10.056 |
| Empurrar ÷ puxar acima de 1,5 (D1) | 3.056 | 3.054 |
| Os outros defeitos da régua (C1, D3, E1, B1, A4) | iguais | iguais |
| Pares "grupo × defeito da régua" que sobem (132 grupos × 9 defeitos) | | **0** (82 descem) |
| Programas sem nenhum cuidado do tipo defeito (grade · ponderada) | 323.628 · 56,19% | 324.856 · 56,24% |
| Nota: dia mais curto abaixo de 60% do mais longo (A5) | 115.433 | 114.586 |
| Nota: o foco não passa da mediana dos outros (C2) | 67.202 | 67.206 |
| Cuidado do tipo defeito: músculo abaixo da faixa do nível com tempo sobrando (c04c) | 226.645 | 226.672 |

- **O que piora, e foi aceito:** a nota C2 em 4 programas e o cuidado c04c em 27 no total; por grupo, 55 pares "grupo × cuidado do tipo defeito" sobem (o c04c e o c04b, "músculo com 1 a 3 séries", que no total cai 1), de 1 a 30 programas cada; o maior, o c04c com dor 7 na lombar. São da troca de divisão pela dor que deixa de acontecer quando o dia de Empurrar deixa de ser fraco: a semana fica na divisão recomendada, com o dia típico mais curto. Não foi conferido caso a caso. Os dois são medidas mais largas que a régua (o D3 aceitou o mesmo c04c em 14 programas, conferido).
- **As séries por semana** ficam iguais (58,98 por programa, na grade), e o uso dos minutos também (78,8%).

**A grade dos itens** (108.900 programas da grade da régua, mais 39.600 com a divisão escolhida):

| Medida | `main` | O ramo |
|---|---:|---:|
| Dia com o lugar do inclinado num isolador e sem supino nem flexão (item 1) | 493 · 196 | 248 · 76 |
| Dia fraco (A2), recomendada · escolhida | 4.053 · 4.950 | 3.536 · 4.656 |
| Dia acima de 110% (A3), recomendada · escolhida | 2.092 · 1.504 | 2.091 · 1.503 |
| Programas sem nenhum defeito da régua, recomendada · escolhida | 101.591 · 32.646 | 102.093 · 32.905 |
| Algum defeito da régua que sobe | | nenhum |

**As grades oficiais** (`npm run auditoria`, a 1ª das duas rodadas; os relatórios regenerados estão num commit próprio):

| Medida | `main` | O ramo |
|---|---:|---:|
| Grade de qualidade (911.625): dia fraco (régua A2) | 40.427 | **36.290** |
| Grade de qualidade: empurrar ÷ puxar (D1) | 4.719 | 4.718 |
| Grade de qualidade: "o mesmo exercício em todos os dias" (monotonia) | 176.082 | 176.073 |
| Grade de qualidade: os outros suspeitos | iguais | iguais |
| Grade da régua (108.900): sem dor, sem nenhum defeito | 95,2% | **96,1%** |
| Grade da régua: dia fraco, sem dor · com dor | 355 · 3.698 | 14 · 3.522 |
| Grade da régua: dia acima de 110%, sem dor · com dor | 804 · 1.288 | 803 · 1.288 |
| Grade da régua: dentro da linha de base em todo defeito | sim | sim |

## As personas

As 12 personas saem **iguais** às da `main` (conferido programa a programa, com os avisos e as fases). Nenhum snapshot foi regravado, e não houve revisão cega: nenhum programa de persona mudou. (Na tentativa do item 2, que saiu, o Jonas mudava.)

## Textos de tela novos ou mudados

- Rotina (Meus dados), quando nada puxa, na opção de corpo todo: "Por que é a recomendada: sem exercício de puxar no seu equipamento, os dias de puxar das outras ficariam com outros músculos."
- Aviso de quem manteve a divisão com 6 dias e nada para puxar: "… Para trocar, toque em “Deixar o app escolher” na rotina."
- "Entenda o treino": a frase de `divisao.sem-puxar` ("Sem nenhum exercício de puxar possível, a recomendada, e a marcada na tela da rotina, é a de corpo todo do mesmo número de dias. Com 6 dias, é o Corpo todo 6x, que a tela não oferece: deixe o app escolher. …").

## Tempo dos testes (item 3 da lista de conferência)

Com a cobertura (`npm run test:cobertura`), 1.061 testes, todos passando. Todo teste acima de 2 s tem limite de 30 ou 60 s, e o mais lento leva 7,1 s (as propriedades do gerador, limite de 30 s). Um teste de limite padrão (5 s) passava de 2 s, já na `main`: "nenhum dia vazio, nenhum dia só com abdominal..." do equipamento mínimo (2,4 s na rodada inteira). Foi dividido em duas partes (`44afb95f`), 0,97 e 0,78 s; o limite não mudou.

## O que não foi conferido

- `npm run verificar`, `npm run test:e2e` e o projeto "celular" do Playwright não rodaram (combinado: a outra frente usa a máquina e a porta 4173). O teste de tela novo do item 15 está escrito e não rodou.
- A tela da rotina não foi aberta no navegador.
- O estado guardado não mudou (versão 9).
- O caminho do treino num outro local (`local.treino-do-dia`) não foi medido à parte: ele usa a mesma escolha de exercício, que o item 1 não toca.

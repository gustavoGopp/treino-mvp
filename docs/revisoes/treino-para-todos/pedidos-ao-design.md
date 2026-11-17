# Pedidos à sessão do design (telas e textos de tela)

> Sessão "treino para todos", etapa 1 (13/11/2026). Esta sessão não mexe em `src/features/` nem no `src/styles.css`. Cada pedido traz o motivo medido. Os textos são rascunho; a palavra final é do design e do Gustavo. Nenhum pedido depende de pergunta nova no cadastro.

## 1. Textos que mudam se a proposta for aprovada (o gerador escreve; o design revisa)

| Onde aparece | Hoje | Proposta | Motivo |
|---|---|---|---|
| "Por que este programa", item do volume, sem foco | "Sem grupo de foco: todos os músculos ficam com ~6 séries por semana…" | "Sem grupo de foco: o tempo do treino é dividido por igual entre os músculos, até ~12 séries por semana cada, o alvo do seu nível. Com pouco tempo, cada um fica com pelo menos ~6, o bastante para crescer, mais devagar." | hoje o texto não bate com o programa em 23 de cada 100 programas (ponderada) |
| Aviso de tempo que sobra, quando não falta exercício | não existe (o dia fica curto sem aviso em 15 de cada 100 programas, ponderada) | "O seu treino completo dura cerca de 45 min: as séries já chegaram ao que rende bem no nível iniciante. Dá para escolher uma duração menor sem perder nada; para usar mais tempo, escolha um grupo de foco." | cuidado 3 (o treino usa o tempo pedido, ou avisa) |
| Aviso quando a dor muda a divisão | não existe | "Por causa da dor no ombro (7 hoje), a semana foi montada em Corpo todo 4x: na divisão recomendada, um dos dias ficaria quase vazio. Quando a dor baixar, atualize a nota na triagem e a divisão recomendada volta." | com dor forte no ombro, no cotovelo ou no quadril, 1 em cada 3 programas tem hoje um dia de menos de 3 exercícios |

### 1.1 Os textos que já estão no ramo, com o pacote 1 (13/11/2026)

O pacote 1 da etapa 2 (`pacote-1.md`) já escreve estes textos; substituem as duas primeiras linhas da tabela acima. São rascunho do domínio, para o design revisar.

| Onde aparece | Texto no ramo |
|---|---|
| "Por que este programa", volume, sem foco (intermediário e avançado) | "Sem grupo de foco: o tempo do treino é dividido por igual entre os músculos, até ~12 séries por semana cada, o alvo do seu nível. Com pouco tempo, cada um fica com ~6, o bastante para crescer, mais devagar. Para acelerar um grupo, escolha-o como prioridade." |
| Idem, iniciante | "Sem grupo de foco: cada músculo fica com ~6 séries por semana, o bastante para crescer, mais devagar que com foco; quando sobra tempo, os exercícios grandes ganham uma série a mais. Para acelerar um grupo, escolha-o como prioridade." |
| Idem, com foco | "Foco em peito: ~12 séries por semana para crescer mais rápido. Os outros músculos ficam com ~6 ou mais: mais do que o necessário para manter (1 a 3) e o bastante para continuar crescendo, mais devagar." (só mudou "~6" para "~6 ou mais") |
| "Por que este programa", séries no tempo que sobra, sem foco | "O tempo que sobrava nos treinos virou série: cada músculo sobe até ~12 séries por semana, o alvo do seu nível, enquanto o treino couber nos 60 min." |
| Idem, iniciante | "O tempo que sobrava nos treinos virou uma série a mais nos exercícios grandes (até 3 por exercício): para quem está começando, praticar o básico rende mais do que somar séries nos exercícios pequenos." |
| Idem, com 1 ou 2 grupos de foco | "O tempo que sobrava nos treinos virou série primeiro para o foco (até ~16 séries por semana) e só depois para os outros músculos, que ficam pelo menos 6 séries abaixo do foco." |
| Idem, com 3 grupos de foco ou mais | "O tempo que sobrava nos treinos virou série, sem passar o foco da meta de ~12 séries por semana: com mais de 2 grupos de foco, o tempo se divide. Os outros músculos ficam pelo menos 6 séries abaixo do foco." |
| Aviso de tempo que sobra, sem faltar exercício, sem foco | "O seu treino completo dura cerca de 45 min: as séries já chegaram ao que rende bem no nível iniciante. Dá para escolher uma duração menor sem perder nada; para usar mais tempo, escolha um grupo de foco." |
| Idem, com foco | "O seu treino completo dura cerca de 55 min: o foco já recebeu o tempo que rende, e os outros músculos ficam abaixo dele de propósito. Dá para escolher uma duração menor sem perder nada." |

## 2. Juntar os avisos de "abaixo da meta" (tela do programa)

- **O que acontece hoje:** o Jonas (2 dias de 30 min, academia) recebe 8 avisos, um por músculo ("Abaixo da meta: bíceps 2 de 6 séries… Com 30 min cabem ~4 exercícios por treino…"). A Ana recebe 9.
- **O pedido:** um aviso só, com a lista, e o que resolveria. Rascunho: "Com 2 treinos de 30 min, o programa cobre peito, costas e pernas. Braços, ombros, panturrilha e abdômen ficam com o trabalho indireto dos exercícios grandes. Com 3 treinos de 30 min ou 2 de 45, eles entram." O gerador já sabe o motivo de cada músculo; falta a tela agrupar e o domínio calcular a alternativa (o cadastro já tem a função que compara "mais um dia" e "mais 15 min": `src/domain/gerador/opcoes.ts`).
- **Motivo medido:** quem tem 30 min é o pior grupo do retrato: 9 em cada 100 programas sem nenhum defeito (ponderada); 48 em 100 com um músculo abaixo de 4 séries.

## 3. Mostrar o degrau de partida na semana (tela do programa e do dia)

- **O que acontece hoje:** para quem treina com o peso do corpo ou com elástico, o app começa o intermediário e o avançado num degrau mais difícil (por exemplo, "agachamento: 1,5 repetição"), mas a semana mostra só "Agachamento com o peso do corpo, 4 × 12 a 20". Quem lê acha que o treino é o de um iniciante.
- **O pedido:** mostrar o degrau ao lado do nome do exercício, já na semana.
- **Motivo:** na revisão cega, a avançada sem equipamento (Kátia) teve as notas mais baixas das doze (4,3 · 5,0 · 4,3), e a 1ª crítica dos três revisores foi "agachamento só com o peso do corpo, 4 séries de 12 a 20, que ela não leva perto da falha".

## 4. Os dois exercícios de uma dupla, juntos e ligados na lista

- **O que acontece hoje:** num bi-set, o par do 1º exercício pode aparecer em 3º na lista do dia. Os três revisores apontaram.
- **O que a proposta já faz no gerador:** põe os dois um depois do outro. **O pedido à tela:** mostrar a dupla como um bloco só (uma chave ou um fundo comum), com o descanso depois dos dois.

## 5. Se a pergunta "tenho 60 anos ou mais" for aprovada (decisão 7 da proposta; recomendação: não agora)

- Uma linha opcional, de sim ou não, no cadastro; nunca a idade exata. Só depois de a regra ser medida num protótipo. Muda o estado guardado (migração e teste).

## 6. O que não está pedido

- Nenhuma pergunta nova no cadastro nesta etapa.
- Nenhuma sugestão de compra de equipamento (decisão de 03/11).

## 7. Do pacote 2 (15/11/2026): a linha de "Séries por músculo" saía da tela com zoom de 200% (corrigido aqui, com autorização; fica para o design rever)

- **O que acontece:** na tela "A sua semana", com a tela a 206 px de largura (zoom de 200% num celular de 412 px), a linha de um músculo cujo número tem vírgula dos dois lados (por exemplo "0,5 de 9,5") fica 7 px mais larga que a tela, e a página passa a rolar de lado. Medido: o número (`.m-num`) ocupa 85 px e termina em 213 px numa tela de 206 px.
- **Por que apareceu agora:** o teste de ponta a ponta `cenarios.spec.ts › zoom200 · fim-e-semana` usa a Ana depois de um treino. Com o agachamento búlgaro, os números dela eram inteiros ("1 de 5"); com o agachamento goblet (pacote 2), o glúteo passa a ter meia série feita ("0,5 de 9,5"). O defeito da tela já existia para qualquer pessoa com meia série dos dois lados; só não havia um exemplo no teste.
- **Onde está:** `src/styles.css`, `.musculos li` (`grid-template-columns:minmax(88px,30%) 1fr auto`) com `.m-num{white-space:nowrap}`: 88 px do nome, 24 px de espaços e 85 px do número não cabem em 206 px menos as margens.
- **O que foi feito (exceção autorizada pelo Gustavo em 15/11/2026, a única mudança desta sessão em `src/styles.css`):** a regra `.m-num` perdeu o `white-space:nowrap` e ganhou `text-align:right`. O número continua numa linha só enquanto couber (a coluna dele é `auto`); só quebra ("0,5 de" / "9,5") quando a linha não cabe. O teste `fim-e-semana` passa nas sete larguras (claro, escuro, pequeno, baixo, estreito, zoom de 200% e letra de 125%).
- **O pedido ao design:** rever se esse é o melhor jeito (a alternativa é o nome encolher abaixo de 88 px ou a barra ir para a linha de baixo nessa largura) e olhar a tela com um número quebrado dos dois lados.


## 8. Do fechamento da etapa 2 (17/11/2026): o que o design precisa olhar na junção com a `main`

- **A correção do item 7 não precisou ser refeita** (conferido em 17/11, com a `main` já dentro do ramo). O estilo novo da `main` resolve o caso de outro jeito: em tela estreita, a barra do músculo desce para a linha de baixo (`.musculos li`, na regra de tela estreita de `src/styles.css`). O teste `zoom200 · fim-e-semana` passa com a Ana e o número "0,5 de 9,5". Na junção ficou o arquivo da `main`, sem a exceção de 15/11; `src/styles.css` está igual ao da `main`.
- **Os textos novos que o gerador escreve na etapa 2** (para o design rever o tom, sem mudar o sentido): "exercícios de dois lados no lugar dos de um lado só" (no aviso do corte de tempo); "Entrou no lugar de X para o treino caber no tempo: trabalha os dois lados de uma vez, e cada série leva metade do tempo."; "Ficou este, e não X: o treino de hoje já tem Y, que carrega a lombar sem apoio."; "Quatro (ou oito, ou dezesseis) treinos sem melhora: ..." no aviso de estagnação.
- **O aviso de "sem melhora" se repete a cada treino depois que aparece** (17 de 48 sessões no simulador). Avisar uma vez e só voltar depois de outra janela é uma mudança de tela e de regra; está no backlog, para decidir junto com o design.
- **Nas páginas da revisão cega, os revisores sentiram falta do recado "procure avaliação profissional" para quem marca dor forte.** O app já dá esse recado: na triagem e no aviso do programa ("Por causa da dor no ombro, saíram os exercícios que carregam a região. Procure avaliação profissional. Quando a dor baixar, atualize a nota na triagem."). As páginas da revisão cega é que não mostram os avisos. Para o design: conferir se esse aviso fica bem visível na tela da semana de quem marcou dor acima de 5, e não escondido entre os outros.

## 9. Depois da junção (17/11/2026): com zoom de 200%, o nome de uma fase curta não cabia na barra de tempo do guia (corrigido com autorização; fica para o design rever)

- **O que acontecia:** no guia, a barra de tempo (`.timeline`) divide a largura pelas fases do movimento, na proporção da duração de cada uma, e escreve o nome da fase dentro do trecho (`.tseg`, com `overflow:hidden` e `white-space:nowrap`). Com a tela a 206 px de largura (zoom de 200%), o trecho "subida" do agachamento goblet tem 38 px, e a palavra, com a letra de 13 px, precisa de 39,3 px: a última letra é cortada.
- **Por que apareceu agora:** o teste `cenarios.spec.ts › zoom200 · guia` abre o guia do 1º exercício da Ana. Era o búlgaro, cuja barra cabia; desde a etapa 2 é o goblet, em que a subida dura 1,3 s de um ciclo de 4,65 s. O defeito já existia para qualquer exercício com uma fase curta; só não havia um exemplo no teste. Na máquina desta sessão a diferença ficava exatamente na tolerância do teste (1 px) e ele passava; na verificação automática do GitHub, não.
- **O que foi feito (exceção autorizada pelo Gustavo em 17/11/2026, a única mudança desta sessão em `src/styles.css` que está na `main`):** na regra de tela estreita que já existia (`@media (max-width:279px)`), `.tseg{font-size:.6875rem}`: a letra da barra de tempo passa de 13 para 11 px só nessas telas. Medido: "subida" fica com 33,3 px num trecho de 38 px. Em telas de 280 px ou mais, nada muda.
- **O pedido ao design:** rever se esse é o melhor jeito. O conserto resolve o exercício do teste, não a causa: o nome aparece sempre que a fase dura 0,8 s ou mais (`Guia.tsx`), sem olhar se cabe. Um exercício com uma fase de 0,8 s num ciclo longo ainda pode cortar o nome em tela estreita. Caminhos possíveis: mostrar o nome só quando o trecho tem largura para ele; ou abreviar; ou tirar os nomes da barra em tela estreita (a fase já aparece escrita no canto do palco). E conferir se 11 px é uma letra aceitável para o padrão do app (o menor tamanho dos tokens é o rótulo, de 13 px).


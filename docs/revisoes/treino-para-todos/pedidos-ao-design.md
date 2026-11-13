# Pedidos à sessão do design (telas e textos de tela)

> Sessão "treino para todos", etapa 1 (13/11/2026). Esta sessão não mexe em `src/features/` nem no `src/styles.css`. Cada pedido traz o motivo medido. Os textos são rascunho; a palavra final é do design e do Gustavo. Nenhum pedido depende de pergunta nova no cadastro.

## 1. Textos que mudam se a proposta for aprovada (o gerador escreve; o design revisa)

| Onde aparece | Hoje | Proposta | Motivo |
|---|---|---|---|
| "Por que este programa", item do volume, sem foco | "Sem grupo de foco: todos os músculos ficam com ~6 séries por semana…" | "Sem grupo de foco: o tempo do treino é dividido por igual entre os músculos, até ~12 séries por semana cada, o alvo do seu nível. Com pouco tempo, cada um fica com pelo menos ~6, o bastante para crescer, mais devagar." | hoje o texto não bate com o programa em 23 de cada 100 programas (ponderada) |
| Aviso de tempo que sobra, quando não falta exercício | não existe (o dia fica curto sem aviso em 15 de cada 100 programas, ponderada) | "O seu treino completo dura cerca de 45 min: as séries já chegaram ao que rende bem no nível iniciante. Dá para escolher uma duração menor sem perder nada; para usar mais tempo, escolha um grupo de foco." | cuidado 3 (o treino usa o tempo pedido, ou avisa) |
| Aviso quando a dor muda a divisão | não existe | "Por causa da dor no ombro (7 hoje), a semana foi montada em Corpo todo 4x: na divisão recomendada, um dos dias ficaria quase vazio. Quando a dor baixar, atualize a nota na triagem e a divisão recomendada volta." | com dor forte no ombro, no cotovelo ou no quadril, 1 em cada 3 programas tem hoje um dia de menos de 3 exercícios |

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

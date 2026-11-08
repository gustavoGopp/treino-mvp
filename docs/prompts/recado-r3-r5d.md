# Recado para a sessão do R3 (uso real): o que o R5d, "o foco que aparece", muda (08/11/2026)

Este recado é da sessão de desenvolvimento, marco R5d (`docs/prompts/sessao-r5d-foco.md`), na branch `ccr-51eab099-d9eq7w`. Ela **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **O foco usa o tempo primeiro** (`volume.prioridade.foco-primeiro`): com um grupo de foco, o tempo que sobra vai primeiro para o foco (até o máximo do nível, e enquanto as séries diretas dele estiverem abaixo da meta) e só depois para os outros, que ficam pelo menos 6 séries abaixo do foco. Com foco, os isoladores de quem não é foco entram depois das vagas do foco.
- **O 2º exercício do foco** (`volume.prioridade.segundo-exercicio`): o músculo do foco que fica abaixo da meta ganha até 2 exercícios de outra função, num dia da mesma região, se couberem nos minutos.
- **A meta do foco do iniciante** vai de 8 para 10 (o intermediário e o avançado ficam em 12 e 14).
- **O 1º degrau da escada pelo nível** (`progressao.degrau-inicial`): na 1ª vez de um exercício de peso do corpo ou elástico, o intermediário começa no degrau 1 e o avançado no 2. Só vale para exercício sem histórico; o que já tem registro segue do último degrau.
- **A barra só na descida para o iniciante** (`selecao.barra-negativa-iniciante`) e a passagem para a barra no fim da escada dela (`progressao.negativa-para-barra`).
- **"Escolha até 2 grupos de foco"** no cadastro, sem bloquear (`volume.prioridade.ate-dois`).
- 6 regras novas e 3 revistas em `docs/pesquisa/regras.md` (159 linhas no total; eram 153).
- **Armazenamento:** nada muda. O degrau continua guardado como índice (versão 7).

## O que isso faz no programa do Gustavo
- **Se ele treina sem equipamento, com foco nos superiores** (o caso que motivou o marco, medido com a versão fictícia "Gael"): peito e tríceps sobem de ~12 para 15–16 séries por semana; quadríceps e posteriores caem de 11–12 para 9–10. A duração fica parecida (3 dias: 60, 58 e 44 min; antes, 52, 60 e 56). Os exercícios do dia não mudam, só as séries.
- **Na academia**, com foco: pode entrar um exercício a mais para o músculo do foco que não chegava à meta (a Carla ganha a panturrilha sentada no dia Inferior), e um isolador de quem não é foco pode trocar de dia ou sair quando os minutos são poucos.
- **Nos exercícios de peso do corpo que ele nunca fez**, o 1º degrau sugerido é o 1 (intermediário). Os que ele já registrou não mudam.
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele.
3. O retorno dele sobre o foco mais forte (mais flexões e tríceps, menos pernas) é o que mais vale para a próxima rodada; o que ficou está em `docs/backlog.md`, "Do R5d".

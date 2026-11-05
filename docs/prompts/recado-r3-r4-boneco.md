# Recado para a sessão do R3 (uso real): o que entrou na `main` em 05/11/2026 (R4 do boneco)

Este recado é da sessão do R4 do boneco (`docs/prompts/sessao-r4-boneco.md`, `docs/devlog.md`), que fechou o branch `claude/zealous-dijkstra-ecbk4i` e o levou para a `main` (merge sem forçar). Ela **não mexeu** no branch `r3-uso-real`.

## O que entrou na `main`
- **O Boneco com as três regras do R4** (decisão do Gustavo, 05/11): no modo Erros, o certo é a figura cheia e só a parte que erra aparece em vermelho tracejado, com o nome do erro, no instante em que o certo e o errado mais se afastam; os rótulos de técnica saem de cima do corpo; o modo Técnica abre na vista em que o movimento é maior (muda nos dois crucifixos na polia, no face pull e nos pares com elástico, todos para a vista de cima). A legenda do modo Erros mudou. A Silhueta e o Clássico não mudam.
- **16 animações novas**: as 12 do elástico (flexão de joelho, rosca, elevação lateral, crucifixo, stiff, remada sentada, face pull, puxada ancorada no alto, tríceps acima da cabeça, desenvolvimento, agachamento e flexão de braço) e as 4 da auditoria (abdução e adução deitado sem carga, extensão de joelho com elástico, panturrilha sentada com halter). São 139 exercícios, 82 com animação (eram 66); os 16 cartões viraram texto completo.
- Nenhuma regra do gerador e nenhum esquema de armazenamento mudou.

## O que isso faz no programa do Gustavo
- **Provavelmente nada.** Na academia dele (a Carla é a persona mais parecida), nenhuma vaga tem o elástico na frente de uma máquina ou de um halter; o programa da Carla não mudou em nenhum snapshot. O que pode mudar é só o **desempate entre exercícios equivalentes** quando um deles ganhou animação: aconteceu com o Diego (o agachamento com o peso do corpo deu lugar ao agachamento com elástico, no Corpo todo A), que treina em casa com elásticos. Se acontecer com o Gustavo, o aviso "Há uma versão nova do seu programa" aparece, e nada muda sem ele tocar em **Atualizar**.
- **No guia:** o modo Erros mudou de cara em todas as animações (é o que ele pediu em 04/11); os rótulos e a vista inicial mudam em parte delas; 16 cartões viraram animação.
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores. O esquema do armazenamento não mudou neste marco; a cópia continua sendo a rede de segurança.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele, como nos recados anteriores.
3. Se o programa dele mudar, o motivo é o desempate pela animação aprovada (`src/domain/gerador/index.ts`, o penúltimo critério), e o antes × depois das personas está em `docs/revisoes/elastico/README.md`.
4. O retorno dele sobre o modo Erros novo, os rótulos e a vista inicial vale ouro para o próximo marco de cena (`docs/backlog.md`, "Da auditoria independente", itens 4 a 7).

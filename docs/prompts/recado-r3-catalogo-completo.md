# Recado para a sessão do R3 (uso real): o que entrou na `main` em 04/11/2026

Este recado é da auditoria independente (`docs/revisoes/auditoria-fable.md`), que fechou a branch `claude/focused-shannon-7243on` e a levou para a `main` (merge sem forçar). Ela **não mexeu** no branch `r3-uso-real`.

## O que entrou na `main`
- Do catálogo completo (sessões anteriores): doc 11, 25 exercícios novos, 3 itens de equipamento (caneleiras, mini-band, roda abdominal), o boneco com o acabamento A2 como padrão, 12 animações aprovadas (remada sem banco, rosca martelo, 3 de polia e 7 de kettlebell), a pergunta de objetivo (só "ficar mais forte" muda números).
- Da auditoria: **14 animações aprovadas** (6 da suspensão, 3 da bola e das paralelas, 3 das caneleiras, mini-band e roda), as **2 correções** (pike e rosca na polia), **4 exercícios novos** (abdução e adução deitado sem carga, extensão de joelho com elástico, panturrilha sentada com halter), **2 correções do gerador** (o teto semanal já no mínimo de séries; a ordem dos complementos) e o cartão do agachamento com barra. São 139 exercícios, 66 com animação.

## O que isso faz no programa do Gustavo
- **Provavelmente nada.** Na academia dele (a Carla é a persona mais parecida), as vagas de extensora, abdução e adução já tinham a máquina, e os níveis de preferência não mudaram. O programa da Carla não mudou em nenhum dos snapshots.
- **Pode mudar se** ele tiver glúteos como prioridade num modelo de 6 dias (a 3ª vaga de glúteo fica de fora para não passar de 20 séries) ou se, num dia curto, um complemento do grupo prioritário estiver ocupando o lugar do único exercício direto de outro músculo (ombro posterior). Nos dois casos o aviso "Há uma versão nova do seu programa" aparece, e nada muda sem ele tocar em **Atualizar**.
- **No guia:** 14 cartões de texto viraram animação; a rosca na polia e o pike mudaram de desenho (barra de largura fixa; mãos plantadas).
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"). O esquema do armazenamento ganhou o campo "objetivo" (migração testada); a cópia é a rede de segurança.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele, como nos recados anteriores (`recado-r3-equipamento-minimo.md`).
3. Se o programa dele mudar pela ordem dos complementos ou pelo teto, o motivo está em `docs/revisoes/auditoria-fable.md`, Parte B.8.

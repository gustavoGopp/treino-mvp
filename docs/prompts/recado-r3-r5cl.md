# Recado para a sessão do R3 (uso real): o que o R5-CL (biblioteca ampliada) muda (08/11/2026)

Este recado é do marco R5-CL (`docs/devlog.md`, "R5-CL"), no branch `ccr-07e12266-owztzt`. Ele **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **32 exercícios novos** (139 → 171), todos como **cartão de texto** até a animação ser aprovada: 6 de corpo livre, 9 com halteres e banco, 9 com elástico e a barra só na descida, 8 de um equipamento só.
- **Regras novas ou revistas** em `docs/pesquisa/regras.md` (148 no total): o equilíbrio da coxa nos cortes de tempo; com 30 min, o abdômen e a panturrilha protegidos com 2 séries; no último dia da semana, o exercício que já está em todos os outros dias fica por último entre os equivalentes, e, sem equivalente, a função desce um nível antes de repetir; o aviso de puxada vertical diz o que o programa tem.
- **A régua de qualidade na auditoria** (`npm run auditoria:regua`): nenhum defeito pode piorar.
- **Armazenamento:** nada muda. Os ids novos só se somam à biblioteca; nenhum campo nem versão do estado guardado mudou.

## O que isso faz no programa do Gustavo
- **Na academia completa, provavelmente nada.** As duas personas de academia (Bruno e Carla) saem idênticas, de propósito: os exercícios novos de halteres que disputariam o lugar de um animado ficam num nível abaixo.
- **Pode mudar** se ele treina com 30 min, se a semana tem 3 dias ou mais e um exercício se repetia em todos os dias havendo outro equivalente, ou se ele usa outro local com pouco equipamento (a troca do dia ganha alternativas novas, quase todas como cartão de texto).
- **Sem equipamento** (o teste de 06/11 que motivou o marco): 3 dias de 60 min com foco nos superiores passam de 5, 6 e 6 exercícios para 6, 7 e 6, com 15 exercícios diferentes na semana em vez de 11 (antes e depois em `docs/devlog.md`).
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele, exercício por exercício.
3. O retorno dele sobre os cartões de texto (são legíveis no meio da série?) e sobre a variedade nova é o que mais vale para o R5-anim e o R5d.

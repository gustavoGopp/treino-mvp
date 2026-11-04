# Recado para a sessão do R3 (uso real): o que a sessão de catálogo completo deixou pronto (04/11/2026)

Este recado é da continuação da sessão de catálogo completo (`docs/prompts/sessao-catalogo-continuacao.md`), na branch `claude/focused-shannon-7243on`. Ela **não mexeu** no branch `r3-uso-real` e **ainda não foi para a `main`**: a ida depende da revisão do Gustavo.

## O que está na branch (e ainda não na `main`)
- O que já estava desde a sessão anterior: doc 11 (catálogo), 25 exercícios novos (135 no total, com ficha e cartão), 3 itens de equipamento novos (caneleiras, mini-band, roda abdominal), o boneco com o acabamento A2 como padrão e 12 animações aprovadas (remada sem banco, rosca martelo, 3 de polia e 7 de kettlebell).
- **Desta continuação, nada entra no app até o "aprovar" do Gustavo:** 14 animações novas em revisão (6 da suspensão, 3 da bola e das paralelas, 3 das caneleiras, mini-band e roda), com folhas e conferência escrita em `docs/revisoes/catalogo/`, e 2 correções de animações aprovadas (pike e rosca na polia). As 5 peças novas estão no motor (`src/engine/desenho.ts`) sem uso no app. As 40 animações antigas foram conferidas: 38 batem com a ficha; as 25 do guia original ganharam ficha curta.
- A auditoria e o mapa do catálogo foram regravados com os 135 exercícios (`docs/revisoes/auditoria/`, `docs/revisoes/catalogo/`); a versão de 110 ficou guardada em `docs/revisoes/catalogo-completo/antes-110/`.

## O que isso faz no programa do Gustavo
- **Nada, por enquanto.** Nenhuma animação foi aprovada nesta continuação, nenhum id de exercício mudou e nenhuma regra do gerador mudou. O programa dele no celular é o da `main`.
- **Quando as 14 forem aprovadas:** medido com as 6 personas e o 2º local do Bruno, nenhum programa muda (os exercícios novos são do nível 2 das suas vagas; na academia, os do nível 1 continuam ganhando). No cadastro dele, a Carla é a persona mais parecida: a suspensão, a bola e as caneleiras só entram se ele as marcar e se a vaga não tiver opção de academia.
- O aviso "Há uma versão nova do seu programa" só aparece se o programa calculado mudar, e ele só muda se tocar em **Atualizar**.

## Como o `r3-uso-real` recebe
1. Nada a fazer até a branch ir para a `main` (só com o ok do Gustavo, por rebase ou merge, sem forçar).
2. Depois da `main`: atualizar o `r3-uso-real` só quando o Gustavo pedir; antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele (como no recado anterior, `recado-r3-equipamento-minimo.md`).

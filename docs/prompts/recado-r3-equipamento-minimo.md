# Recado para a sessão do R3 (uso real): o que entrou na `main` em 04/11/2026

Este recado é da sessão de catálogo completo e fechamento do equipamento mínimo (`docs/prompts/sessao-catalogo-e-fechamento.md`). Ela **não mexeu** no branch `r3-uso-real`.

## O que entrou na `main`
O trabalho do equipamento mínimo e o fechamento dele. Os detalhes estão em `docs/revisoes/equipamento-minimo.md`, seção "Decisões da sessão de fechamento", e no `docs/devlog.md`.
- **"Corpo livre"** e os exercícios de peso do corpo: flexão com as mãos juntas, pike, flexão de joelho deslizante e nórdico.
- **9 animações novas, aprovadas pelo Gustavo folha a folha:** agachamento, afundo e búlgaro com o peso do corpo, barra fixa supinada, ponte de glúteo, flexão com as mãos juntas, pike, flexão de joelho deslizante e nórdico. As 31 animações anteriores não mudaram.
- **Escada própria de cada exercício** de peso do corpo e de elástico. As faixas ficaram mais estreitas, e os degraus que pedem um móvel trazem a alternativa para quem não o tem.
- **Avisos juntos e mais curtos**, e dois avisos novos:
  - tempo que sobra por falta de exercício (`tempo.sobra`);
  - mãos fechadas na flexão para quem tem dor leve no punho (`tecnica.flexao.punho`).

## O que isso faz no programa do Gustavo
- **O programa salvo não muda sozinho.** Quando o programa calculado difere do salvo, o app mostra "Há uma versão nova do seu programa", e só muda se ele tocar em **Atualizar**. O estado continua na versão 7, e nenhuma migração reescreve o programa.
- **Nenhum id de exercício foi removido nem renomeado**, então os dados exportados dele continuam carregando.
- **O que muda sem ele tocar em "Atualizar":** nos exercícios de peso do corpo e de elástico, a sugestão de progressão passa a seguir a escada própria de cada exercício. Nos de halter, barra e máquina, nada muda.
- O Gustavo exportou os dados antes da entrada na `main` ("Meus dados" → "Guardar uma cópia").

## Como o `r3-uso-real` recebe
Pelas regras do R3 (`docs/prompts/sessao-r3.md`), a `main` é o que vai para o celular e "o programa dele só muda quando ele pede". Sugestão:
1. Atualizar o `r3-uso-real` a partir da `main` só quando o Gustavo pedir.
2. Antes de ele tocar em "Atualizar" no app, mostrar o antes e o depois do programa dele.

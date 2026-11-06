# Recado para a sessão do R3 (uso real): o que a sessão de qualidade dos treinos muda (06/11/2026)

Este recado é da sessão de qualidade dos treinos gerados (`docs/prompts/sessao-qualidade-treinos.md`, `docs/revisoes/qualidade-treinos.md`), no branch `claude/treino-generator-quality-isnutx`. Ela **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **A vaga sem exercício possível** (decisão 1): a vaga vazia por equipamento recebe outra função do mesmo músculo, se ele estiver abaixo da meta, nunca como o 3º empurrar de um dia sem puxar; nos dias com vaga vazia, as séries sobem até o alvo do nível dentro dos tetos e dos minutos; o aviso de sobra de tempo passa a olhar o dia típico e a valer também com dor.
- **O Corpo todo 6x** (decisão 2), só para quem tem 6 dias e não tem como puxar; não aparece nas opções da tela.
- **A prioridade explicada** (decisão 3): o porquê diz "foco com manutenção"; com 2 focos ou mais e um prioritário abaixo da meta, um aviso diz quanto faltou.
- **O 2º empurrar sem banco inclinável** (decisão 4), **o abdômen e a panturrilha protegidos de ficar a zero** e a vaga de abdômen quando ele é prioridade (decisão 5), **os ajustes pequenos** (decisão 6: elevação lateral no dia B de 2 dias, tríceps na suspensão, nórdico de 6 a 10, coice na polia no 1º nível do glúteo, o porquê da panturrilha no chão) e **o ombro de trás como secundário da barra fixa supinada e da puxada com elástico** (decisão 7, com o desenho e o texto do guia e as linhas de base visuais regravadas).
- 7 regras novas e 14 revistas em `docs/pesquisa/regras.md` (141 no total); 94 fontes novas em `docs/pesquisa/fontes.md`, todas conferidas no PubMed ou no Crossref.
- **Armazenamento:** a lista de divisões ganhou `ct-6x`. Programas salvos continuam válidos (a lista só cresceu); nenhum campo mudou.

## O que isso faz no programa do Gustavo
- **Provavelmente só o texto.** Na academia dele, nenhuma vaga fica vazia por equipamento, então as decisões 1, 2 e 4 não agem. Muda o "porquê" da prioridade em todos os programas com foco, e, se ele tiver 2 focos ou mais e um deles abaixo da meta, aparece o aviso de focos que competem (a Carla, a persona mais parecida, recebe "panturrilha 12 de 14").
- **Pode mudar** se ele treina 30 min (o abdômen e a panturrilha entram mesmo com o treino cheio), se usa a barra fixa supinada (o ombro de trás passa a contar meia série) ou se o glúteo dele tem polia e não tem hip thrust nem coice na máquina (o coice na polia subiu de nível).
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele, como nos recados anteriores.
3. Se o programa dele mudar, os motivos possíveis estão na Parte F de `docs/revisoes/qualidade-treinos.md`, decisão por decisão, com o antes e o depois das personas.
4. O retorno dele sobre o treino sem equipamento (o caso que motivou a sessão) e sobre o aviso de focos que competem é o que mais vale para a próxima rodada: os itens que ficaram estão em `docs/backlog.md`, "Da qualidade dos treinos gerados".

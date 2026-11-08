# Briefing do agente 1: Retenção e motivação (o que faz a pessoa voltar)

Leia primeiro `docs/revisoes/redesign/briefings/00-comum.md`. Relatório: `docs/revisoes/redesign/agente-1-retencao.md`. Scripts e imagens: pastas `agente-1`.

**Objetivo em uma frase:** descobrir o que, nas telas de início (`/programa`), fim do treino (`/treino/fim`), semana (`/semana`) e evolução (`/evolucao/:exId`), faz a pessoa abrir o app no dia certo, começar o treino e sentir que progrediu, **sem manipulação**.

**Fronteira:** você cuida do que faz a pessoa **voltar**. O que acontece dentro do treino (séries, descanso, guia) é do agente 3; a forma visual dos componentes é do agente 4; cor é do agente 5. Você propõe o conteúdo, a ordem e o momento de cada mensagem e componente; pode rascunhar em texto ou ASCII.

**Já decidido no projeto (leia antes):** `design-v2.md` seção 2 "Exercício e motivação" (Teixeira 2012, Mazeas 2022, Conroy 2014/2015, Lally 2010 e a posição: sem medalhas, sequências que quebram ou confete; "semana com menos treino é dado, não falha"). O acompanhamento que já existe: `docs/pesquisa-v2/07-progressao-e-acompanhamento.md`, `src/features/acompanhamento/`, `src/features/treino/Resumo.tsx`, `src/features/programa/Programa.tsx` (pausa detectada, semana leve, "a sua semana", evolução por exercício, sugestão para a próxima vez, "Como foi hoje?").

**Estude (com fonte e selo):**
1. Técnicas de mudança de comportamento com evidência em apps de atividade física: retorno sobre o desempenho (feedback), metas, automonitoramento, autoeficácia, autonomia (teoria da autodeterminação), planejamento de intenção (quando e onde), lembretes (o app não tem notificação hoje: proponha só com permissão e sem culpa, ou proponha não ter). Revisões sistemáticas e meta-análises primeiro (Michie, taxonomia BCT; Direito; Romeo; Yang; Mazeas; etc.: confira o que existe de verdade).
2. Gamificação: o que a literatura diz do efeito e da queda após o fim (Mazeas 2022 já está no projeto; procure o que há de mais recente).
3. Formação de hábito e a volta depois de faltar (Lally 2010; Gardner; o que acontece com a adesão depois de 1, 2 e 3 semanas sem treinar; o que o app já faz: readaptação e volta gradual).
4. Os apps de referência que o Gustavo e o público conhecem: **Strong, Hevy, Fitbod, Freeletics, Nike Training Club** e **Duolingo como contraste**. Para cada um, descreva o que fazem nas telas de início, fim do treino e histórico (pelo que conseguir ver em sites, lojas, documentação e análises públicas; não invente telas), e classifique cada padrão como: tem evidência, é hábito de mercado, ou vai contra a posição do projeto.

**Entregue:**
- Os **5 momentos que mais importam para a volta** (ex.: a 1ª abertura depois do 1º treino; a volta depois de faltar; o fim do treino; o dia de treino chegando; a 4ª semana), cada um com a evidência.
- Para cada momento, **uma proposta de tela ou componente**, com rascunho em texto ou ASCII, dizendo que dado ela usa e se o dado já existe no estado (`src/storage/esquema.ts`: `historico`, `sessaoAtual`, `semanaLeve`, `respostas`) ou é pedido ao domínio.
- A **lista do que não fazer**, com motivo e fonte.
- O que, do acompanhamento que já existe, está bom e deve ficar (com a medida ou fonte), e o que está fraco.
- Se a tela precisa de dado novo (ex.: "melhor série" por exercício já existe em `Evolucao.tsx`?), confira no código antes de pedir.

Marque tudo como [medido], [fonte: ..., selo] ou [opinião].

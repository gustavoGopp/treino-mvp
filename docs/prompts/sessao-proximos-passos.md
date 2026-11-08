# Prompt: sessão de próximos passos (o que temos hoje e onde investir a seguir)

> Escrito em 06/11/2026, ao fim da sessão de qualidade dos treinos gerados, a pedido do Gustavo. Cole numa sessão nova do Claude Code, **em modo plano**, com o repositório `gustavoGopp/treino-mvp`. É uma sessão de **diagnóstico e decisão**: mede, pesquisa, compara e propõe, mas não implementa nada no app. Tudo abaixo da linha é o prompt.

---

Você vai conduzir a **sessão de próximos passos** do treino-mvp. É um web app (PWA, Vite + React + TypeScript) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino na academia com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**O que ele quer desta sessão.** Um retrato honesto e medido do que o app tem hoje e uma recomendação de **qual parte desenvolver mais**, com o porquê. As frentes que ele citou:
- a qualidade dos treinos;
- a quantidade de variação;
- as combinações de músculos por dia;
- a experiência de uso no aplicativo;
- **uma opção para a pessoa montar o próprio treino**, com um **avaliador** que analise a qualidade do que está sendo treinado e diga se algum grupamento muscular ou área deve ser ajustado, ou não.

Ele também pediu "qualquer outro ponto que você puder sugerir". O resultado é um mapa priorizado, de 2 a 3 próximos marcos com o aceite de cada um e um rascunho de prompt para cada marco. Quem escolhe é ele.

**Outra sessão está trabalhando no frontend agora.** É o redesign visual completo com uma equipe de agentes. O prompt é `docs/prompts/sessao-redesign-visual.md`, na branch `claude/lucid-gauss-6fk7qg`. A branch de trabalho é `claude/inspiring-rubin-njhaz8`, ainda fora da `main`.
- Ela está refazendo o seguinte, com as decisões e os relatórios em `docs/revisoes/redesign/` naquela branch:
  - as cores, a letra e os componentes (`src/styles.css`, `src/features/app/ui.tsx`, `Folha.tsx`);
  - o selo de evidência, que abre as fontes (`src/conteudo/fontes.json`);
  - os testes de toque, contraste e texto cortado (`tests/e2e/`).
- Esta sessão **não mexe** nesses arquivos nem naquela branch. Ela lê a branch com `git fetch origin` e `git show origin/claude/inspiring-rubin-njhaz8:<arquivo>`, e trata o que o redesign já decidiu como dado.
- Tudo o que for tela vira **pedido à sessão de design**, numa lista própria. Tudo o que o redesign pediu ao domínio entra na sua matriz. Se uma ideia sua esbarrar numa decisão do redesign, registre o choque e deixe a escolha para o Gustavo.

**Onde o projeto está (leia antes de propor qualquer coisa)**
- **Princípios:** `CLAUDE.md`. São inegociáveis: evidência com selo e fonte; gerador determinístico e testável; segurança; privacidade (LGPD); qualidade do guia; uso na academia; simplicidade. O escopo também está lá: nutrição, login, nuvem, pagamentos, app nativo, social, relógios, cardio prescrito e deload automático estão fora do MVP.
- **Plano e marcos:** `docs/PLANO-MVP.md`, com os critérios de sucesso (seção a) e os marcos (seção i).
  - Concluídos: M0 a M5, R0b, R0c, R1, R1b, R2 e o R4 do boneco.
  - O R3, o uso real do Gustavo por 4 semanas, corre na branch `r3-uso-real`, que você não toca.
  - O R5 ("decidir com o uso") está em aberto: esta sessão é, na prática, a proposta do R5.
- **Histórico:** `docs/devlog.md` (as entradas de 01/11 a 06/11 contam tudo o que entrou) e `docs/backlog.md` (o que está pendente, decidido e descartado; não proponha de novo o que foi descartado sem um motivo novo).
- **Pesquisa:** `docs/pesquisa/00-metodo.md` (os selos e os status de leitura), `docs/pesquisa/regras.md` (141 regras com selo e fonte, de onde sai `src/domain/regras/regras.json`), `docs/pesquisa/fontes.md` (331 fontes) e `docs/pesquisa-v2/` (01 a 15; prevalece onde houver conflito).
- **Revisões e auditorias:**
  - `docs/revisoes/qualidade-treinos.md`, a mais recente: a grade de 911 mil programas, 9 pesquisas por músculo, as combinações por dia, a prioridade, as 7 decisões e os custos;
  - `docs/revisoes/auditoria-fable.md`, `auditoria-treino.md`, `catalogo-completo.md`, `equipamento-minimo.md`, `anatomia.md`, `design.md` e `design-v2.md`.
- **Domínio:** `src/domain/`, funções puras e testadas.
  - `gerador/` tem `gerarPrograma`, as divisões, as 22 funções por nível e as opções de rotina.
  - `biblioteca/exercicios.json` tem 139 exercícios.
  - Os outros módulos: `progressao/` (dupla progressão, escadas de peso do corpo e elástico), `acompanhamento/` (a semana, a evolução, as pausas), `sessao/`, `locais/` (vários locais e trocas), `triagem/` (PAR-Q+), `nivel/`, `taxonomia/` e `visao/`.
- **Telas:** `src/features/` (onboarding, programa, treino, guia, acompanhamento, dados, locais, e `dev/GeradorDev.tsx`, a tela de teste do gerador). O estado guardado no aparelho está em `src/storage/`; ele só muda com migração e teste.
- **Medidas:** `npm run auditoria` (estresse, catálogo, anatomia, equipamento mínimo e a grade de qualidade; `npm run auditoria:verificar` confere duas rodadas idênticas), `npm run check`, `npm run test:e2e`, `tests/unit/__snapshots__/` (os programas das 6 personas fictícias, revisados pelo Gustavo) e `tests/personas/index.ts`.

**O que já se sabe e vale medir de novo, para você não partir do zero**
- **Exercícios por treino.** Com pouco equipamento, ainda há dias curtos: 6,6% dos dias de 45 min ou mais têm 3 exercícios ou menos. Na academia completa, 25,5% dos programas de 45 min ou mais usam menos de 70% dos minutos, porque a lista de vagas do dia e o teto de 4 séries param o dia antes (backlog: "Mais séries para todos quando sobra tempo", E-c).
- **Variação entre semanas.** A regra `selecao.variacao` ("manter os exercícios no bloco de 4 a 8 semanas e variar de forma sistemática dentro da função", moderada, `kassiano2022` e `fonseca2014`) está em `regras.md`. Mas **nenhum código a usa**: o programa repete os mesmos exercícios indefinidamente, e a troca só acontece pelo "Prefiro este", pela alternativa do dia ou pela mudança de local. A sugestão "troque por uma variação equivalente" só aparece como 4º passo do platô (`progressao/index.ts`). Confirme isso no código e meça.
- **Monotonia.** O mesmo exercício em todos os dias aparece em 39,9% dos programas da grade, puxado pelo Corpo todo 6x sem equipamento.
- **Prioridade.** Funciona como "foco com manutenção". No avançado, pernas prioritárias ficam abaixo da meta em 96% dos programas. Duas ou três prioridades disputam o tempo e hoje recebem um aviso. Itens pendentes no backlog: D-3, D-4 e D-5.
- **A pessoa não monta nem edita o treino.** Ela pode:
  - dizer "Prefiro este" entre equivalentes do mesmo nível (`src/features/programa/Prefiro.tsx`);
  - trocar pela alternativa só naquela sessão;
  - evitar exercícios e equipamentos no cadastro;
  - escolher a divisão entre as oferecidas.

  Não existe tela para montar dias, acrescentar ou tirar um exercício, nem avaliador de um programa que não saiu do gerador. As peças de domínio que um avaliador usaria já existem e são testadas:
  - séries por músculo com meia série indireta (`volumePorMusculo`);
  - metas por nível e prioridade (`metasDoPerfil`);
  - tetos por sessão e por semana;
  - avisos com `regraId`;
  - as regras `selecao.*` (funções complementares, alongado, isoladores);
  - o equilíbrio entre empurrar e puxar;
  - as invariantes de `tests/unit/gerador.test.ts`.

**Regras desta sessão**
- **Conta:** o projeto é acessado só pelas contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca pela da Futurum. Tudo o que é produzido fica no git, e só no git: nada de publicar páginas, artefatos ou documentos fora do repositório.
- **Branches e dados:** não mexa no branch `r3-uso-real` nem na branch do redesign. `privado/` nunca é versionado nem usado; as personas de teste são fictícias (`tests/personas/`).
- **Branch de trabalho:** uma nova a partir da `main` (`6cb49d5` ou mais recente), ou a que a sessão indicar. **Só documentos:** `docs/revisoes/`, `docs/prompts/`, `docs/pesquisa*/` (fontes e pesquisa nova), `docs/backlog.md` e `docs/devlog.md`. Nada em `src/`, `tests/` ou `scripts/` vai para o git. Protótipos para medir (um avaliador de teste, uma variação de exercícios, uma grade nova) ficam no scratchpad ou na árvore de trabalho sem commit, e são descartados depois que os números forem registrados.
- **Rede:** está liberada. Leia o que precisar (PubMed, PMC, Crossref, periódicos abertos) e registre cada fonte nova em `docs/pesquisa/fontes.md` com o status de leitura. Nunca contorne bloqueio anti-robô: Springer, Wiley, LWW e Taylor & Francis bloqueiam, então a fonte fica `NÃO VERIFICADO` ou o PDF entra por `privado/`. **Nada de inventar estudo.**
- **Selos:** toda afirmação técnica leva o selo e a fonte. O que é prática de treinadores é "consenso"; o que é a sua opinião é "[opinião]"; o que vem de apps de mercado é "[mercado]", descrito e nunca tomado como evidência.
- **Subagentes:** um por frente, em paralelo, todos com o mesmo modelo de relatório (abaixo). Quem consolida é você. Confira no PubMed ou no Crossref cada fonte que eles citarem antes de registrar, e marque `NÃO VERIFICADO` o que não conseguir conferir. Um subagente recebe a pergunta e o material, não a sua hipótese para confirmar.
- **Commits:** pequenos, em pt-BR e no imperativo, com push. A `main` só recebe com o ok do Gustavo.

**Modelo de relatório de cada frente** (em `docs/revisoes/proximos-passos/<frente>.md`)
1. **O que existe hoje**, com arquivo, regra e número medido.
2. **O que falta**, medido por script sempre que der: quantos programas, personas ou telas são afetados.
3. **O que a evidência diz**, numa tabela "pergunta | resposta | selo | fontes (PMID ou DOI, status)".
4. **Valor para quem usa**, dizendo para qual persona e em que momento do uso, sem exagero.
5. **Opções:** de 2 a 4, com esforço (dias), risco, o que muda em regra, dado e armazenamento, as dependências e o choque com o redesign ou com o R3.
6. **Recomendação marcada**, com o porquê.

**As frentes (Fase 2)**
- **A. Qualidade, variação e combinações dos treinos.**
  - Os itens que ficaram no backlog, "Da qualidade dos treinos gerados" e "Da auditoria independente": D-3, D-4, D-5, E-c, B.4, B.9, B.14, B.17, C.5, C.6, F.5, F.9 e a panturrilha no degrau. Para cada um: o que ganha, o que custa, medido na grade (`npm run auditoria:qualidade`) e nas personas.
  - **Variação ao longo das semanas:** como aplicar `selecao.variacao` (blocos de 4 a 8 semanas, troca dentro da função, sem sorteio e determinística) e o que isso faz com a progressão e o histórico (`progressao/`, `acompanhamento/`, R1b).
  - Monotonia e divisões; a quantidade de exercícios possíveis por cenário de equipamento e onde a biblioteca é fina (funções com 1 opção só nos cenários mais comuns).
- **B. "Monte o seu treino" e o avaliador.** É a frente nova que o Gustavo pediu. Responda:
  - **O avaliador, primeiro e sozinho.** Ele recebe qualquer programa (o gerado, um editado, um montado do zero) e devolve:
    - por músculo: séries por semana contra a meta e contra o piso, a frequência e se faltam as funções que se complementam;
    - o equilíbrio entre empurrar e puxar e entre a frente e as costas da coxa;
    - o tempo de cada dia contra os minutos;
    - as séries acima do teto;
    - os exercícios que a dor ou o equipamento impedem.

    Cada achado sai com o `regraId`, o selo e um texto curto do que ajustar, ou "está bom". Diga quanto do domínio de hoje já serve: provavelmente quase tudo, porque o gerador já calcula isso para si. Diga também o que falta. Monte um protótipo descartável e avalie com ele as 6 personas, alguns programas da grade e 2 ou 3 programas clássicos de treinadores, digitados à mão como dado de teste, com a fonte do programa.
  - **A edição:** acrescentar, tirar e trocar um exercício, mudar séries, mudar a ordem, montar um dia do zero. Defina:
    - o que acontece com a progressão, o histórico, os locais e a semana leve quando o programa deixa de ser do gerador;
    - o modelo de dado e a migração do armazenamento;
    - como o "Atualizar programa" convive com um programa editado (não apagar o trabalho da pessoa).
  - **Riscos:** a pessoa montar algo inseguro ou sem sentido. O avaliador orienta e não bloqueia, salvo segurança, que segue o princípio do `CLAUDE.md`.
  - **IA:** ler um programa de fora a partir de texto livre ou de uma foto seria um uso novo de IA. Hoje a IA só reconhece equipamento nas fotos e, se fizer sentido, redige explicações a partir das regras. É decisão do Gustavo, com o custo, a privacidade e o determinismo de cada lado. A opção sem IA (escolher os exercícios da biblioteca) é sempre a primeira.
  - Os pedidos de tela desta frente vão para a lista do design, em texto ou ASCII, sem protótipo visual que concorra com o redesign.
- **C. Experiência de uso, só a análise de fluxo e de função** (o visual é do redesign).
  - Percorra por script (Playwright, Pixel 7) os caminhos das 6 personas: cadastro, primeiro programa, treino, fim do treino, semana, evolução, troca de local, dor e volta da pausa.
  - Liste onde falta função (o que a pessoa quer fazer e não consegue), onde o texto não explica (o "porquê", os avisos, a prioridade) e onde o app pede mais do que precisa.
  - Cruze com os relatórios do redesign para não repetir o que ele já cobre.
  - A saída é uma lista de **pedidos à sessão de design** e de **pedidos ao domínio**, cada um com o motivo medido.
- **D. Progressão e longo prazo** (o que acontece depois da 4ª semana).
  - Blocos e ciclos, a semana leve (hoje sugerida, nunca automática: `deload.semana-leve`), o platô, a reavaliação do nível, a mudança de objetivo e a troca de exercícios ao fim do bloco (liga com a frente A).
  - O que o R3 já mostrou: leia o `docs/backlog.md` e as entradas do R3 no `docs/devlog.md`, sem tocar na branch dele.
  - O que a evidência diz sobre a progressão em treinados e sobre a aderência a longo prazo.
- **E. Produto e abertura a outras pessoas.**
  - O que falta para alguém além do Gustavo usar com segurança: termos de uso e LGPD (o consentimento do dado de saúde), o limite da visão compartilhado entre instâncias (backlog), o eval da foto com fotos reais, cópia e restauração dos dados, offline, idiomas, acessibilidade medida (Lighthouse) e onboarding de quem nunca treinou.
  - O que se pode medir sem coletar dado pessoal.
  - Sugira também o que você achar que falta e não está em nenhuma frente, com o motivo.

**Fases**
1. **Fase 0, o plano (você está em modo plano).** Leia o material. Apresente ao Gustavo:
   - as frentes, com ajustes e o porquê de cada um;
   - os briefings em 3 linhas cada;
   - o que roda em paralelo;
   - os pontos de parada;
   - até 5 perguntas cujas respostas mudariam o trabalho. Por exemplo: o app vai abrir para outras pessoas nos próximos meses? "Montar o próprio treino" é para ele, para treinadores ou para quem já treina? O avaliador deve aceitar programas de fora?

   Espere a aprovação.
2. **Fase 1, o retrato medido.** Rode `npm run check`, `npm run test:e2e` e `npm run auditoria` na `main`. Monte `docs/revisoes/proximos-passos.md`, parte 1, "O app hoje", com:
   - o que cada tela faz;
   - as 141 regras por selo;
   - o catálogo por cenário de equipamento;
   - os números da grade de qualidade;
   - o backlog agrupado por frente e por estado (pendente, decidido, descartado);
   - o que o redesign está mudando.

   Tudo por script e com a fonte de cada número.
3. **Fase 2, as frentes em paralelo.** Lance os 5 subagentes (A a E) com os briefings completos e receba os relatórios.
4. **Fase 3, a síntese.** Escreva a parte 2 de `proximos-passos.md`:
   - uma matriz com as linhas pelas opções de todas as frentes e as colunas valor, esforço, evidência (selo), risco e dependência, com a sua recomendação marcada;
   - os 2 ou 3 marcos propostos, na ordem, cada um com o aceite medido (como os marcos de `PLANO-MVP.md`, seção i);
   - a lista de pedidos à sessão de design;
   - o que fica para depois e por quê.

   Para cada marco proposto, escreva o rascunho do prompt em `docs/prompts/sessao-<nome>.md`, no formato de `sessao-qualidade-treinos.md`.
5. **Fase 4, a parada.** Apresente ao Gustavo, em linguagem simples, o retrato, a matriz e os marcos, **item a item, sem nada pré-marcado** além da sua recomendação indicada como tal. Pare e espere. Depois da escolha:
   - atualize `PLANO-MVP.md` (seção i, o R5 e os marcos novos), o `backlog.md` e o `devlog.md`, com a entrada da sessão e o rascunho de post;
   - leve para a `main` só com o ok dele, por merge sem forçar push.

**O que não fazer**
- Não implemente nada no app: nem regra, nem tela, nem dado. Esta sessão decide o que vem; a próxima faz.
- Não mexa em `src/features/`, `src/styles.css`, `tests/e2e/` nem na branch do redesign; não redesenhe telas.
- Não troque a lógica "vaga por função, nunca por equipamento" nem o determinismo, nem proponha IA no lugar das regras do gerador.
- Não proponha de novo o que o backlog descartou sem um motivo novo e medido.
- Não afirme nada sobre treino sem selo e fonte. "Todo mundo faz" vira "consenso" ou "[mercado]", e "acho que" vira "[opinião]".

# Prompt: sessão do M3 (onboarding, inventário e programa)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.

---

Você vai executar o **marco M3** do treino-mvp. É um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado.

## 1. Onde o projeto está
- Repositório: https://github.com/gustavoGopp/treino-mvp (branch `main`). Produção: https://treino-mvp-sigma.vercel.app (deploy automático a cada push na `main`).
- **M0, fundação:** Vite + React + TypeScript, PWA, ESLint, Vitest, Playwright e CI no GitHub Actions. O deploy na Vercel já funciona.
- **M0-R, pesquisa:** `docs/pesquisa/`, com 77 regras em `regras.md`, cada uma com selo de evidência e fonte.
- **M1, motor de animação:** portado para `src/engine/`. A tela do guia fica em `/guia/:id`. A regressão visual compara com o guia original, com 0 pixel de diferença.
- **M2, domínio** (`src/domain/`): taxonomia de equipamentos, biblioteca de 73 exercícios, gerador determinístico, triagem, progressão e 4 personas fictícias. Há uma tela de inspeção em `/dev/gerador`, que só existe em desenvolvimento.
- **M2.1, ajustes de uma revisão independente** (`docs/revisoes/2026-10-30-revisao-m2.md`):
  - a regra de ordem da sessão foi corrigida;
  - os cortes de tempo respeitam a prioridade da pessoa;
  - o app avisa, músculo por músculo, o que ficou abaixo da meta;
  - nova função `opcoesDeAjuste`, com as escolhas calculadas;
  - regressão visual determinística (Chromium rasterizando num fio só, sem novas tentativas).

## 2. Leia antes de qualquer coisa
1. `CLAUDE.md`: princípios não negociáveis e convenções.
2. `docs/PLANO-MVP.md`: seções b (jornada), c (escopo), d (arquitetura), e (modelos de dados) e a linha do M3 em i (marcos).
3. `docs/pesquisa/README.md` e, em `docs/pesquisa/regras.md`, as regras `seguranca.*`, `nivel.classificacao` e `tempo.*`.
4. O domínio que você vai ligar às telas:
   - `src/domain/gerador/index.ts`: `gerarPrograma`, `Perfil`, `GRUPOS`, `NOME_MUSCULO`;
   - `src/domain/gerador/opcoes.ts`: `opcoesDeAjuste`;
   - `src/domain/triagem/index.ts`: `PERGUNTAS`, `avaliarTriagem`;
   - `src/domain/taxonomia/equipamentos.ts`: `ITENS`, `inventarioSchema`, `cargasHalter`;
   - `src/domain/regras/index.ts`: `REGRAS`, para mostrar o selo de evidência.
5. `src/features/dev/GeradorDev.tsx`: já mostra o programa com o "porquê" e os selos. Reaproveite a ideia, não o visual de depuração.
6. `docs/devlog.md` e `docs/revisoes/2026-10-30-revisao-m2.md`.

## 3. Escopo do M3
1. **Boas-vindas e aviso.** O que o app faz e o que não faz (não diagnostica; é uma ferramenta de orientação, não uma prescrição).
2. **Triagem.**
   - Use as perguntas de `src/domain/triagem` (são próprias do app; o texto oficial do PAR-Q+ só entra depois de confirmada a licença).
   - Qualquer "sim" bloqueia o programa automático e mostra o motivo e a recomendação.
   - A pessoa só segue se confirmar que foi avaliada e liberada.
   - "Sim" apenas na pergunta osteoarticular abre a escolha de regiões, e os exercícios dessas regiões são excluídos.
3. **Perfil.**
   - Nível pela regra `nivel.classificacao`: perguntas simples sobre tempo de treino contínuo e técnica; na dúvida, classificar para baixo.
   - Semanas sem treinar, dias por semana (2–5), minutos por sessão, grupos prioritários, exercícios a evitar, equipamentos a evitar e dores (articulação e intensidade de 0 a 10).
4. **Inventário por checklist** da taxonomia, agrupado por categoria, com os atributos que mudam a prescrição:
   - faixa e passo dos halteres fixos;
   - anilhas (kg e quantidade) e manoplas;
   - polia simples ou dupla, com altura regulável ou não;
   - banco que declina ou não;
   - número de intensidades de elástico.

   Validação com `inventarioSchema`. A foto fica para o M4: deixe só o lugar reservado, sem botão funcional.
5. **Tela do programa.**
   - Divisão e dias com exercícios, séries × repetições, RIR, descanso e minutos estimados.
   - O "porquê" de cada decisão com o selo de evidência da regra.
   - Avisos, inclusive os de meta por músculo.
   - Fases (readaptação ou aprendizado).
   - Alternativas de cada exercício e link para `/guia/:animacaoId` quando houver animação; sem animação, um cartão de texto.
   - **As escolhas calculadas de `opcoesDeAjuste`:** a pessoa vê as opções (por exemplo, "4 treinos de 45 min") com o que cada uma resolve e escolhe uma. Ao escolher, o perfil é atualizado e o programa é gerado de novo. Nada muda sem a escolha dela.
6. **Armazenamento local.**
   - IndexedDB com `idb-keyval` (dependência já prevista no plano).
   - Esquema versionado, com função de migração e teste.
   - Nada sai do aparelho.
7. **Exportação e importação em JSON**, com validação na importação.
8. **Mobile-first, acessível e utilizável com uma mão:**
   - áreas de toque de pelo menos 44 px;
   - contraste;
   - foco visível;
   - rótulos;
   - `prefers-reduced-motion`;
   - pt-BR em tudo.

**Fora do M3:** foto e visão (M4); sessão de treino, registro de séries, temporizador e progressão na tela (M5); login e nuvem.

## 4. Critérios de aceite (verificáveis)
- **E2E:** do zero ao programa gerado em menos de 5 minutos, com uma persona fictícia percorrendo triagem, perfil, inventário e programa.
- **E2E:** triagem com "sim" bloqueia, e confirmar a liberação desbloqueia.
- **E2E:** escolher uma opção calculada gera de novo o programa com o novo perfil.
- **Persistência:** recarregar a página mantém o perfil, o inventário e o programa.
- **Exportação:** exportar, limpar os dados e importar devolve o mesmo estado.
- **Acessibilidade:** Lighthouse ≥ 90 no celular.
- **Testes e deploy:**
  - `npm run check` e `npm run test:e2e` verdes, sem novas tentativas;
  - a regressão visual do guia continua com 0 pixel de diferença;
  - CI verde e deploy da Vercel READY.
- **Devlog:** entrada "M3" com GIF da jornada (gerado pelo Playwright a partir de uma persona fictícia) e rascunho de post para o LinkedIn.

## 5. Como trabalhar
- **Comece em modo plan:**
  - leia tudo da seção 2;
  - faça no máximo 8 perguntas, todas de uma vez, cada uma com a sua recomendação e o porquê;
  - entregue o plano;
  - só codifique depois do ok.
- **Convenções do `CLAUDE.md`:**
  - commits pequenos, no imperativo, em pt-BR, com a atribuição pedida pelo ambiente;
  - `src/domain/` continua puro e testado;
  - as telas ficam em `src/features/`.
- **Ao fim do marco:** pare, mostre o resultado e espere o ok do Gustavo antes de seguir.

## 6. Avisos práticos do ambiente
- **Dados privados:** a pasta `privado/` (dados pessoais reais) **não vem no clone** e nunca deve ser versionada. Use só as personas fictícias de `tests/personas/`. `npm run test:privado` só funciona na máquina que tem essa pasta.
- **Playwright:** o projeto fixa `@playwright/test` 1.63.0 para bater com o Chromium já instalado no ambiente. Não rode `playwright install` localmente.
- **Regressão visual:** o `playwright.config.ts` já roda o Chromium com rasterização num fio só. Não reative `retries`: falha visual é sempre real e deve ser investigada (o CI envia `test-results/` como artefato quando falha).
- **Testes lentos:** a regressão visual leva cerca de 4–8 min. Evite rodar outras suítes pesadas ao mesmo tempo, porque elas competem por CPU.
- **Rede:** a rede do ambiente costuma bloquear `*.vercel.app`. Confira o deploy pelo MCP da Vercel (`list_deployments`; time "gustavogopp's projects", projeto `treino-mvp`).
- **GitHub:** o token do `gh` pode estar inválido. Consulte o CI pela API pública: `https://api.github.com/repos/gustavoGopp/treino-mvp/actions/runs`.

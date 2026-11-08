# Briefing comum aos agentes do redesign (06/11/2026)

Você é um dos agentes do redesign visual do **treino-mvp**: um web app (PWA, Vite + React + TypeScript, sem biblioteca de UI), em pt-BR, que monta um programa de hipertrofia baseado em evidência só com o equipamento que a pessoa tem e conduz cada treino na academia com um guia animado (o "Boneco"), temporizador de descanso e sugestões de progressão. O dono é o Gustavo: não é programador nem designer, lê em pt-BR, prefere explicações simples e visuais. Quando um termo técnico for inevitável, explique-o em uma frase.

Este redesign é a 3ª rodada de design. As duas anteriores (`docs/revisoes/design.md` e `docs/revisoes/design-v2.md`, 03/11/2026) são **insumo, não limite**: aprenda com os números e as fontes, e descarte o que não ajudar. A v2 já está no app (veja `docs/devlog.md`, entrada "Revisão de design e reformulação visual" e as 3 seguintes). Hoje o app tem 0 toque abaixo de 44 px, 0 contraste baixo e 13 toques no cadastro: o ganho está na **estrutura e na sensação de uso**, não em consertar falha medida. Por isso, cada proposta precisa de medida ou fonte.

## O que não muda (vale acima de qualquer proposta)
Se uma ideia esbarrar numa destas regras, registre a ideia **com o conflito** e deixe a decisão para o Gustavo, em vez de contorná-la.
- **O Boneco:** `src/engine/` e a linha de base `tests/visual/linha-de-base/estilo-a.json` não mudam. O palco pode mudar de moldura, tamanho, posição e controles em volta; a paleta do app precisa conviver com as cores do Boneco (vermelho e laranja dos músculos, verde e azul das trajetórias, vermelho tracejado do erro). As cores internas do palco (`--stage`, `--fig`, `--mus-p`...) ficam como estão.
- **Evidência visível:** toda regra mostrada ao usuário mantém o selo (robusta, moderada, um estudo, consenso) e o caminho até a fonte. O selo pode ganhar outra forma, nunca sumir.
- **Segurança sempre à mão:** no treino, o caminho para "Senti algo" (dor, formigamento, tontura) fica visível sem rolar, em qualquer estado da tela. A montagem segura de um exercício nunca fica recolhida por padrão.
- **Privacidade (LGPD):** nada de `privado/` (a pasta nem existe neste clone) em arquivo, captura ou protótipo; só as 6 personas fictícias de `tests/personas/index.ts` (Ana, Bruno, Carla, Diego, Elisa, Fábio). A letra hoje vem do Google Fonts (um pedido externo por visita): servir a letra do próprio app conta como ponto positivo.
- **Uso na academia:** mobile-first, pt-BR, toque de 44 px no mínimo (48 é o piso de hoje; não regrida), `prefers-reduced-motion` respeitado, contraste WCAG 2.2 (4,5:1 texto, 3:1 controle), nada que dependa só da cor, uma mão só, sem rolagem lateral a 360 px.
- **Gerador e domínio:** `src/domain/` não muda por causa do design. Se uma tela pedir um dado que o domínio não tem, registre como **pedido ao domínio**, com o teste que o validaria, para decisão separada.
- **Poucas dependências:** CSS e React puros. Uma biblioteca nova só entra com justificativa medida (tamanho do bundle antes e depois) e aprovação do Gustavo. Bundle de produção hoje: JS 1.085,56 kB (275,90 kB gzip), CSS 43,94 kB (8,64 kB gzip).
- **Os critérios dos testes continuam:** toque (`tests/e2e/toque.ts`), contraste (`tests/e2e/contraste.ts`), "Série feita" visível sem rolar, contagem de toques do cadastro (`tests/e2e/onboarding.spec.ts`), privacidade (`tests/repo/privacidade.test.ts`).
- **Motivação sem manipulação:** nada de sequência que "quebra", cobrança por falta, confete ou notificação de culpa. A posição do projeto está em `design-v2.md`, seção 2 ("Exercício e motivação"). Revisão só com evidência nova, e como proposta ao Gustavo.

## Decisões do Gustavo na Fase 0 (05/11/2026)
1. Nome provisório e ícone de app entram na tabela de decisões como item separado (agente 5 propõe).
2. Sem referência visual preferida: o agente 5 traz 2 ou 3 direções e ele escolhe.
3. Ele decide pelas imagens (não vai testar o protótipo com uma mão antes da implementação).
4. Objetivo, prioridades e "algo a evitar" **podem** ser propostos para depois do 1º treino, com o efeito no gerador conferido.
5. Títulos, botões e ajudas podem ser reescritos. **Ficam intactos** os textos das regras com selo (`docs/pesquisa/regras.md`, `src/domain/regras`) e os de segurança (triagem, "Senti algo", montagem segura).

## Já decidido no backlog (não proponha de novo sem motivo novo)
`docs/backlog.md`: fora do MVP ficam nutrição, login e nuvem, pagamentos, app nativo, social, relógios, treinador humano, cardio prescrito, deload automático; idade, peso, sexo, altura e foto do corpo não entram no perfil; mochila, galão e remada na mesa não entram; gamificação com sequência e cobrança está descartada (design-v2 §2); os 21 ícones de equipamento que faltam estão no backlog (podem entrar aqui como plano).

## Leitura obrigatória
`CLAUDE.md`; `docs/PLANO-MVP.md` (seção a, critérios); `docs/revisoes/design.md`; `docs/revisoes/design-v2.md`; `docs/devlog.md` (entradas de 03 a 05/11, linhas 773 em diante); `docs/backlog.md`; `docs/pesquisa/00-metodo.md` (os selos); `src/features/` (as telas; `src/features/app/ui.tsx` tem as peças comuns); `src/styles.css`; `src/storage/esquema.ts` (os 6 passos `PASSOS` e o estado guardado); `tests/e2e/` (`jornada.ts` percorre o cadastro da Ana); `tests/personas/index.ts`. Rotas em `src/App.tsx`.

## Como as telas se encadeiam hoje
Boas-vindas (`/`) → triagem (`/comecar/triagem`) → experiência (`/comecar/nivel`) → rotina (`/comecar/rotina`) → equipamento (`/comecar/inventario`: lugar, lista ou foto) → confirmar (`/comecar/restricoes`) → programa (`/programa`, início, com barra fixa Treino/Semana/Meus dados) → treino (`/treino`: uma série por vez, descanso, "Senti algo") → fim (`/treino/fim`) → semana (`/semana`) e evolução (`/evolucao/:exId`); guia (`/guia/:id`); meus dados (`/dados`); locais (`/locais`).

## Ambiente de trabalho
- Dependências instaladas; **não rode `npm install` nem `npm run build`**. O app de produção já está servido em **http://localhost:4173** (build do HEAD atual). Playwright 1.63.0 com Chromium em `/opt/pw-browsers`. Use `devices['Pixel 7']` (412 × 915) e um viewport de 360 × 740 para "celular pequeno". A rede alcança o Google Fonts.
- Para medir, escreva os seus scripts em `scripts/design/redesign/agente-N/` com um `playwright.config.ts` próprio (copie o de `scripts/design/playwright.config.ts`, apontando `baseURL` para 4173 e **sem** o bloco `webServer`), e rode com `npx playwright test -c scripts/design/redesign/agente-N/playwright.config.ts`. Reaproveite `scripts/design/medir.ts`, `tests/e2e/jornada.ts`, `tests/e2e/toque.ts` e `tests/e2e/contraste.ts`. Imagens brutas em `reports/design/redesign/agente-N/` (fora do git). As poucas imagens que o relatório precisa (até 8, PNG, ≤ 300 kB cada) vão para `docs/revisoes/redesign/img/agente-N-<nome>.png`.
- **Não altere** código do app, testes, docs existentes ou configurações. **Não faça commit.** Você só cria o seu relatório, os seus scripts e as suas imagens.
- Busca na web: use WebSearch e WebFetch para as fontes. O PubMed está bloqueado nesta rede: estudo visto só pelo resumo leva a marca "(resumo)". Nada de inventar estudo, número ou citação: se não achar a fonte, escreva [opinião].

## Formato do relatório
Arquivo: `docs/revisoes/redesign/agente-N-<tema>.md`, em pt-BR, para o Gustavo. Estrutura: (1) **Em uma frase**; (2) **O que medi** (método, scripts, números); (3) **O que a pesquisa diz** (tabela: afirmação, selo, fonte); (4) **Achados e propostas**, cada um neste formato:

- **Tela/estado:** Treino, durante o descanso.
- **Problema:** o relógio de 72 px fica atrás do teclado quando a pessoa ajusta a carga da próxima série. [medido: captura a 360 px, persona Ana, série 2]
- **Evidência:** uso em relance domina nos apps de atividade [fonte: Gouveia, Karapanos e Hassenzahl 2015, UbiComp; um estudo (resumo)]. A pessoa deixa o celular no banco entre séries [opinião].
- **Proposta:** o ajuste de carga fecha o teclado e volta ao relógio; o relógio nunca sai do terço superior da tela.
- **Efeito esperado:** 0 estado em que o relógio fica coberto; 1 toque a menos por série ajustada.
- **Custo e risco:** pequeno; muda `Treino.tsx` e um teste e2e.

(5) **O que não fazer**, com motivo; (6) **Pedidos ao domínio** (se houver); (7) **Conflitos com "o que não muda"** (se houver); (8) **Resumo em 10 linhas para o Gustavo**; (9) **Fontes** (autor, ano, periódico, identificador, o que foi conferido). Toda afirmação importante leva **[medido]**, **[fonte: ..., selo]** ou **[opinião]**. Selos: robusta, moderada, um estudo, consenso (norma técnica como WCAG e guias de plataforma entram como consenso).

Você não recebe hipótese do orquestrador para confirmar: recebe a pergunta e o material. Diga o que está bom, o que está fraco e o que não sabe.

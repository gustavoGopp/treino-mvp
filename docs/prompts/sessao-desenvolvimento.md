# Prompt: sessão de desenvolvimento do treino-mvp (os marcos R5, um de cada vez)

> Escrito ao fim da sessão de próximos passos (07/11/2026), a pedido do Gustavo: "decida esses pontos e monte um prompt para uma nova sessão continuar desenvolvendo o projeto". As decisões estão na parte 3 de `docs/revisoes/proximos-passos.md`. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova. A mesma sessão pode conduzir vários marcos, parando ao fim de cada um; se ela ficar longa demais, comece outra com este mesmo prompt, que ela retoma pelo `docs/devlog.md`.

---

Você vai conduzir a **sessão de desenvolvimento** do **treino-mvp**, um web app (PWA, Vite + React + TypeScript) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino na academia ou em casa com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão. Você vai implementar, **um marco de cada vez**, os marcos do R5 que a sessão de próximos passos propôs e decidiu.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase. **Ele pediu para não decidir questões técnicas:** a sessão decide (qual nível de uma função, que complexidade, que limiar, como medir), registra o motivo e mostra o efeito medido. Para ele ficam só as decisões de produto (o que a pessoa vê e faz, o que o app promete, custo em dinheiro, abrir ou não para alguém) e as revisões que o `CLAUDE.md` e os prompts dos marcos pedem (os programas das personas, os textos de segurança, cada animação nova).

**Onde o projeto está (leia antes de começar).**
- **Princípios e escopo:** `CLAUDE.md` (inegociáveis: evidência com selo e fonte; gerador determinístico e testável; segurança; privacidade, LGPD; qualidade do guia; uso na academia; simplicidade).
- **Plano e marcos:** `docs/PLANO-MVP.md`, seção i (os marcos R5 decididos em 06–07/11, com o aceite de cada um).
- **A sessão de próximos passos (06–07/11):** `docs/revisoes/proximos-passos.md` (parte 1, o retrato medido do app; parte 2, a matriz e os pedidos ao design; **parte 3, as decisões e a ordem dos marcos**) e os relatórios das frentes em `docs/revisoes/proximos-passos/` (`a-qualidade.md` a `e-produto.md`; `f-corpo-livre.md` e `g-biblioteca-ampliada.md`, as duas rodadas extras sobre exercícios). A pesquisa nova está em `docs/pesquisa-v2/16-corpo-livre-e-casa.md` e `17-biblioteca-ampliada.md`; as fontes, em `docs/pesquisa/fontes.md`.
- **Histórico:** `docs/devlog.md` e `docs/backlog.md`.
- **O código:** `src/domain/` (funções puras e testadas: o gerador, a progressão, o acompanhamento, os locais, a triagem), `src/engine/` (o motor do Boneco), `src/features/` (as telas), `src/storage/` (o estado guardado no aparelho, versão 7; só muda com migração e teste), `scripts/auditoria/` (as grades de estresse), `tests/` (unitários, e2e, o motor e as personas fictícias de `tests/personas/`).
- **Os protótipos** que mediram as propostas (a grade de 108.900 programas, a régua, as cópias do domínio) ficaram no rascunho da sessão anterior e foram descartados; os números e o que cada script media estão nos relatórios, em "Como reproduzir". O R5-CL versiona a grade e a régua como auditoria.

**Os marcos, na ordem (decidida em 07/11).** Cada um tem o seu prompt, que é a especificação: leia-o inteiro antes de começar o marco e siga as regras, o aceite e o fechamento dele.

| # | Marco | Especificação | Esforço |
|---|---|---|---|
| 1 | **R5a O registro que não engana** (a dor guardada na série, o treino vazio que não conta, a calibração com saída, a semana leve, a leitura do export, o ajuste de 30 min e as correções do gerador) | `docs/prompts/sessao-r5a-registro-confiavel.md` | 4–5 dias |
| 2 | **R5-CL Biblioteca ampliada** (32 exercícios novos como cartão textual, as proteções da coxa, a régua da G5 na auditoria) | `docs/prompts/sessao-r5-corpo-livre.md` | 5–6 dias |
| 3 | **R5d O foco que aparece** (o 2º exercício do prioritário, cortar primeiro o que não é foco, o degrau inicial pelo nível, a regressão da barra, os avisos de lacuna) | `docs/prompts/sessao-r5d-foco.md` | 3–4 dias |
| 4 | **R5-anim Os 5 de corpo livre** (as animações mais prescritas; pode correr junto do R5d, numa sessão à parte, porque não mexe no gerador) | `docs/prompts/sessao-r5-animacao-corpo-livre.md` | 3–4 dias |
| 5 | **R5b O avaliador e o porquê** | `docs/prompts/sessao-r5b-avaliador.md` | 4–6 dias |
| 6 | **R5c Abrir para família e amigos** | `docs/prompts/sessao-r5c-abrir-familia.md` | 4–5 dias + advogado |

**Comece pelo R5a.** Antes, confira no `docs/devlog.md` e no `git log origin/main` se algum marco já foi feito (por esta sessão ou por outra) e retome do próximo.

**Como conduzir cada marco**
1. **Branch nova a partir da `main` atualizada**, com o nome do marco (ex.: `r5a-registro`). Nunca trabalhe direto na `main`.
2. **Meça antes:** `npm run check`, `npm run test:e2e` (passe `--trace off`) e a grade que o marco usa (`npm run auditoria:qualidade`; a partir do R5-CL, com a régua da G5). Guarde o antes.
3. **Uma mudança por vez**, cada uma com a regra primeiro em `docs/pesquisa/regras.md` (selo e fonte), depois o código e os testes, e o antes e o depois medidos nas 6 personas e na grade. **A régua da G5 em dois níveis:** nenhum defeito pode piorar em relação à `main`; uma mudança só entra se melhora alguma nota. Os snapshots das personas (`tests/unit/__snapshots__/`) só são regravados (`-u`) depois do ok do Gustavo.
4. **Quando o programa gerado muda de forma visível** (R5-CL, R5d), faça também a **revisão cega**: um subagente no papel de treinador independente recebe só as semanas das personas, a `main` e a versão nova embaralhadas, e um briefing, sem acesso ao repositório (como em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 6). É opinião de treinador simulado, não evidência; serve para achar o que a régua não mede.
5. **Decisões técnicas:** tome-as você, com o motivo e a medida, e registre-as no devlog do marco ("decidido pela sessão").
6. **Fechamento de cada marco** (`CLAUDE.md`): `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; `docs/devlog.md` (o que mudou, uma tabela de antes e depois, uma imagem ou GIF quando houver tela ou animação, e o rascunho de post); `docs/backlog.md`; o recado ao R3 (`docs/prompts/recado-r3-<marco>.md`) se o programa ou o uso do Gustavo mudar; atualizar a linha do marco em `docs/PLANO-MVP.md`, seção i.
7. **Pare e espere o Gustavo** ao fim de cada marco: mostre, em linguagem simples, o que mudou para quem usa, os números e o que ficou de fora. Com o ok dele, leve à `main` por merge, sem forçar push, avisando-o antes para exportar os dados do app ("Meus dados" → "Guardar uma cópia"). Só então comece o marco seguinte.

**Regras de sempre**
- **Conta:** o projeto é acessado só pelas contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca pela da Futurum. Tudo o que é produzido fica no git, e só no git: nada de publicar páginas, artefatos ou documentos fora do repositório.
- **Dados:** `privado/` nunca é versionado, copiado nem usado em fixtures, README, devlog ou posts. As personas de teste são fictícias (`tests/personas/`). `tests/repo/privacidade.test.ts` tem de continuar passando.
- **Não mexa no branch `r3-uso-real`** (o uso real do Gustavo). O que mudar para ele vai como recado.
- **Gerador determinístico:** a mesma entrada dá a mesma saída; sem `Math.random` nem `Date.now` em `src/domain/`. A lógica "vaga por função, nunca por equipamento" fica.
- **Evidência:** toda afirmação técnica leva selo e fonte (`docs/pesquisa/00-metodo.md`); o que é prática de treinadores é "consenso"; o que vem de apps é "[mercado]"; a sua opinião é "[opinião]". Fonte nova entra em `docs/pesquisa/fontes.md` com o status de leitura, conferida no PubMed ou no Crossref. Nunca contorne bloqueio anti-robô; nada de inventar estudo.
- **Segurança:** dor articular, dor aguda, formigamento, tontura ou perda de força incomum interrompem o exercício, oferecem uma alternativa e recomendam avaliação profissional. O app não diagnostica. Texto de segurança só muda com a revisão do Gustavo.
- **Qualidade do guia:** exercício sem animação aprovada aparece como cartão textual, nunca com animação improvisada; mudanças no motor passam pela regressão visual (as animações aprovadas com 0 pixel de diferença).
- **Estado guardado:** `src/storage/` está na versão 7 e só muda com migração e teste. O redesign reservou a versão 8 para os dias planejados: **nenhum destes marcos deve precisar de versão nova**; se algum precisar, pare e pergunte, para a v8 ser decidida uma vez só, junto com o redesign.
- **Escopo:** fora do MVP ficam nutrição, login e nuvem, pagamentos, app nativo, social, relógios, cardio prescrito e deload automático. Ideias novas vão para `docs/backlog.md`. Não proponha de novo o que o backlog descartou sem um motivo novo e medido.
- **Commits** pequenos, descritivos, no imperativo, em pt-BR, com push.
- **Subagentes:** use-os para pesquisa e revisão em paralelo, cada um com a pergunta e o material (não a sua hipótese); confira as fontes que eles citarem antes de registrar.

**Como conviver com o redesign visual.** Outra sessão refaz as cores, a letra e os componentes do app (`src/styles.css`, `src/features/app/ui.tsx`, as telas, `tests/e2e/`), na branch `claude/inspiring-rubin-njhaz8` (prompt em `docs/prompts/sessao-redesign-visual.md`, na branch `claude/lucid-gauss-6fk7qg`). Antes de cada marco, veja se o lote dele já foi para a `main` (`git log origin/main`). Se foi, parta dele. Se não foi, faça a **lógica** (`src/domain/`, `src/features/*/acoes.ts`) e o **mínimo funcional** de tela com os componentes de hoje, e registre o que for tela como pedido à sessão de design (as listas estão em `docs/revisoes/proximos-passos.md`, seção 2.5, e em cada relatório). Não redesenhe telas, não mude `src/styles.css`, não mexa na branch do redesign. Se uma decisão sua esbarrar numa decisão do redesign (`docs/revisoes/redesign/proposta.md`, lido por `git show origin/claude/inspiring-rubin-njhaz8:<arquivo>`), registre o choque e pergunte ao Gustavo.

**Comandos**
- `npm run dev`: servidor local.
- `npm run check`: lint, tipos e testes unitários.
- `npm run test:e2e -- --trace off`: Playwright (build + preview); o Chromium instalado precisa da versão fixada 1.63.0.
- `npm run auditoria` e `npm run auditoria:verificar`: as grades de estresse, duas rodadas idênticas.
- `node referencia/qa/check-motor.cjs check|sheet`: o QA do guia.

**O que não fazer**
- Não pule a parada ao fim de um marco, nem leve à `main` sem o ok do Gustavo.
- Não mude o gerador sem o antes e o depois das personas e da grade, nem regrave snapshots sem o ok.
- Não use IA no lugar das regras do gerador; a IA só reconhece equipamento nas fotos e, se fizer sentido, redige explicações a partir do que as regras escolheram.
- Não use objetos da casa como carga, nem porta com toalha, lençol ou mesa (decisões do Gustavo); não conte superman nem Y-T-W como série de costas.
- Não afirme nada sobre treino sem selo e fonte.

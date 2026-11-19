# CLAUDE.md: treino-mvp

App web (PWA) que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com o guia animado de execução, o temporizador de descanso e as sugestões de progressão. O plano completo está em `docs/PLANO-MVP.md`.

## Princípios (não negociáveis)
- **Evidência.** Toda regra do gerador e todo texto técnico têm o nível de evidência (robusta, moderada, um estudo ou consenso de treinadores) e a fonte. Desde 16/11/2026 (decisão do Gustavo, para cortar texto), o nível e a fonte não aparecem mais ao lado de cada coisa nas telas: ficam reunidos num lugar só do app, a página "Entenda o treino" (Meus dados), que traz o porquê de cada coisa e a lista de todas as regras com as fontes. Nenhuma regra e nenhum texto técnico pode existir no app sem estar alcançável ali. Nada de inventar estudos. As fontes ficam em `docs/pesquisa/` (base de 29/10) e `docs/pesquisa-v2/` (revisão em andamento, que prevalece onde houver conflito). O `referencia/programa-fase-1.md` é histórico: serve de comparação, não de premissa.
- **Gerador determinístico e testável.** O treino sai de regras e dados (biblioteca de exercícios, metas de volume), nunca de texto livre de um modelo. A mesma entrada gera a mesma saída: sem `Math.random`, sem `Date.now` dentro de `src/domain/`. A IA entra só para reconhecer equipamento nas fotos e, se fizer sentido, para redigir explicações a partir do que as regras escolheram.
- **Segurança.** Se aparecer dor articular, dor aguda, formigamento, tontura ou perda de força incomum, o app interrompe aquele exercício, oferece uma alternativa e recomenda avaliação profissional. O app não diagnostica. A triagem é no estilo do PAR-Q+.
- **Privacidade (LGPD: dado de saúde é sensível).** No MVP, tudo fica no aparelho. As fotos são redimensionadas e têm os metadados removidos (inclusive GPS) no aparelho antes do envio, e nunca ficam guardadas no servidor. A chave da API existe só no servidor (variável de ambiente). Nenhum dado pessoal vai para o repositório.
- **Qualidade do guia.** Precisão vale mais que quantidade. Exercício sem animação aprovada aparece como um cartão textual, nunca com uma animação improvisada. Mudanças no motor passam pela regressão visual.
- **Uso na academia.** Mobile-first, em pt-BR, acessível (contraste, áreas de toque ≥ 44 px, `prefers-reduced-motion`) e utilizável com uma mão só.
- **Simplicidade.** Poucas dependências, código legível e testes em tudo que é regra.

## Dados privados
- `privado/` está no `.gitignore` e **nunca** é versionada, copiada para o código, usada em fixtures públicas, README, devlog ou posts. Nela ficam o perfil real, as fotos da academia, o gabarito e os originais. Pode ser lida localmente como caso de teste.
- Os testes versionados usam personas fictícias (`tests/personas/`).
- `tests/repo/privacidade.test.ts` falha se algo de `privado/`, `.env` ou foto for versionado.

## Convenções
- **Idioma:** UI, docs, commits e nomes de domínio em pt-BR. Identificadores técnicos genéricos podem ficar em inglês.
- **Commits:** pequenos e descritivos, no imperativo, em pt-BR (ex.: "Adiciona taxonomia de equipamentos").
- **Estrutura:** `src/domain/` contém funções puras sem React, com 100% das regras testadas no Vitest. `src/engine/` é o motor de animação, sem React. `src/features/` tem as telas. `api/` tem só a função de visão.
- **Dados separados do código:** biblioteca de exercícios, taxonomia e metas de volume ficam em arquivos de dados validados com zod.
- **Escopo:** fora do MVP ficam nutrição, login e nuvem, pagamentos, app nativo, recursos sociais, relógios, outros objetivos fora do treino de força (emagrecimento pela dieta, corrida, esportes), treinador humano, cardio prescrito e deload automático. Desde 04/11/2026, a pergunta de objetivo (ganhar músculo, manter o músculo na dieta, ficar mais forte, saúde) entra no MVP, só dentro do treino de força (`docs/pesquisa-v2/12-outros-objetivos.md`). Ideias novas vão para `docs/backlog.md`.
- **Marcos:** ao fim de cada marco, atualizar `docs/devlog.md` (o que mudou, imagem ou GIF, rascunho de post) e parar para a revisão do Gustavo antes de seguir.

## Verificação
O porquê e a manutenção estão em `docs/verificacao/README.md`.
- **"Pronto" é conferido com evidência.** Antes de dizer que terminou, antes de commit de código e antes de enviar, siga o roteiro `.claude/skills/verificar/SKILL.md`: ler o diff, `npm run check`, os itens de `docs/verificacao/lista.md` que o diff aciona, abrir no app as telas mudadas, e relatar o que rodou e o que não rodou.
- **Antes de enviar código, e sempre antes da `main`: `npm run verificar`.** É o mesmo comando que o GitHub roda (com cobertura e testes de tela); o `check` sozinho não basta.
- **Três rodadas.** Se uma conferência ainda falha depois de 3 tentativas de conserto, pare e explique ao Gustavo o que falha, o que tentou e o que precisa dele.
- **Teste que falha às vezes é defeito:** nada de pular, pôr espera, tentar de novo até passar ou afrouxar o que ele confere. Limite de tempo só sobe com a medida (com cobertura) no comentário.
- **A mudança não reescreve o que a julga:** snapshots das personas, linhas de base do motor e a régua só mudam com o motivo medido; gabaritos, só com o ok do Gustavo.
- **O que escapou vira item** de `docs/verificacao/lista.md` (gatilho no diff, conferência, origem); a lista é podada no fechamento de cada marco.
- **Ganchos** (`.claude/settings.json`): ao parar, roda o `check` se a sessão mudou código; antes de `git push`, o portão confere o carimbo do `verificar` (modo observar); regravar gabarito pede confirmação.

## Comandos
- `npm run dev`: servidor local
- `npm run check`: lint + typecheck + testes unitários (a camada barata)
- `npm run verificar`: o mesmo que o GitHub roda (lint, tipos, unitários com cobertura, testes de tela)
- `npm run test:e2e`: Playwright (build + preview). Localmente, o Chromium já instalado precisa da versão fixada 1.63.0.
- `node referencia/qa/check-motor.cjs check|sheet`: QA do guia original

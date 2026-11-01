# CLAUDE.md: treino-mvp

App web (PWA) que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com o guia animado de execução, o temporizador de descanso e as sugestões de progressão. O plano completo está em `docs/PLANO-MVP.md`.

## Princípios (não negociáveis)
- **Evidência.** Toda regra do gerador e todo texto técnico indicam o nível de evidência (robusta, moderada, um estudo ou consenso de treinadores) e a fonte. Nada de inventar estudos. As fontes ficam em `docs/pesquisa/` (base de 29/10) e `docs/pesquisa-v2/` (revisão em andamento, que prevalece onde houver conflito). O `referencia/programa-fase-1.md` é histórico: serve de comparação, não de premissa.
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
- **Escopo:** fora do MVP ficam nutrição, login e nuvem, pagamentos, app nativo, recursos sociais, relógios, outros objetivos, treinador humano, cardio prescrito e deload automático. Ideias novas vão para `docs/backlog.md`.
- **Marcos:** ao fim de cada marco, atualizar `docs/devlog.md` (o que mudou, imagem ou GIF, rascunho de post) e parar para a revisão do Gustavo antes de seguir.

## Comandos
- `npm run dev`: servidor local
- `npm run check`: lint + typecheck + testes unitários
- `npm run test:e2e`: Playwright (build + preview). Localmente, o Chromium já instalado precisa da versão fixada 1.63.0.
- `node referencia/qa/check-motor.cjs check|sheet`: QA do guia original

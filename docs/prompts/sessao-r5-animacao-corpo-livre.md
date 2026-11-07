# Prompt: R5-anim, as animações dos 5 exercícios de corpo livre mais prescritos

> Escrito na sessão de próximos passos (07/11/2026), a partir da decisão 1 da parte 3 de `docs/revisoes/proximos-passos.md` e da fila de `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 4. É o 4º marco da ordem: vem depois do R5-CL (que põe os exercícios na biblioteca como cartão textual) e pode correr junto do R5d, porque mexe no motor e nos dados de animação, não no gerador. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova, ou siga-o dentro da sessão de desenvolvimento (`sessao-desenvolvimento.md`).

---

Você vai conduzir o **R5-anim**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase. Ele aprova cada animação pela folha de contatos.

**Por que este marco.** O R5-CL acrescentou 32 exercícios à biblioteca, todos como cartão textual (o `CLAUDE.md` proíbe animação improvisada). Medido na sessão de próximos passos: com os cartões, **74,9%** dos programas sem dor têm um dia com 3 ou mais exercícios sem animação (eram 8,4%). Cinco exercícios de corpo livre respondem pela maior parte, porque valem em quase todo cenário: **panturrilha no degrau** (81,8% dos programas), **abdominal invertido** (61,7%), **extensão de tríceps com o peso do corpo** (59,4%), **abertura em T deitado de bruços** (56,1%) e **flexão com os pés elevados** (53,8%). Com os 5 animados, os dias com 3 ou mais cartões caem para **19,5%** (medido no protótipo), e no corpo livre para 0%. A panturrilha, a flexão e o abdominal já têm animação aprovada e servem de base.

**Leia primeiro:** o `CLAUDE.md` (qualidade do guia: precisão vale mais que quantidade; mudanças no motor passam pela regressão visual); `docs/pesquisa/animacoes/README.md` (o ritual: ficha da técnica, poses, verificação automática, folha de contatos, aprovação do Gustavo, linha de base); `docs/prompts/sessao-r4-boneco.md` e `docs/revisoes/r4/README.md` (o estilo A do Boneco, o padrão do app; a cena, os rótulos e a vista); as fichas e os cartões dos 5 exercícios (escritos no R5-CL, a partir de `docs/pesquisa-v2/16-corpo-livre-e-casa.md` e `17-biblioteca-ampliada.md`, com as referências visuais da parte G2 de `17`); as animações de base em `src/engine/exercicios/` (`panturrilha-chao.ts`, a flexão e o abdominal no chão); `scripts/aprovar-animacao.mjs`, `scripts/folha-animacao.mjs`, `tests/motor/` e `referencia/qa/check-motor.cjs`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real` nem na branch do redesign. `privado/` nunca é versionado nem usado.
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar.
- **Sem estilo novo de boneco nem mudança de corpo:** as poses novas usam o esqueleto e o estilo A como estão. Se uma animação pedir peça nova de cena (o degrau, por exemplo), use a do step se servir; se não servir, mostre a folha e pergunte antes de criar.
- **As animações já aprovadas continuam com 0 pixel de diferença** e 0 falha de IK (critério 7 do `PLANO-MVP.md`). Toda mudança no motor passa pela regressão visual.
- A ficha de cada exercício traz a técnica com selo e fonte; o que vier de vídeo é referência visual, nunca fonte de regra.

**O que fazer, nesta ordem**
1. **Uma animação por vez,** na ordem da fila (panturrilha no degrau; abdominal invertido; extensão de tríceps; abertura em T; flexão com os pés elevados), cada uma pelo ritual de `docs/pesquisa/animacoes/README.md`: a ficha confere com o cartão; as poses em `src/engine/exercicios/revisao/`; `node scripts/folha-animacao.mjs <id>` com a checagem de cinemática limpa; a folha de contatos para o Gustavo.
2. **Parar a cada folha** e esperar a aprovação. Com o ok, `node scripts/aprovar-animacao.mjs <id> <exercicio>` e a linha de base (`ATUALIZAR_NOVAS=1 npx playwright test --project=motor`).
3. **Medir** a grade de qualidade com os 5 animados (a nota G1, dias com 3 ou mais cartões) e as 6 personas.

**Aceite (medido)**
- Os 5 aprovados pelo Gustavo, folha a folha.
- As animações já aprovadas sem 1 pixel de diferença; 0 falha de IK; `node referencia/qa/check-motor.cjs check` limpo.
- Na grade: dias com 3 ou mais cartões ≤ 20% dos programas sem dor (medido no protótipo: 19,5%); no corpo livre, 0%.
- `npm run check` e `npm run test:e2e` limpos (os testes que contam exercícios "sem animação" mudam: diga quais).

**Fechamento.** `docs/devlog.md` (um GIF ou a folha de cada animação e o rascunho de post), `docs/backlog.md` (o resto da fila de animação, com a frequência medida) e parar para a revisão do Gustavo.

**O que não fazer**
- Não anime um exercício sem a ficha conferida e o ok do Gustavo na folha.
- Não mude o estilo do Boneco nem o corpo; não mexa nas animações aprovadas.
- Não mude o gerador neste marco.

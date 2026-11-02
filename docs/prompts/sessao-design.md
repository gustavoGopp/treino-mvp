# Prompt: design do treino-mvp (rascunho)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> **Rascunho** escrito em 02/11/2026, ao fim da revisão de anatomia (`docs/revisoes/anatomia.md`). É a 3ª de 3
> sessões pedidas pelo Gustavo: auditoria do treino → anatomia dos exercícios → **design**. O Gustavo revisa este
> rascunho antes de usar.

---

<contexto>
Você vai conduzir a **revisão de design** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco", padrão desde o R4). O dono é o Gustavo. Ele não é programador nem da área de exercício, anatomia ou design: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O seu papel é o de um **revisor independente de design**: olhar o app como quem treina, com uma mão só, no celular, na academia, e conferir se cada tela e o Boneco se entendem de primeira, contra princípios de design de interface, de acessibilidade e de material didático, com fonte quando houver.

**Onde o projeto está**
- A auditoria do treino e a revisão de anatomia (02/11/2026) estão no branch `revisao-anatomia` (ou já na `main`, se o Gustavo aprovou): veja `docs/revisoes/auditoria-treino.md`, `docs/revisoes/anatomia.md` e `docs/devlog.md`.
- **O Boneco** (`src/engine/estilo/`: `corpo.ts` desenha o corpo e `musculos.ts`, os músculos, com origem e inserção comentadas) é o padrão do app desde o R4. O clássico (o do guia original) e a silhueta continuam como opção em "Meus dados". A pesquisa do R4 está em `docs/pesquisa/animacoes/r4-estilo-do-boneco.md` (o realce do músculo ajuda a aprender: `richter2016`, moderada).
- **31 animações**, **38 cartões de texto** e **37 exercícios ainda sem guia** (só o nome e "animação em breve"). A frequência de cada um está em `docs/revisoes/auditoria/inventario.md`.
- **A linha de base do Boneco** (`tests/visual/linha-de-base/estilo-a.json`) trava o desenho: qualquer mudança no corpo, nas cores ou nos músculos falha no CI até ser gravada de novo, com a aprovação do Gustavo.
</contexto>

<o_que_as_revisoes_deixaram>
Da revisão de anatomia, para o design decidir:
1. **Os adutores aparecem pequenos na vista de frente** do afundo e do búlgaro (uma faixa laranja fina na parte de dentro da coxa da frente; `docs/img/anatomia-afundo-frente.png`). Os músculos estão certos; a forma e o tamanho são de design.
2. **"Só ajuda" × "secundário que conta".** No desenho, o laranja serve para os dois: músculos que contam meia série (o bíceps na remada) e músculos que só estabilizam e o gerador não conta (antebraço, lombar, oblíquos, abdômen na flexão; lista em `AJUDANTES`, `scripts/auditoria/anatomia-regras.ts`). Decisão do Gustavo: ficam no desenho. Falta decidir se a legenda os diferencia, e como.
3. **O estilo clássico** continua igual ao guia original e **não recebeu** as correções de anatomia (ali o glúteo do afundo ainda aparece como principal e o trapézio aparece na elevação lateral). Decidir se o clássico continua como opção, se recebe as correções (o teste de equivalência com o guia original deixaria de valer para ele) ou se sai.
4. **A vista da miniatura** do programa escolhe a vista que mostra mais o músculo principal (`vistaDaMiniatura`); com os principais corrigidos, conferir se as 6 animações mudadas continuam com a melhor vista.

Do R3 e da auditoria: os incômodos anotados no Diário do R3 que forem de layout; a tela do treino com uma mão só; o cartão de texto ao lado da animação (a mesma hierarquia?); o "animação em breve" dos 37 sem guia.
</o_que_as_revisoes_deixaram>

<tarefa>
**Parte A: o inventário das telas.** Capturas (Playwright, com as personas fictícias) de cada tela, no celular, nos temas claro e escuro, e do Boneco em cada vista dos exercícios mais prescritos. Gere por script, não à mão.

**Parte B: contra os princípios.** Para cada tela e para os pontos acima: contraste e áreas de toque (WCAG; `CLAUDE.md` pede ≥ 44 px e `prefers-reduced-motion`), leitura de relance, hierarquia, uso com uma mão. O que for evidência, com selo (`docs/pesquisa/00-metodo.md`) e fonte; o que for opinião sua, marcado como opinião.

**Parte C: relatório e decisão.** `docs/revisoes/design.md`, com os achados por gravidade × frequência (quantas vezes a tela ou o exercício aparece no uso), e uma seção nova na página "Diagnóstico do treino-mvp" (leia a versão publicada antes de publicar). **Pare para a decisão do Gustavo, item a item, com nada pré-marcado**, mostrando o antes e o depois em imagem.

**Parte D: as correções aprovadas,** num branch próprio, cada uma com teste. O Boneco só muda com a aprovação do Gustavo, folha a folha (`node scripts/folha-animacao.mjs <id> --estilo=a`), e só então a linha de base é gravada (`ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor estilo-a`).

**Fica fora:** quais músculos cada exercício trabalha (foi a anatomia; os testes de `tests/unit/anatomia.test.ts` travam isso), a escolha dos exercícios e o gerador (foi a auditoria), as animações novas (o R5) e o branch `r3-uso-real`.
</tarefa>

<como_trabalhar>
1. Leia primeiro: `CLAUDE.md`, `docs/revisoes/anatomia.md`, `docs/pesquisa/animacoes/r4-estilo-do-boneco.md`, `src/engine/estilo/` e `src/styles.css`.
2. Postura de revisor: diga o que está bom e o que está fraco, com evidência; o que for opinião sua, marque como opinião.
3. As animações e a linha de base do Boneco só mudam com a aprovação do Gustavo, folha a folha.
4. Privacidade: nada de `privado/` em arquivo versionado; testes e imagens só com as personas fictícias.
5. Commits pequenos, em pt-BR e no imperativo. A `main` só recebe com o ok do Gustavo; antes, lembre-o de exportar os dados ("Meus dados" → "Guardar uma cópia").
6. Ao fim, atualize o devlog e pare para a revisão.
</como_trabalhar>

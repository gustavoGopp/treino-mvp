# Prompt: anatomia dos exercícios (rascunho)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> **Rascunho** escrito em 02/11/2026, ao fim da auditoria do treino (`docs/revisoes/auditoria-treino.md`). É a 2ª de 3
> sessões pedidas pelo Gustavo: auditoria do treino → **anatomia dos exercícios** → design. O Gustavo revisa este
> rascunho antes de usar.

---

<contexto>
Você vai conduzir a **revisão de anatomia** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco", padrão desde o R4). O dono é o Gustavo. Ele não é programador nem da área de exercício, anatomia ou design: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O seu papel é o de um **revisor independente de anatomia**: conferir, exercício por exercício, **quais músculos trabalham** (principal e secundários), **onde a pessoa deve sentir** e **como o Boneco mostra** esses músculos, contra fontes de anatomia e de biomecânica.

**Onde o projeto está**
- A auditoria do treino (02/11/2026) está no branch `auditoria-treino` (ou já na `main`, se o Gustavo aprovou): veja `docs/revisoes/auditoria-treino.md` e `docs/devlog.md`. A biblioteca tem **106 exercícios** (`src/domain/biblioteca/exercicios.json`), com 31 animações, 38 cartões de texto e 37 ainda sem guia.
- **Os músculos de cada exercício** estão em três lugares, que precisam bater entre si:
  1. a biblioteca (`musculos.primarios` e `musculos.secundarios`), que o gerador usa para contar o volume (o secundário vale meia série, `volume.serie-indireta.peso`);
  2. os textos (`target`, `feel` e `feelNote` em `src/conteudo/exercicios/*.json`; `target` nos cartões);
  3. o desenho (`src/engine/estilo/musculos.ts`, com origem e inserção comentadas, e a lista de músculos de cada animação).
- **As articulações** (`articulacoes`) foram completadas na auditoria (achado 1) e têm um teste por padrão de movimento (`tests/unit/articulacoes.test.ts`): não é o foco aqui, mas qualquer mudança de músculo que mude o padrão precisa passar nele.
</contexto>

<o_que_a_auditoria_achou>
Na auditoria, os músculos dos 32 guias e dos 29 cartões bateram com a biblioteca (nenhum texto diz um músculo principal que a biblioteca não tem). Os pontos que pedem um olhar de anatomia, porque a biblioteca simplifica e isso muda a conta do volume:
1. **Terra com barra hexagonal** (`terra-hexagonal`): está na função "agachar", com quadríceps **e** glúteos como principais e posteriores como secundário. É um movimento entre o agachar e o dobrar o quadril; confira a divisão do trabalho e a função.
2. **Hiperextensão** (`hiperextensao`): glúteos e posteriores como principais. Os eretores da espinha (a lombar) não existem como músculo no gerador; confira se o texto e o desenho deixam isso claro.
3. **Mergulho** (`mergulho`, `mergulho-graviton`): peito **e** tríceps como principais, os dois contados por inteiro. Confira se o tríceps não deveria ser secundário (ou o contrário, conforme o tronco inclinado).
4. **Desenvolvimento** (todas as versões): só o ombro anterior como principal; o lateral é secundário (meia série). O texto do guia fala em "anterior e lateral". Confira o que a evidência diz sobre o deltoide lateral no desenvolvimento.
5. **Face pull e crucifixo inverso** (e o novo crucifixo invertido curvado): ombro posterior como principal e "costas" como secundário. Confira se "costas" (o grande dorsal, no modelo) é o certo, ou se é o trapézio médio e os romboides.
6. **Adutores:** são secundários dos agachamentos profundos e dos afundos e principal só da adução, sem meta própria. Confira a lista.
7. **Os 4 exercícios novos da auditoria** (remada curvada com halteres, crucifixo invertido curvado, ponte com halter, supino no chão) e os 5 do lote 1 (ponte, crucifixo com halteres, crucifixo inverso, extensora, flexora sentada) têm ficha nova em `docs/pesquisa/animacoes/`, com os músculos marcados por consenso: confira.
8. **Músculos que o gerador não conta**, mas o desenho mostra (trapézio superior, antebraço, eretores, oblíquos): decida com o Gustavo se ficam só no desenho.
9. **A "Elevação lateral unilateral na polia" tem duas animações** (`elevacao-lateral` e `elevacao-lateral-b`, cópia com outra prescrição): confira se a duplicata ainda faz sentido.
</o_que_a_auditoria_achou>

<tarefa>
**Parte A: a tabela da anatomia.** Para cada exercício com animação ou cartão: músculo principal e secundários (biblioteca), o que o texto diz (`target`, `feel`), o que o desenho realça, e se os três batem. Gere a tabela por script (a partir dos dados), não à mão.

**Parte B: contra as fontes.** Para os 9 pontos acima e para o que a tabela mostrar de incoerente: o que a anatomia e a biomecânica dizem, com selo (`docs/pesquisa/00-metodo.md`) e fonte. EMG não mede hipertrofia: use-a só como apoio. Fonte não lida no original fica como não verificada.

**Parte C: relatório e decisão.** `docs/revisoes/anatomia.md`, com os achados por gravidade × frequência (a frequência de cada exercício está em `docs/revisoes/auditoria/inventario.md`), e uma seção nova na página "Diagnóstico do treino-mvp" (leia a versão publicada antes de publicar). **Pare para a decisão do Gustavo, item a item, com nada pré-marcado.**

**Parte D: as correções aprovadas,** num branch próprio, cada uma com teste. Mudar um músculo da biblioteca muda o volume e, portanto, os programas: rode `npm run auditoria` antes e depois, e mostre ao Gustavo o antes e o depois dos snapshots das personas antes de atualizá-los.

**Fica fora:** a forma visual do Boneco (é a sessão de design), a escolha dos exercícios e o gerador (foi a auditoria), e o branch `r3-uso-real`.
</tarefa>

<como_trabalhar>
1. Leia primeiro: `CLAUDE.md`, `docs/revisoes/auditoria-treino.md`, `docs/pesquisa/animacoes/README.md` e `r4-estilo-do-boneco.md`, `docs/pesquisa-v2/04-exercicios-por-musculo.md` e `src/engine/estilo/musculos.ts`.
2. Postura de revisor: diga o que está bom e o que está fraco, com evidência; o que for opinião sua, marque como opinião.
3. As 32 animações e a linha de base do Boneco (`tests/visual/linha-de-base/estilo-a.json`) só mudam com a aprovação do Gustavo, folha a folha.
4. Privacidade: nada de `privado/` em arquivo versionado; testes e imagens só com as personas fictícias.
5. Commits pequenos, em pt-BR e no imperativo. A `main` só recebe com o ok do Gustavo; antes, lembre-o de exportar os dados ("Meus dados" → "Guardar uma cópia").
6. Ao fim, atualize o devlog, escreva o rascunho do prompt da sessão de design e pare para a revisão.
</como_trabalhar>

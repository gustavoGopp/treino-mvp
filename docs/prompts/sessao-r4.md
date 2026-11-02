# Prompt: marco R4 (experimento do boneco)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 02/11/2026, durante a sessão do marco R3 (uso real), que continua em paralelo. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai conduzir o **marco R4 (experimento do boneco)** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O R4 é um **experimento pequeno e barato**. Ele não troca o boneco do app. Ele faz o mesmo movimento em 2 estilos novos, em 2 exercícios, lado a lado com o atual, para o Gustavo decidir com os olhos: seguir, ajustar ou parar. Levar o estilo escolhido a todos os exercícios é o R5.

**Onde o projeto está (02/11/2026)**
- M0 a M5, R0b, R0c, R1, R1b e R2 estão aprovados e na `main`. O **R3 (uso real) está em andamento** em outra sessão: o Gustavo treina 4 semanas só com o app (02/11 a 29/11), e as correções pequenas do R3 vão para a `main` no branch `r3-uso-real`. Não mexa nesse branch.
- **O motor de animação** fica em `src/engine/`, sem React:
  - `esqueleto.ts`, `cena.ts` e `desenho.ts` (o desenho, inclusive os músculos);
  - `svg.ts`, `qa.ts` (a checagem de cinemática, IK) e uma animação por arquivo em `src/engine/exercicios/<id>.ts`.
  - A documentação está em `referencia/motor-de-animacao.md` e `referencia/especificacao-guia-visual.md`.
- **As 31 animações aprovadas:** as 25 do guia original (`referencia/guia-execucao-fase1.html`, o guia que o Gustavo mandou no começo) e as 6 novas (remada unilateral, panturrilha no chão, abdominal no chão, rosca alternada, tríceps francês com halter e stiff unilateral).
  - Elas estão congeladas: `tests/e2e/guia-visual.spec.ts` compara o palco do app com o original pixel a pixel, e `tests/motor/` compara com `tests/visual/linha-de-base/motor.json` e `novas.json`.
  - O critério 7 do plano exige **0 pixel de diferença e 0 falha de IK** nelas.
- **O ritual de uma animação nova** está em `docs/pesquisa/animacoes/README.md`: ficha de técnica com fontes → poses → `node scripts/folha-animacao.mjs <id>` (IK = 0 e folha de contatos) → aprovação do Gustavo → linha de base.
- **O que já foi pensado sobre o boneco:** `docs/planejamento/2026-11-diagnostico.md`, seção 5.1.
  - Não há estudo que compare boneco de traço com figura realista no aprendizado de um movimento.
  - Lucas 2019 (tênis): as pessoas preferiram o vídeo e aprenderam igual. Höffler & Leutner 2007: animação × imagem parada. Os dois estão não verificados.
  - A proposta de então: um protótipo num exercício só, com membros com espessura, tronco e cabeça preenchidos e articulações marcadas.
- **Os testes:** 480 unitários e 61 no navegador.

**O retorno do Gustavo no uso real (R3, 02/11/2026)**
1. **No geral, o boneco do guia está bom para ele.** É o mesmo do guia original, e ele gosta.
2. **O que mais incomodou:** a **puxada unilateral ajoelhado na polia alta, vista de trás** (`src/engine/exercicios/puxada-unilateral.ts`, vista `posterior`). O tronco vira um triângulo com triângulos menores, e não dá para entender o que é corpo e o que é músculo.
3. **Secundário:** o **face pull, vista de cima** (`face-pull.ts`, vista `top`). O cabo até a polia vira um triângulo comprido e pouco claro, e o rótulo "mãos abrem ao lado da cabeça" fica escondido atrás da caixa da fase.
4. **O pedido dele:** pensar em dois caminhos, aprimorar o boneco atual ou ir para algo mais simples, com mais clareza e um visual melhor, e **fazer uma rodada com um especialista** (design gráfico ou anatomia humana) antes de levar o estilo a todos os exercícios.
5. Tudo isso está em `docs/backlog.md`, seção "Do R3". Os prints de comparação foram gerados com Playwright em `reports/` (pasta fora do git): refaça-os se precisar.
</contexto>

<tarefa>
Conduzir o **marco R4**, em quatro partes. O aceite do plano (`docs/PLANO-MVP.md`, seção i) é: **o Gustavo decide seguir, ajustar ou parar**, e as 31 animações aprovadas não mudam.

**Parte A: entender antes de desenhar (curta)**
1. Por que a vista de trás da puxada unilateral não se lê. Liste, com prints, o que no desenho atual confunde: forma do tronco, os triângulos, a sobreposição, o contraste e o realce do músculo.
2. Como as boas ilustrações de exercício mostram o músculo que trabalha: silhueta preenchida, realce do músculo alvo, contorno anatômico simplificado e cor só no alvo. Pesquisa curta, com fontes e o selo de evidência de `docs/pesquisa/00-metodo.md`; o que for convenção de design, marque como consenso ou opinião. Nada de estudo inventado.
3. A anatomia que a figura precisa mostrar nos 2 exercícios. Vista de trás da puxada: grande dorsal, redondo maior, trapézio inferior e médio, romboides, bíceps. Goblet: quadríceps, glúteos e adutores. Use as fichas de `docs/pesquisa/animacoes/` quando existirem.

**Parte B: dois protótipos, lado a lado com o atual**
1. **Caminho A, o boneco atual aprimorado:** membros com espessura, tronco e cabeça preenchidos, articulações marcadas, e o músculo alvo com uma forma anatômica simplificada e legível em cada vista.
2. **Caminho B, mais simples e mais claro:** uma silhueta limpa e o músculo alvo em destaque, com o mínimo de linhas e só o que ajuda a entender o movimento.
3. **Nos 2 exercícios:**
   - o **goblet**, como previa o plano;
   - a **puxada unilateral**, com a **vista de trás**, que é o caso que motivou o marco, e a lateral.
4. **Sem tocar no estilo atual.** O estilo novo entra como uma opção paralela do motor, por exemplo um parâmetro de estilo no desenho. Com a opção desligada, a saída é idêntica, caractere por caractere. As 31 animações seguem com 0 pixel de diferença e IK = 0, e o teste prova isso.
5. Mesma cinemática: os protótipos reaproveitam as poses aprovadas e mudam só o desenho. Rode `scripts/folha-animacao.mjs` (ou uma variante que aceite o estilo) e gere as folhas de contatos dos 3 estilos.
6. **A comparação para o Gustavo:**
   - os 3 estilos (atual, A e B) nos 2 exercícios, nas mesmas fases (início, meio, fim) e nos modos técnica e músculos;
   - em tamanho de celular e também na miniatura do cartão do treino;
   - uma rota só de desenvolvimento no app, para ele ver animado no celular, sem aparecer para quem usa o app.
7. **Perguntas para o Gustavo**, com nada pré-marcado:
   - qual explica melhor o movimento?
   - em qual dá para ver que músculo trabalha?
   - qual é mais agradável de ver?

**Parte C: preparar a revisão do especialista**
1. Um roteiro curto para o especialista, em linguagem simples:
   - o que é o app;
   - o que avaliar: clareza do movimento, leitura do músculo alvo, correção anatômica, legibilidade no celular e consistência entre as vistas;
   - o material: as folhas de comparação e a rota de desenvolvimento;
   - as perguntas a responder, e onde e como devolver.
2. O perfil sugerido: designer gráfico com experiência em ilustração didática, ou alguém de anatomia, como um profissional de Educação Física ou de Fisioterapia. Diga ao Gustavo o que cada um enxerga melhor.
3. A revisão em si é com uma pessoa real, que o Gustavo escolhe. A sessão prepara o material e, quando o retorno chegar, registra as mudanças pedidas.

**Parte D: fechar o marco**
1. A decisão do Gustavo: seguir com A, seguir com B, ajustar ou parar.
2. Se seguir: a estimativa para o R5 (levar o estilo às 31 animações e às que faltam), com o esforço, o que muda na regressão visual (uma linha de base nova, aprovada por ele) e a ordem, primeiro os exercícios que mais aparecem nos programas.
3. O face pull, vista de cima: diga se o estilo escolhido resolve o cabo e o rótulo escondido, ou se é uma correção à parte, também para o R5.
4. O devlog do R4, com a imagem lado a lado (personas fictícias) e o rascunho de post.

**Fica fora do R4**
- Mudar qualquer uma das 31 animações aprovadas ou o estilo padrão do app (isso é o R5, com a decisão do Gustavo).
- Animações novas de outros exercícios.
- Regra nova, mudança no gerador ou nos snapshots das personas.
- O branch `r3-uso-real` e o acompanhamento do uso real, que é da sessão do R3.

**Pronto quando:**
- os protótipos A e B nos 2 exercícios, com IK = 0 e as folhas de contatos;
- as 31 animações aprovadas seguem com 0 pixel de diferença, e `npm run check` e `npm run test:e2e` passam;
- a comparação lado a lado foi vista pelo Gustavo, com a decisão dele registrada;
- o roteiro da revisão do especialista está pronto;
- o devlog do R4 está escrito, e a sessão parou para a revisão.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - o `CLAUDE.md`, o `docs/PLANO-MVP.md` (seções a e i) e o `docs/backlog.md` (seção "Do R3");
   - `docs/planejamento/2026-11-diagnostico.md` (seção 5.1) e `docs/pesquisa/animacoes/README.md`;
   - `referencia/motor-de-animacao.md`, `src/engine/desenho.ts` e `src/engine/exercicios/goblet.ts` e `puxada-unilateral.ts`;
   - `tests/e2e/guia-visual.spec.ts` e `tests/motor/`.
2. **Plano antes de mexer:** mostre ao Gustavo, em linguagem simples e com esboços, como os caminhos A e B vão ficar, e pergunte o que só ele pode decidir antes de desenhar (por exemplo, a cor do realce do músculo, ou se a figura pode ter contorno do corpo). Só comece com o ok dele.
3. **Precisão vale mais que quantidade** (`CLAUDE.md`): nada de animação improvisada. A anatomia de cada músculo realçado tem fonte; o que for escolha de design, diga que é.
4. **Regressão visual intocada:** se algum teste do guia original ou das 6 novas mudar, pare e corrija. Nunca atualize uma linha de base para fazer o teste passar.
5. **Privacidade:** nada de `privado/` em arquivo versionado. As imagens do devlog usam as personas fictícias. `tests/repo/privacidade.test.ts` tem de continuar passando.
6. **Commits:** pequenos, em pt-BR e no imperativo, no branch `r4-boneco`, criado a partir da `main`. A `main` só recebe algo com o ok do Gustavo. Antes, lembre-o de exportar os dados ("Meus dados" → exportar), porque ele está usando o app no R3. A rota de desenvolvimento não pode aparecer para quem usa o app.
7. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (https://claude.ai/artifact/CSoACEwQ4zikyku3WXCn3s):
   - a sessão do R3 também atualiza essa página, então leia a versão atual logo antes de cada publicação;
   - acrescente a seção do R4 logo abaixo da seção do R3, com as imagens lado a lado como arquivos da página, de `reports/`;
   - nada de dado pessoal.

Ao fim do marco, atualize o devlog e pare para a revisão.
</como_trabalhar>

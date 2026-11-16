# Pesquisa 03: telas quase sem texto

Data da pesquisa: 16/11/2026.

## O que foi pesquisado

Como apps de treino, de saúde e de hábito fazem telas com quase nenhum texto, em cinco situações:

1. escolha de avatar, de aparência ou de tema;
2. cadastro por toque (uma pergunta, opções para tocar);
3. estado vazio (nada registrado ainda);
4. tela de configuração ou "meus dados";
5. fim de treino.

E o que os guias de plataforma (Apple, Android, Microsoft, GNOME) e outros sistemas de design públicos dizem sobre quanto texto usar em cada uma.

Esta pesquisa é mais radical que a 02 (`docs/revisoes/frontend-novo/textos/pesquisa/02-como-os-apps-mostram-texto.md`). A 02 perguntava onde pôr o texto. Esta pergunta onde o texto pode sair de vez, porque a imagem, o número, a posição ou o próprio controle já dizem. Não repete as regras de redação da pesquisa 01.

Foram abertas 53 páginas com conteúdo útil. Elas cobrem 12 apps: Boostcamp, StrongLifts, Hevy, JEFIT, Ladder, Caliber, Peloton, Strava, Duolingo, Headspace, Finch e Streaks. Outras 24 páginas abriram sem conteúdo útil ou deram erro. Estão no fim, em "Não abri / não achei", e não sustentam nada.

Níveis de sustentação usados: **estudo com dados**, **várias diretrizes concordam**, **uma diretriz só**, **padrão observado em N apps (segundo terceiros)** e **opinião** (a minha, sempre marcada).

## Limitações

1. **Nenhuma tela de app foi vista como imagem.** Tudo sobre apps vem de legendas escritas por terceiros, quase sempre do ScreensDesign. Por isso está escrito "segundo ScreensDesign".
2. **As legendas do ScreensDesign parecem geradas por ferramenta.** São frases de formato repetido ("tela de cadastro com..."). Elas dizem o que há na tela, mas não medem o texto. Quando a legenda não cita um subtítulo, isso **não prova** que ele não existe. Este é o ponto mais fraco da pesquisa.
3. **O WebFetch devolve um resumo feito por um modelo pequeno.** Onde o resumo veio genérico, descartei.
4. **A exceção é o guia da Apple (HIG).** O endereço público de dados por trás de cada página (`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<página>.json`) devolveu o texto bruto. Li esse texto direto, sem resumo. As páginas do Android e da Microsoft também vieram quase inteiras. São as fontes mais firmes desta rodada.
5. **Material Design 3 não abriu.** As páginas só devolvem o título. O que há de Google aqui vem do guia de design do Android (developer.android.com), que cita o Material.
6. **Centrais de ajuda continuam fechadas.** Hevy deu 403. A página do Apple Watch sobre o resumo do treino veio sem o trecho que interessa.
7. **Galerias com login** (Mobbin deu 403; Reteno só mostrou a tela de login). Page Flows não foi tentado.
8. **Não existe estudo sobre quantidade de texto em app de treino.** Os dois estudos com dados desta rodada são sobre ícones e sobre achar itens numa lista. Servem de pista, não de prova.
9. **Datas.** As páginas do ScreensDesign não mostram data. Versões de app mudam.

Uma correção à pesquisa 02 (limitação 5): a página `.../jefit-workout-planner-gym-log/` agora devolveu o nome do app, "JEFIT Workout Plan Gym Tracker". A dúvida sobre o JEFIT está resolvida.

## Referências abertas (53)

Cada item tem URL, tipo de fonte, data quando há, e o que mostra.

### A. Guias de plataforma

Os itens 1 a 18 são do Apple Human Interface Guidelines (HIG). Tipo: diretriz de fabricante. Li o texto bruto pelo endereço de dados (ver limitação 4). A página para pessoas é `https://developer.apple.com/design/human-interface-guidelines/<página>`. A data é a da última mudança registrada na própria página.

1. **HIG, Onboarding** (`/onboarding`, 10/06/2024). O ideal é entender o app usando. Se o cadastro for preciso, que seja rápido, divertido e opcional. Ensinar fazendo, não lendo. Adiar ajustes e personalização que não são essenciais e dar bons padrões.
2. **HIG, Settings** (`/settings`, 10/06/2024). Bons padrões para a maioria. Reduzir o número de ajustes. Não pedir o que dá para descobrir sozinho (por exemplo, o modo escuro). Opções de uma tarefa ficam na própria tarefa.
3. **HIG, Writing** (`/writing`, 16/12/2025). "Confira se cada palavra precisa estar ali. Se dá para usar menos palavras, use." Tela vazia: dizer o próximo passo e dar um botão. Rótulo de ajuste: claro e simples; "se o rótulo não bastar, acrescente uma explicação", e descreva só o que acontece quando está ligado. Telas pequenas pedem brevidade.
4. **HIG, Lists and tables** (`/lists-and-tables`, 21/06/2023). Texto da linha curto. Se cada item tem muito texto, mostrar só o título e abrir o resto em outra tela. Opção escolhida numa lista ganha uma marca (por exemplo, um visto).
5. **HIG, Collections** (`/collections`, sem data). Grade ou fileira é o formato "ideal para conteúdo de imagem". Para texto, a lista é melhor. Deixar fácil escolher um item, com espaço em volta das imagens.
6. **HIG, Icons** (`/icons`, 09/06/2025). Ícone simples e reconhecível. Ícone feito pelo app precisa de um rótulo alternativo (não aparece na tela; o leitor de tela fala).
7. **HIG, Buttons** (`/buttons`, 16/12/2025). O botão pode ter símbolo, texto ou os dois. Ações conhecidas pedem ícones conhecidos. "Considere usar texto quando um rótulo curto comunica melhor que um ícone."
8. **HIG, Toggles** (`/toggles`, 29/03/2024). Em geral o contexto já diz o que o interruptor liga. Numa linha de lista, o interruptor não precisa de rótulo próprio: a linha já diz. Não depender só de cor para mostrar o estado.
9. **HIG, Segmented controls** (`/segmented-controls`, 21/06/2023). Os segmentos podem ter texto ou imagem, mas não misturar os dois no mesmo controle. Controle com rótulos de texto não precisa de frase de introdução. No macOS, se usar ícones, pode pôr um rótulo embaixo de cada um.
10. **HIG, Tab bars** (`/tab-bars`, 08/06/2026). Incluir rótulo em cada aba. "Use uma palavra só sempre que possível."
11. **HIG, Offering help** (`/offering-help`, 05/12/2023). Dica: uma ou duas frases. Para ensinar um controle fora do comum, preferir animação ou desenho a uma descrição longa. "Se você precisa de muito texto para descrever um controle, considere simplificar o desenho da interface."
12. **HIG, Dark Mode** (`/dark-mode`, 06/08/2024). "Evite oferecer um ajuste de aparência próprio do app": dá mais trabalho e a pessoa pode achar que o app está quebrado.
13. **HIG, Accessibility** (`/accessibility`, 09/06/2025). Passar informação com mais que cor: forma ou ícone também.
14. **HIG, VoiceOver** (`/voiceover`, 07/03/2025). Rótulo alternativo em todo elemento importante. Imagem com significado precisa de descrição. Títulos de tela curtos ajudam quem usa leitor de tela.
15. **HIG, Workouts** (`/workouts`, sem data). No fim da sessão, uma tela de resumo "confirma que o treino acabou e mostra o que foi registrado". Texto legível para quem está em movimento: letra grande, contraste alto, o mais importante fácil de ler.
16. **HIG, Activity rings** (`/activity-rings`, 29/03/2024). Os anéis da Apple podem aparecer no resumo do treino. São só para dados de Movimento, Exercício e Ficar em pé. Não copiar nem imitar.
17. **HIG, Designing for watchOS** (`/designing-for-watchos`, 05/06/2023). Interações de uma tela só, lidas de relance.
18. **HIG, Charts** (`/charts`, 23/09/2022). Resumir a mensagem principal do gráfico em um título curto. Um número sozinho raramente basta: precisa de contexto (data, unidade).
19. **Android Developers, padrão "Settings"**. https://developer.android.com/design/ui/mobile/guides/patterns/settings . Diretriz de fabricante, sem data. Rótulo curto e com sentido. Texto secundário é opcional e serve para o estado. "Se o rótulo basta sozinho, não acrescente texto secundário." "Mostre o estado do ajuste em vez de descrever o ajuste." Explicação longa vai para uma segunda tela. O rótulo não repete palavras do título da seção nem usa verbos genéricos (definir, mudar, gerenciar). Não refazer o tema do sistema, a não ser para ampliar.
20. **Android Developers, padrão "Onboarding"**. https://developer.android.com/design/ui/mobile/guides/patterns/onboarding . Diretriz de fabricante, sem data. Coletar só o essencial. Dividir processos longos em telas, "mas sem exagerar com uma entrada só por tela". Mostrar o progresso com barra ou passos. Antes de fazer um passo a passo, avaliar se o app precisa mesmo dele.
21. **Microsoft Learn, "Guidelines for app settings"** (apps Windows, 08/04/2026). https://learn.microsoft.com/en-us/windows/apps/design/app-settings/guidelines-for-app-settings . Diretriz de fabricante. Cada linha tem título, descrição **opcional**, ícone opcional e o controle à direita. Títulos de uma palavra ("Contas", não "Ajustes de conta"). Total de quatro ou cinco ajustes. A mudança vale na hora, sem botão de confirmar. Tema: três opções com os nomes "Claro", "Escuro", "Usar o do sistema". Guia de computador, não de celular.
22. **GNOME HIG, "Boxed lists"**. https://developer.gnome.org/hig/patterns/containers/boxed-lists.html . Diretriz de plataforma, sem data. Tipos de linha: com interruptor (título, subtítulo, interruptor), de propriedade (nome e valor), que expande. No máximo dois controles por linha. Não diz quando usar subtítulo. Guia de computador.

### B. Outros sistemas de design e normas

23. **IBM Carbon, "Empty states"**. https://carbondesignsystem.com/patterns/empty-states-pattern/ . Diretriz de fabricante. Partes: imagem (opcional), título curto, corpo que diz a próxima ação, ação principal (opcional). "Mantenha as palavras no mínimo." Com pouco espaço, só texto. Admite casos em que o texto de apoio não é preciso.
24. **Atlassian Design, "Empty state"**. https://atlassian.design/components/empty-state/usage . Diretriz de fabricante. Título conciso, descrição curta, ilustração opcional, botões. "Tente limitar o número de palavras ao máximo."
25. **GitHub Primer, "Blankslate"**. https://primer.style/product/components/blankslate/guidelines/ . Diretriz de fabricante. Texto principal; texto secundário **opcional**, "breve e sem redundância"; uma ação principal. A imagem precisa ter equivalente para quem não a vê.
26. **PatternFly (Red Hat), "Empty state"**. https://www.patternfly.org/components/empty-state/design-guidelines . Diretriz de fabricante. Ícone, título conciso, corpo, botão. "Diga o que não há ali e dê o próximo passo." Tem versão extra pequena para cartões.
27. **GOV.UK Design System, "Radios"**. https://design-system.service.gov.uk/components/radios/ . Diretriz de governo. Dica de cada opção: "uma frase curta só". Leitor de tela lê a dica inteira, então dica longa cansa. Não trata de opções em imagem.
28. **W3C, WCAG 2.2, critério 1.1.1 (conteúdo não textual)**. https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html . Norma. Controle que é imagem precisa de um nome que diga para que serve. O nome pode ser invisível (só para leitor de tela). Rótulo visível não é exigido por este critério.
29. **W3C, WCAG 2.2, critério 1.4.1 (uso de cor)**. https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html . Norma. Cor não pode ser o único meio de distinguir um elemento. Uma opção marcada só pela cor da borda cai aqui: precisa de outro sinal (visto, forma, espessura).

### C. Pesquisa de usabilidade

30. **NN/g, "Icon Usability"** (Aurora Harley, 27/07/2014). https://www.nngroup.com/articles/icon-usability/ . Artigo de opinião com exemplos de teste, sem números. Poucos ícones são universais. "Sempre inclua um rótulo de texto visível." Num site testado, ninguém clicou num ícone de relógio sem rótulo.
31. **NN/g, "Visual Indicators to Differentiate Items in a List"** (Aurora Harley, 07/08/2016). https://www.nngroup.com/articles/visual-indicators-differentiators/ . **Estudo com dados**: 96 pessoas, 4 páginas de celular (2 de loja, 2 de tabela de ações), tarefa de achar 3 itens. Marcador só de texto foi o pior em tudo: cerca de 22 s contra 14 s com cor e ícone juntos, e 76% de acerto contra 85%. A autora pede mais pesquisa e avisa para não usar só cor.
32. **NN/g, "Mobile-App Onboarding"** (Alita Kendrick, 21/06/2020). https://www.nngroup.com/articles/mobile-app-onboarding/ . Artigo de opinião. Personalização no cadastro: breve, e só o que a pessoa precisa para começar. "Escolher um esquema de cores não pertence ao cadastro." Instrução: breve, opcional, o mínimo.
33. **NN/g, "Toggle-Switch Guidelines"** (Alita Kendrick, 29/07/2018). https://www.nngroup.com/articles/toggle-switch-guidelines/ . Artigo de opinião. Rótulo de interruptor curto e direto, com a palavra principal no começo, sem pergunta. Diz o que acontece quando está ligado.
34. **NN/g, "Designing Empty States in Complex Applications"** (Kate Kaplan, 19/09/2021). https://www.nngroup.com/articles/empty-state-interface-design/ . Artigo de opinião, sem dados. "Não deixe o estado totalmente vazio": gera dúvida e tira confiança. Mensagem breve, instrução "breve mas explícita", caminho direto para a tarefa. Já estava na pesquisa 02; reabri para ver a quantidade de texto.
35. **Pencil & Paper, "Empty State UX Examples & Best Practices"** (Vassilatos e Crawshaw, 06/05/2024). https://www.pencilandpaper.io/articles/empty-states . Artigo de agência. Três tipos de estado vazio: informa, chama para a ação, comemora. Sem regra de tamanho. Os exemplos são de apps de trabalho, não de treino.
36. **UX Movement, "Why You Shouldn't Always Label Your Icons"** (28/09/2021). https://uxmovement.com/mobile/why-you-shouldnt-always-label-your-icons/ . Artigo de opinião, parte paga fechada (só a introdução abriu). Defende que ícone conhecido é achado mais rápido que rótulo lido, depois de uma fase de aprendizado. Cita um estudo que não abri. Entra só como contraponto ao item 30.

### D. Apps (galerias, páginas oficiais, análises)

Os itens 37 a 47 são páginas do ScreensDesign com legendas tela a tela. Tipo: galeria de terceiros, sem data. Ver limitações 1 e 2.

37. **Boostcamp**. https://screensdesign.com/apps/boostcamp-gym-workout-fitness/ . Cadastro com uma pergunta por tela e listas de texto; seletores para números. Vazios com ilustração, título curto e botão ("No Exercises Created" e "Add Exercise"). Tema: "Light Mode" e "Dark Mode" com um visto. Fim de treino com desenho dos músculos e cartões para compartilhar.
38. **StrongLifts**. https://screensdesign.com/apps/stronglifts-weight-lifting-log/ . Cadastro com cartões e seletores de rolagem (idade, altura, peso, dias); texto de explicação citado só na tela de idade e num cartão de agenda. Ajustes agrupados; texto descritivo citado só no bloqueio de tela (bateria). Fim de treino: duração, volume, lista de exercícios e "Share Workout". Ícone do app escolhido numa grade.
39. **Hevy**. https://screensdesign.com/apps/hevy-workout-tracker-gym-log/ . Vazios com ícone e frase curta (sino e "no recent notifications") ou ilustração e botões. Ajustes como rótulo e valor ("Timer Sound Volume: High", idioma: English); texto de explicação citado só em Apple Health e séries de aquecimento. Tema numa folha de baixo ("Use OS Setting"). Fim de treino: duração, volume, opções de compartilhar e "Done".
40. **JEFIT**. https://screensdesign.com/apps/jefit-workout-planner-gym-log/ . Cadastro com cartões, ilustrações (gênero, tipo de corpo) e seletor de número. Vazio: ilustração de academia, botão "Create From Scratch" e link "Find a Plan". Medidas do corpo: lista com ícone, valor atual e "Edit". Fim de treino: métricas e mapa de músculos. Tema: sistema, claro, escuro.
41. **Ladder**. https://screensdesign.com/apps/ladder-strength-training-plans/ . Escolha de treinador com cartões, foto e um cartão de ajuda. Vazio: "No Notifications Yet". Fim de treino: números, cartão da sequência semanal, medalha, um visto e a palavra "SUCCESS".
42. **Caliber**. https://screensdesign.com/apps/caliber-strength-training/ . Cadastro com "quatro cartões" por pergunta e cartões numerados para duração e frequência. Vazios com ícone e frase curta ("Nothing new at the moment"). Ajustes quase todos rótulo, valor ou interruptor; a galeria não cita descrição nas linhas.
43. **Peloton**. https://screensdesign.com/apps/peloton-fitness-workouts/ . Cadastro com cartões empilhados, grades e números ("20-30 mins"). Muitos vazios com mensagem e um botão ("Browse classes"). Fim de treino: duração, calorias, desenho dos músculos e um título de parabéns. Ícone do app e cor do time escolhidos em grade de cores.
44. **Strava**. https://screensdesign.com/apps/strava-run-bike-hike/ . Cadastro com grade de cartões de esporte. Tema em "três cartões": padrão do telefone, claro, escuro. Ajustes com interruptor; texto de explicação citado em pausa automática e bloqueio de tela. Tela de salvar: mapa, distância, tempo, gráfico e uma pergunta de esforço.
45. **Duolingo**. https://screensdesign.com/apps/duolingo-language-lessons/ . Cadastro com uma pergunta por tela, mascote com balão, cartões e barra de progresso. Avatar: prévia grande no alto, abas de categoria, grade de opções e botão "Done". Fim de lição: "Lesson complete", mascote e três cartões de número (XP, palavras, tempo), com um botão. Vazios: mascote e "ADD FRIENDS"; "No followers yet".
46. **Headspace**. https://screensdesign.com/apps/headspace-meditation-sleep/ . Cadastro com "passo 1 de 10" e opções em texto curto. Ajustes: menu de rótulos; várias telas juntam um bloco de texto com um interruptor (notificações, Apple Health).
47. **Finch**. https://screensdesign.com/apps/finch-self-care-pet/ . Escolha do ovo: "ovos coloridos em círculo em volta do personagem" e um botão. Perguntas com cartões, algumas com ícones. Vazios com ilustração e frase ("No new mail in sight!"). Progresso em número ("1 de 7 dias", "sequência de 1 dia").
48. **Lazyweb, fluxo de cadastro do Finch**. https://design.lazyweb.com/canvas/flows/finch/onboarding . Galeria de terceiros, sem data. Descreve 5 de 34 telas. A tela do ovo tem o título "Choose your Finch Egg", vários ovos coloridos e o botão "Hatch me". Não diz se os ovos têm nome.
49. **Pratt Institute (IXD), crítica de design do Finch** (Marianne Benyamin, 17/02/2026). https://ixd.prattsi.org/2026/02/design-critique-finch-self-care-pet-ios-app/ . Trabalho de estudante, opinião. O cadastro começa "escolhendo a cor de um ovo". Elogia o botão sempre no mesmo lugar e a barra de progresso. Diz que a tela de ajustes pode sobrecarregar e pede revelação progressiva.
50. **Duolingo (blog oficial), "Become a Duolingo character with our new Avatars!"** (19/07/2023). https://blog.duolingo.com/avatar-creator/ . Fonte oficial. Um quadro grande no alto mostra o avatar atual e as opções ficam embaixo. Não diz se as opções têm nome.
51. **Streaks (página oficial)**. https://streaks.app/ . Fonte oficial, marketing. Até 24 tarefas, "78 temas de cor" e "mais de 600 ícones". Não descreve as telas.
52. **ScreensDesign, artigo "fitness app onboarding examples"**. https://screensdesign.com/articles/fitness-app-onboarding-examples/ . Artigo de galeria, sem data. Pouco útil. Zumba: "quatro objetivos em linguagem simples" e uma explicação de como a resposta muda o treino.
53. **ScreensDesign, artigo "duolingo onboarding design"**. https://screensdesign.com/articles/duolingo-onboarding-design/ . Artigo de galeria, sem data. Pouco útil. Um único texto de tela citado: "Só 7 perguntas rápidas antes da sua primeira lição!".

## 1. Escolha de avatar, de aparência ou de tema

### O que os apps e os guias fazem

1. **Quando a opção é a própria imagem, os apps mostram uma grade de imagens para tocar.** Finch: ovos coloridos em círculo e um botão (47, 48, 49). Duolingo: prévia grande, abas e grade de opções (45, 50). Peloton e StrongLifts: grade de ícones do app (43, 38). Peloton: grade de cores do time (43). Sustentação: **padrão observado em 4 apps (segundo terceiros)**. Nenhuma fonte cita nome ou descrição em cada opção. Mas nenhuma diz que não há (limitação 2).
2. **O que sobra de texto nessas telas é um título curto e um botão.** Finch: "Choose your Finch Egg" e "Hatch me" (48). Duolingo: "Done" (45). Sustentação: **padrão observado em 2 apps (segundo terceiros)**.
3. **Tema claro ou escuro é diferente: as opções têm nome curto.** Strava: três cartões (padrão do telefone, claro, escuro) (44). Boostcamp: dois nomes e um visto (37). JEFIT: sistema, claro, escuro (40). Hevy: folha de baixo (39). A Microsoft manda usar três nomes fixos (21). Nenhuma fonte cita descrição embaixo do nome. Sustentação: **padrão observado em 4 apps (segundo terceiros)** e **uma diretriz**.
4. **A grade é o formato certo para imagem; a lista é o formato certo para texto.** HIG Collections (5). Sustentação: **uma diretriz só**.
5. **A opção escolhida precisa de um sinal além da cor.** HIG Toggles e Accessibility (8, 13) e WCAG 1.4.1 (29). Boostcamp usa um visto (37); a Apple cita o visto para listas de opções (4). Sustentação: **várias diretrizes concordam** (inclui uma norma).
6. **O nome visível pode sair. O nome invisível não.** Controle que é imagem precisa de um nome para o leitor de tela (WCAG 1.1.1, item 28; HIG Icons e VoiceOver, itens 6 e 14). Sustentação: **várias diretrizes concordam** (inclui uma norma).
7. **A regra "todo ícone precisa de rótulo visível" é sobre ícone que representa uma função.** O NN/g (30) fala de ícones como o relógio ou o menu, que a pessoa precisa adivinhar. A Apple também pede rótulo nas abas (10). Numa escolha de avatar, a imagem não representa outra coisa: ela é a coisa escolhida. Essa distinção é **opinião** minha. Nenhuma fonte aberta trata dela.
8. **Escolha de aparência não entra no cadastro.** NN/g: escolher esquema de cores "não pertence ao cadastro" (32). Apple: adiar personalização não essencial e dar um bom padrão (1). Sustentação: **várias diretrizes concordam**.
9. **A mudança vale na hora, sem botão de confirmar.** Microsoft (21). Sustentação: **uma diretriz só**, de computador.
10. **Cuidado com tema próprio do app.** Apple: evitar ajuste de aparência próprio (12). Android: não refazer o tema do sistema, a não ser para ampliar (19). Isso vale para claro e escuro, não para o desenho do Boneco. Sustentação: **várias diretrizes concordam**.
11. **Quando a escolha tem consequência que a imagem não mostra, o texto volta.** Ladder: a escolha do treinador tem cartão com foto, botão e um cartão de ajuda (41). Sustentação: **1 app (segundo terceiros)**.
12. **Se um controle precisa de muito texto, o problema é o desenho.** Apple, ao falar de dicas: "considere simplificar o desenho da interface" (11). Sustentação: **uma diretriz só** (trecho sobre dicas no macOS; uso por analogia).

Não achei guia de plataforma que trate de "seletor de avatar" como padrão. Tudo acima vem de páginas vizinhas.

### O que isso sugere para o nosso app (opinião)

- A folha do Boneco pode ficar com as duas imagens grandes, lado a lado, e mais nada embaixo delas. Os dois desenhos são diferentes de olhar (um cinza, um com cor de pele). A imagem já diz tudo o que a descrição dizia.
- Manter um título curto na folha ("Escolha o Boneco" ou só "Boneco") e o "Fechar". É o que Finch e Duolingo mantêm, e o título serve ao leitor de tela.
- Tirar a frase de explicação, os nomes e as descrições. Guardar os nomes "Cinza" e "Cor de pele" como rótulo invisível de cada opção (`aria-label`). Isso é obrigação, não enfeite (itens 6, 14, 28).
- Marcar a escolhida com visto e borda, não só com cor (itens 8, 13, 29).
- A troca vale no toque, sem "Salvar". A palavra "(padrão)" sai: o visto já mostra o que está ativo.
- Não pôr esta escolha no cadastro. Ela fica em "Meus dados", com o cinza como padrão.
- Onde a opinião é mais fraca: ninguém testou "com nome" contra "sem nome". Se um dia houver três ou mais estilos parecidos entre si, o nome curto embaixo volta a valer.

## 2. Cadastro por toque

### O que os apps e os guias fazem

1. **Uma pergunta por tela.** Boostcamp, StrongLifts, Caliber, Peloton, Strava, Duolingo, Headspace e Finch (37, 38, 42, 43, 44, 45, 46, 47). Sustentação: **padrão observado em 8 apps (segundo terceiros)**. A pesquisa 02 já tinha achado o mesmo.
2. **As opções são cartões ou listas com texto curto. Não são ícones sozinhos.** Em todos os 8 apps as legendas falam de cartões, listas ou botões com palavras. Ícone ou desenho aparece junto do texto em alguns: Finch ("quatro cartões com ícones de natureza"), JEFIT (ilustrações de gênero e de tipo de corpo), Strava (grade de cartões de esporte) (47, 40, 44). Sustentação: **padrão observado em 8 apps (segundo terceiros)**.
3. **Número se escolhe tocando no número.** Seletor de rolagem para idade, altura, peso e dias (StrongLifts, Boostcamp, JEFIT; itens 38, 37, 40). Cartões numerados para dias por semana e duração (Caliber, Peloton, Duolingo; itens 42, 43, 45). Sustentação: **padrão observado em 6 apps (segundo terceiros)**.
4. **Ajuda escrita aparece em poucas telas, não em todas.** As legendas só citam texto de explicação em telas específicas: idade e agenda no StrongLifts (38), telefone no Strava (44), senha e privacidade no Peloton (43), um aviso no Caliber (42), um cartão de IMC no JEFIT (40). Sustentação: **padrão observado em 5 apps (segundo terceiros)**, e fraca: a legenda pode ter omitido subtítulos (limitação 2).
5. **O progresso é uma barra ou "passo X de N", não uma frase.** StrongLifts, Duolingo, Headspace (38, 45, 46). O Android recomenda barra ou passos (20). A crítica do Finch elogia a barra (49). Sustentação: **padrão observado em 3 apps** e **uma diretriz**.
6. **Os guias pedem cadastro curto e só com o essencial.** Apple: rápido, opcional, adiar o que não é essencial (1). Android: coletar só o crítico (20). NN/g: breve; o que não dá para justificar fica para depois (32). Sustentação: **várias diretrizes concordam**.
7. **Dica de opção: no máximo uma frase curta.** GOV.UK (27). A Apple manda quebrar em várias telas quando há mais de uma ideia (3). Sustentação: **várias diretrizes concordam**.
8. **Ícone não substitui a palavra da opção.** NN/g: poucos ícones são universais; rótulo visível sempre (30). Apple: texto quando o rótulo curto comunica melhor (7). Sustentação: **várias diretrizes concordam**.
9. **Mas ícone junto da palavra ajuda a achar.** No estudo do NN/g, marcador só de texto foi o mais lento (22 s contra 14 s) e o de menor acerto (76% contra 85%) (31). Sustentação: **estudo com dados**, mas a tarefa era achar itens numa lista de loja ou de ações, não responder a um cadastro.
10. **Os guias discordam sobre "uma coisa por tela".** O GOV.UK defende uma pergunta por página (pesquisa 01, ref. 18). O Android diz para dividir, "mas sem exagerar com uma entrada só por tela" (20). Sustentação: **diretrizes em conflito**.

### O que isso sugere para o nosso app (opinião)

- Manter a pergunta como título e as opções com palavra curta. O que sai é a ajuda embaixo da pergunta, a não ser onde a pessoa não consegue responder sem ela.
- Onde a resposta é número (dias por semana, minutos), mostrar só os números como botões grandes: 2, 3, 4, 5. A unidade fica na pergunta.
- Onde a opção tem imagem boa (equipamento, o próprio Boneco), mostrar a imagem e o nome. Aqui o nome fica: muita gente não sabe como se chama o aparelho, e a foto sozinha pode confundir.
- Trocar "pergunta 3 de 7" por uma barra.
- Cada pergunta que não muda o treino sai do cadastro (já estava na pesquisa 02).
- O texto de segurança da triagem não entra neste corte. Ele segue a regra 10 da pesquisa 01: o que a pessoa precisa para agir com segurança fica à vista.

## 3. Estado vazio

### O que os apps e os guias fazem

1. **Ninguém recomenda tela vazia sem nada.** NN/g: "não deixe o estado totalmente vazio" (34). Apple: tela em branco assusta se não for óbvio o que fazer; diga o próximo passo e dê um botão (3). Sustentação: **várias diretrizes concordam**.
2. **A receita é a mesma em quatro sistemas de design: título curto, corpo curto, um botão, imagem opcional.** Carbon, Atlassian, Primer, PatternFly (23, 24, 25, 26). Sustentação: **várias diretrizes concordam**.
3. **Todos pedem o mínimo de palavras, e nenhum dá número.** Carbon: "palavras no mínimo". Atlassian: "limitar ao máximo". Primer: texto secundário "breve e sem redundância". Sustentação: **várias diretrizes concordam**.
4. **O corpo de texto é a parte que pode sair.** Primer chama o texto secundário de opcional (25). Carbon admite casos em que o texto de apoio não é preciso (23). Sustentação: **duas diretrizes**.
5. **Nos apps, o vazio costuma ser ilustração ou ícone, uma frase de 2 a 5 palavras e um botão.** Boostcamp: "No Exercises Created" e "Add Exercise" (37). JEFIT: ilustração, "Create From Scratch" e um link (40). Duolingo: mascote e "ADD FRIENDS" (45). Peloton: mensagem e "Browse classes" (43). Hevy: sino e "no recent notifications" (39). Finch: caixa de correio e "No new mail in sight!" (47). Ladder: "No Notifications Yet" (41). Caliber: "Nothing new at the moment" (42). Sustentação: **padrão observado em 8 apps (segundo terceiros)**.
6. **Quando o botão já diz o próximo passo, a frase vira só o nome do que falta.** "No Exercises Created" e "Add Exercise" (37). Sustentação: **padrão observado em alguns apps (segundo terceiros)**; a leitura é minha.
7. **O vazio some. Não pôr nele o que a pessoa vai precisar depois.** Apple (3). Sustentação: **uma diretriz só**.
8. **A imagem do vazio precisa de equivalente para quem não vê.** Primer (25), WCAG 1.1.1 (28). Sustentação: **várias diretrizes concordam**.

Não achei nenhum app com estado vazio sem texto algum.

### O que isso sugere para o nosso app (opinião)

- Vazio em três peças: o Boneco (ou um ícone), um título de 2 a 4 palavras e um botão com o próximo passo. Sem parágrafo.
- Exemplo: histórico sem treino. Título "Nenhum treino ainda" e botão "Começar o treino de hoje".
- Se o botão já diz tudo, testar sem o título. Mas manter um nome invisível na imagem.
- Nada de explicação de função no vazio. A explicação aparece quando a pessoa usa.
- Exercício sem animação aprovada continua como cartão de texto (regra do projeto). Isso não é estado vazio e não entra neste corte.

## 4. Tela de configuração e "meus dados"

### O que os apps e os guias fazem

1. **Primeiro o rótulo. A explicação só entra se o rótulo não bastar.** Apple: "se o rótulo não bastar, acrescente uma explicação" (3). Android: "se o rótulo basta sozinho, não acrescente texto secundário" (19). Microsoft: descrição é opcional (21). Sustentação: **várias diretrizes concordam** (três fabricantes).
2. **Embaixo do rótulo vai o valor ou o estado, não a descrição.** Android: "mostre o estado do ajuste em vez de descrever o ajuste" (19). GNOME: linha de propriedade é nome e valor (22). Sustentação: **várias diretrizes concordam**.
3. **Nos apps, a linha típica é rótulo e valor, ou rótulo e interruptor.** Hevy: volume do som "High", idioma "English" (39). StrongLifts: unidade "kg" (38). Ladder: "Imperial" (41). JEFIT: medidas com ícone e valor atual (40). Caliber: som do descanso "Ding" (42). Sustentação: **padrão observado em 5 apps (segundo terceiros)**.
4. **Texto de explicação aparece em poucas linhas, quase sempre onde o efeito não é óbvio.** Hevy: Apple Health e séries de aquecimento (39). StrongLifts: bloqueio de tela, por causa da bateria (38). Strava: pausa automática e bloqueio de tela (44). Headspace é a exceção: várias telas com bloco de texto e interruptor (46). Sustentação: **padrão observado em 4 apps (segundo terceiros)**.
5. **Explicação longa vai para uma segunda tela.** Android (19). Apple, sobre listas: mostrar só o título e abrir o detalhe (4). Sustentação: **várias diretrizes concordam**.
6. **Rótulo curto, com a palavra principal na frente.** Microsoft: uma palavra nos títulos (21). Android: não repetir o título da seção, sem verbos genéricos (19). NN/g: curto e direto, sem pergunta (33). Apple: dispensar "meu" e "seu" quando não fazem falta ("Favoritos", não "Seus favoritos") (3). Sustentação: **várias diretrizes concordam**.
7. **Descrever só o lado "ligado".** Apple: a pessoa deduz o contrário (3). NN/g: o rótulo diz o que acontece quando está ligado (33). Sustentação: **várias diretrizes concordam**.
8. **Menos ajustes.** Apple: reduzir o número de ajustes e dar bons padrões (2). Microsoft: quatro ou cinco no total (21). Android: número "administrável" e, com 15 ou mais, agrupar em subtelas (19). Sustentação: **várias diretrizes concordam** no sentido; os números são diferentes e de plataformas diferentes.
9. **A mudança vale na hora.** Microsoft (21). Sustentação: **uma diretriz só**.
10. **Tela de ajustes cheia pesa.** A crítica do Finch diz que a tela "pode sobrecarregar" e pede revelação progressiva (49). Sustentação: **opinião de terceiro** (trabalho de estudante).

### O que isso sugere para o nosso app (opinião)

- Cada linha de "Meus dados": rótulo de uma a três palavras e, embaixo ou à direita, o valor atual. Exemplo: "Algo a evitar" e "Nada marcado". Isso o app já faz nessas linhas, e bate com os três fabricantes.
- Nenhuma linha com frase de descrição por padrão. Descrição só onde o efeito não se vê na hora (por exemplo, apagar dados), e com uma frase.
- O rótulo não repete o título da tela. Em "Meus dados", a linha é "Objetivo", não "Meu objetivo".
- Privacidade é exceção combinada: as linhas fixas da pesquisa 02 ("Fica no aparelho", "Sem conta") são valores, não descrições, e ficam.
- A folha que abre ao tocar numa linha também não precisa repetir o que a linha já disse.

## 5. Fim de treino

### O que os apps e os guias fazem

1. **O fim do treino é feito de números e de um desenho.** StrongLifts: duração, volume, lista de exercícios (38). Hevy: duração e volume (39). Boostcamp: desenho dos músculos e cartões (37). JEFIT: peso levantado, duração, mapa de músculos (40). Peloton: duração, calorias, desenho dos músculos (43). Ladder: números, sequência da semana, medalha (41). Strava: mapa, distância, tempo, gráfico (44). Duolingo: três cartões de número (45). Sustentação: **padrão observado em 8 apps (segundo terceiros)**. A pesquisa 02 já tinha achado o mesmo em 4.
2. **A frase vira um título de uma ou duas palavras.** Duolingo: "Lesson complete" (45). Ladder: "SUCCESS" com um visto (41). Peloton: um título de parabéns (43). Caliber: uma mensagem de comemoração (42). Sustentação: **padrão observado em 4 apps (segundo terceiros)**. Nenhuma legenda cita parágrafo, mas ver limitação 2.
3. **Dois a quatro números, não dez.** Duolingo mostra três (45). StrongLifts e Hevy destacam dois (38, 39). Sustentação: **padrão observado em 3 apps (segundo terceiros)**; a contagem é das legendas.
4. **Um botão principal.** Duolingo: "Claim XP" (45). Hevy: "Done" (39). Caliber: "Continue" (42). StrongLifts: "Share Workout" (38). Sustentação: **padrão observado em 4 apps (segundo terceiros)**.
5. **Se há pergunta, é de um toque.** Strava: esforço percebido (44). Ladder: estrelas (41). Sustentação: **padrão observado em 2 apps**; a pesquisa 02 achou mais dois.
6. **A Apple pede um resumo que confirme o fim e mostre o que foi registrado.** HIG Workouts (15). Não fala de frase. Sustentação: **uma diretriz só**.
7. **Número precisa de contexto para ser lido.** Apple, sobre gráficos: resumir a mensagem principal num título curto; um valor sozinho raramente basta (18). Sustentação: **uma diretriz só**, por analogia.
8. **Texto para quem está em movimento: grande, com contraste, o mais importante primeiro.** HIG Workouts (15) e watchOS (17). Sustentação: **uma diretriz só** (Apple, duas páginas).
9. **Não copiar os anéis da Apple.** São só para os dados de atividade da Apple (16). Sustentação: **uma diretriz só**, mas é regra de uso da marca.

### O que isso sugere para o nosso app (opinião)

- Um título de duas palavras ("Treino feito") com um visto, no lugar da frase de abertura.
- Três números, cada um com um rótulo de uma palavra: tempo, séries, e o que subiu (por exemplo, "+2,5 kg" ao lado do nome do exercício). O rótulo de uma palavra fica: número sem nome não se lê.
- A semana como marca: "3 de 4" e uma barra, sem frase.
- Marca de progresso só quando houve progresso de verdade (já estava na pesquisa 02).
- Um botão só.
- A pergunta "alguma dor?" fica, como pergunta de um toque. É regra de segurança do projeto, não texto de enfeite.
- Barra ou anel próprio, com desenho diferente dos anéis da Apple.

## O que quase todos fazem

- **Opção que é imagem vira grade de imagens para tocar**, com um título curto e um botão (Finch, Duolingo, Peloton, StrongLifts). Segundo terceiros.
- **Opção que é conceito continua com palavra.** Tema claro ou escuro, objetivo, nível: sempre nome curto, sem descrição (Strava, Boostcamp, JEFIT, Hevy e os 8 apps do cadastro). Segundo terceiros.
- **A escolhida tem um visto.** Apple, WCAG e os apps concordam: não só cor.
- **Uma pergunta por tela, opções em cartão, número tocando no número, barra de progresso.** 8 apps, segundo terceiros.
- **Estado vazio com três peças:** imagem, frase curta, botão. Quatro sistemas de design e 8 apps.
- **Linha de ajuste é rótulo e valor.** Apple, Android e Microsoft dizem que a descrição só entra se o rótulo não bastar. 5 apps fazem assim, segundo terceiros.
- **Fim de treino em números, com título de uma ou duas palavras e um botão.** 8 apps, segundo terceiros.
- **O nome invisível fica sempre.** Tirar o texto da tela não tira o rótulo do leitor de tela (WCAG, Apple, Primer).

## Onde a evidência é fraca

- **Ausência de texto não foi vista, foi deduzida.** As legendas dizem o que há na tela. Quando não citam subtítulo ou descrição, pode ser porque não há ou porque a legenda não contou. Toda frase deste arquivo do tipo "sem descrição" vale como "nenhuma fonte cita descrição".
- **Nenhum estudo compara tela com texto e tela sem texto** em app de treino, de saúde ou de hábito. Não achei.
- **Avatar sem nome: nenhum guia trata disso.** A conclusão junta páginas vizinhas (grade para imagem, rótulo invisível, sinal além da cor) com 4 apps descritos por terceiros. A distinção entre "ícone que representa" e "imagem que é a opção" é minha.
- **O único estudo com números a favor de imagem (31) mede outra tarefa:** achar itens numa lista. E testou marcador, não opção de escolha.
- **Sobre ícone sem rótulo, as fontes discordam.** O NN/g (30) diz "sempre rótulo visível". O UX Movement (36) diz que ícone conhecido é mais rápido depois de aprendido, mas só a introdução abriu e o estudo citado não foi lido. Os números que circulam (88% de acerto com rótulo, 60% sem) só apareceram em resumo de busca.
- **"Uma coisa por tela" não é consenso.** GOV.UK defende; o Android avisa para não exagerar (20).
- **Os números de quantos ajustes cabem numa tela são de plataformas diferentes** (Microsoft: 4 ou 5, em computador; Android: agrupar a partir de 15). Não usar como regra.
- **Microsoft e GNOME são guias de computador.** Entram porque dizem o mesmo que Apple e Android, não por conta própria.
- **Material Design 3 não foi lido.** Provavelmente concorda com o guia do Android, mas isso não foi conferido.
- **Fim de treino: a Apple só diz que deve haver um resumo.** O resto é padrão de apps, segundo terceiros. Ninguém mediu se a pessoa entende melhor três números que uma frase.
- **Todos os apps são em inglês.** Rótulos em português costumam ser mais longos. "Lesson complete" tem 2 palavras; a tradução pode ter 3.
- **Cortar texto tem um limite que esta pesquisa não mede:** o aviso de segurança e o que a pessoa precisa para decidir. Para isso valem as regras 10, 13 e 14 da pesquisa 01.

## Não abri / não achei

Nada abaixo sustenta conclusão deste arquivo.

**Abri, mas veio sem conteúdo útil:**

- **Material Design 3, "Lists"** (m3.material.io/components/lists/guidelines) e **"UX writing best practices"**: só o título.
- **Material Design 2, "Empty states"** (m2.material.io): sem conteúdo.
- **Baymard, amostras de cor e tamanho** (baymard.com/blog/color-and-size-swatches): sem conteúdo.
- **IBM Carbon, "Tile"**: abriu, mas sem orientação sobre imagem ou quantidade de texto em cartão selecionável.
- **Apple Support, "Use Memoji"** (support.apple.com/en-us/111115, 27/05/2026): abriu. Só diz "personalize os traços" e "toque em Done". Não descreve como as opções aparecem.
- **Apple, guia do Apple Watch, "End and review your workout"** e **guia do iPhone, atividade**: vieram sem o trecho do resumo (só índice).
- **Strava, artigo de ajuda sobre a página da atividade**: o texto devolvido era sobre distância, não sobre a tela.
- **ScreensDesign, Fitbod** (endereço `/apps/`): só títulos de capítulo e "Unlock Pro".
- **ScreensDesign, artigo sobre o cadastro do Finch**: só diz que há uma tela para "escolher um ovo".
- **ScreensDesign, artigo "workout tracker app design examples"**: trata da tela durante o treino, não do fim.
- **Appcues GoodUX, cadastro do Duolingo**: fala de objetivo e motivação, sem descrever as telas.
- **Reteno, telas do Finch**: só a tela de login da galeria.

**Deu erro ou bloqueio:**

- **Central de ajuda do Hevy** (help.hevyapp.com): 403. **Hevy, página "workout summary"**: 404.
- **Yahoo Tech, artigo sobre o Hevy**: 403. O que ele diria sobre o resumo do treino só apareceu em resumo de busca.
- **Mobbin** (estado vazio): 403.
- **Shopify Polaris, "Empty state"**: redireciona para outra página, como na pesquisa 01.
- **ScreensDesign, Streaks e Whoop**: 404.
- **Google, ajuda do Pixel sobre papel de parede e cores**: 404.
- **Snapchat, ajuda do Bitmoji**: redireciona para a página inicial da ajuda. Não segui.
- **UserTesting, estudo de ícones com e sem rótulo**: 404. Os números (88%, 60%, 34%) só apareceram em resumo de busca.

**Só em resumo de busca (não abri):**

- **Estudo de Wiedenbeck (1999) sobre ícone, rótulo e os dois juntos** em programa de e-mail.
- **Estudo citado pelo UX Movement** sobre busca mais rápida com ícones em tela pequena.

**Não tentei nesta rodada:** Page Flows, Calm, Oura, Nike Training Club, MacroFactor, Strong, Apple Fitness (como galeria).

**Não achei:**

- Guia de plataforma ou de sistema de design sobre seletor de avatar.
- Estudo que compare opção com imagem e nome contra opção só com imagem.
- App com estado vazio sem nenhum texto.
- Estudo sobre quantidade de texto na tela de fim de treino.
- Descrição de terceiros de uma tela de "meus dados" de app de treino com contagem de palavras.

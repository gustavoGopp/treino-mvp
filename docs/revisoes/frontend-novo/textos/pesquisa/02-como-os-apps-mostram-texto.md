# Pesquisa 02: como os apps mostram texto

Data da pesquisa: 13/11/2026.

## O que foi pesquisado

Como apps de treino, de saúde e de hábito lidam com texto: explicação de exercício, "por quê" de uma recomendação, aviso de segurança, definição de termo, triagem de saúde, privacidade e termos. Também: padrões de componente (dica, folha de baixo, acordeão, onboarding contextual) e o que a pesquisa de usabilidade diz de cada um.

Não repete a pesquisa `docs/revisoes/frontend-novo/pesquisa/03-apps-de-treino-e-saude.md` (acabamento, registro de série, descanso, gráficos).

Foram abertas 38 páginas (37 com conteúdo útil e 1 só parcial, a do Material 3). Elas cobrem 20 apps: Hevy, StrongLifts (a página do "Strong" não abriu), Fitbod, Boostcamp, MacroFactor, JEFIT (ver limitação 5), Freeletics (ver limitação 5), Ladder, Caliber, Centr, Nike Training Club, Peloton, Strava, Duolingo, Headspace, Noom, MyFitnessPal, Flo, Oura e Zero.

## Limitações (o que não deu para ver)

1. **Quase nenhuma tela foi vista como imagem.** As ferramentas leem texto. As galerias (ScreensDesign, Reteno) dão legendas e resumos escritos por terceiros. Por isso, tudo sobre telas vem "segundo ScreensDesign" (ou outra fonte). Nenhum app foi instalado ou aberto.
2. **Galerias com parte fechada.** O ScreensDesign mostra poucas telas e esconde o resto atrás de "Unlock Pro". Mobbin, Page Flows, UX Archive e Growth.Design não foram abertos. Built for Mars já tinha sido visto na pesquisa 03 (parte paga fechada).
3. **Centrais de ajuda bloqueadas.** Hevy, Fitbod (Zendesk), MacroFactor (a página abriu, mas sem lista de artigos), Whoop (The Locker) e a ajuda do Strong deram 403, 404 ou página vazia. O "por quê" das cargas desses apps, em texto oficial, não foi confirmado.
4. **Páginas de ScreensDesign que deram 404:** Calm, Whoop, Centr (endereço de app), Strong. Nike Training Club: o endereço de galeria não existe. Só vi a página oficial de marketing.
5. **Atenção a dois endereços.** Eu pedi as páginas `.../freeletics-workouts-fitness/` e `.../jefit-workout-planner-gym-log/`. O conteúdo devolvido pela ferramenta não traz o nome do app. As descrições combinam com Freeletics (coach de IA, jornadas) e com um app de academia com "pontos Iron" (JEFIT?), mas não pude confirmar. Tratei como "provável". Use com cuidado.
6. **Flo:** a página oficial do Modo Anônimo veio truncada (só o título). Usei só a galeria e a busca.
7. **Apple (HIG de onboarding e de privacidade):** a ferramenta devolveu um resumo parcial, em parte inferido. Não conto como referência aberta. O mesmo para as diretrizes de tooltip do Material 3 (resumo curto, sem números), que entram só como apoio.
8. **Baymard:** a página abriu vazia (só o título do site). Nada do Baymard foi confirmado. Para ajuda em formulário, usei Nielsen Norman Group e o ICO.
9. **Duolingo, Headspace, Noom, Zero e Oura** não têm fonte oficial de "como mostram o texto" aberta. Duolingo tem uma fonte semi-oficial (resumo do manual de produto). Noom: o artigo da RevenueCat deu 404.
10. **Termos de uso em linguagem simples:** não achei um exemplo aberto de app de treino que resuma os termos em tópicos. O único achado é indireto (Strava, relato da imprensa).
11. **Datas:** as galerias não mostram a data da análise; só o ano de copyright. Versões de app mudam. Onde há data, está anotada.

## Referências

Cada item tem URL, tipo de fonte e o que mostra. "Segundo X" significa que a descrição é de terceiros.

### Pesquisa de usabilidade e normas

1. https://www.nngroup.com/articles/tooltip-guidelines/. Artigo do Nielsen Norman Group (NN/G), 27/01/2019. Tooltip aparece por hover e "normalmente não existe em telas de toque". Não colocar nada vital nele. Em toque, usar dica que abre com toque (ícone "?" ou "i").
2. https://www.nngroup.com/articles/mobile-instructional-overlay/. NN/G, 16/02/2014. Telas de instrução na abertura costumam ser desnecessárias. Prefira dicas uma a uma, na hora certa. Muitas dicas juntas aumentam a carga e intimidam.
3. https://www.nngroup.com/articles/bottom-sheet/. NN/G, 11/06/2023. Folha de baixo serve para informação extra e interrupção curta. Precisa de botão X visível, aceitar "Voltar", não empilhar, não para texto longo.
4. https://www.nngroup.com/articles/mobile-accordions/. NN/G, 31/05/2015. Acordeão dá visão geral antes do detalhe e economiza espaço. Riscos: desorientação, rolagem longa. Não deixar o primeiro aberto.
5. https://www.nngroup.com/articles/progressive-disclosure/. NN/G, 03/12/2006. Mostrar o essencial e deixar o raro para depois. Mais de 2 níveis de profundidade costuma ter usabilidade baixa.
6. https://www.nngroup.com/articles/modal-nonmodal-dialog/. NN/G, 23/04/2017. Modal interrompe e exige ação. Serve para aviso crítico e risco irreversível. Evitar para informação não essencial.
7. https://www.nngroup.com/articles/empty-state-interface-design/. NN/G, 19/09/2021. Estado vazio deve dizer o que é, como preencher e dar um botão. Ajuda contextual aí costuma ser melhor que tutorial forçado.
8. https://www.nngroup.com/articles/how-little-do-users-read/. Nielsen, 2008 (45.237 visitas, 25 pessoas). Em média se lê cerca de 20% do texto da página. Cada 100 palavras a mais dá só 4,4 s a mais de visita. Conclusão: cortar texto.
9. https://m3.material.io/components/tooltips/guidelines. Diretriz do Material Design 3. Resumo parcial: dica simples (curta) e rica; em toque, abre com toque longo. Só apoio (ver limitação 7).

### Privacidade e termos

10. https://developer.apple.com/app-store/app-privacy-details/. Página oficial da Apple. Rótulo de privacidade: 16 categorias de dados (inclui "Saúde e fitness" e "Fotos e vídeos"), finalidade de cada uso, e duas etiquetas: "vinculado a você" e "usado para rastrear". Dados que só ficam no aparelho não entram.
11. https://support.google.com/googleplay/android-developer/answer/10787469. Página oficial do Google Play. Seção "Segurança dos dados": o usuário vê, antes de instalar, o que é coletado e compartilhado, se há criptografia em trânsito e se dá para pedir exclusão. Se não coleta nada, a seção diz isso.
12. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-methods-can-we-use-to-provide-privacy-information/. Regulador do Reino Unido (ICO), guia atual. Aviso em camadas (resumo curto no alto, detalhe por link), aviso na hora do dado, painel de preferências, poucos ícones. Para celular: texto legível sem zoom e sem alertas constantes.
13. https://www.strava.com/legal/privacy. Política oficial da Strava (vigência 01/01/2026). Começa com links para os outros documentos legais, título, data e um parágrafo de objetivo, depois "Scope". Não tem resumo em tópicos no alto.
14. https://www.bikeradar.com/news/strava-2026-policies. Imprensa, 26/11/2025. Strava avisou por e-mail que "reescreveu e redesenhou" as políticas. A parte de cobrança foi reescrita em linguagem mais simples. O artigo não cita um resumo em linguagem simples.
15. https://southlake.ca/wp-content/uploads/2025/02/PARQPlus2025-Form-fillable.pdf. Formulário oficial do PAR-Q+ (versão de 01/11/2024). Ver seção da triagem.

### Apps de treino e força (galerias, páginas oficiais)

16. https://screensdesign.com/apps/boostcamp-gym-workout-fitness/. ScreensDesign (197 telas, legendas). Boostcamp: perguntas de perfil, lesões e limitações no cadastro; tutorial em sobreposição com opção de pular; um modal que explica como as séries são calculadas; fim de treino com métricas e mapa de músculos.
17. https://screensdesign.com/apps/stronglifts-weight-lifting-log/. ScreensDesign. StrongLifts: tela de "aquecimento" que explica o lembrete antes do pedido do sistema; avisos em modal só para ações que apagam dados; fim de treino com duração, volume e botão de compartilhar.
18. https://screensdesign.com/showcase/macrofactor-workouts-tracker. ScreensDesign. MacroFactor Workouts: ensina RIR (reps em reserva) no próprio fluxo; "Smart Progression" alimenta o plano; mostra passos "científicos" ao montar o plano. Avisos e fim de treino: a página não descreve.
19. https://screensdesign.com/showcase/fitbod-gym-fitness-planner. ScreensDesign. Fitbod: dicas (tooltips) no primeiro treino; mapa do corpo mostra músculo recuperado ou cansado (explica o treino do dia); fim de treino com confete e paywall. Avisos de saúde: a página não menciona.
20. https://screensdesign.com/showcase/hevy-workout-tracker-gym-log. ScreensDesign. Hevy: 10 passos; dica contextual explica como registrar halteres; fim de treino não descrito.
21. https://www.hevyapp.com/features/. Página oficial do Hevy. Só títulos de recursos (biblioteca, notas por exercício, séries por músculo por semana, notificação de recorde). Sem avisos descritos. Só marketing, não vi telas.
22. https://screensdesign.com/apps/freeletics-workouts-fitness/ (app provável: Freeletics; ver limitação 5). ScreensDesign. Modal de consentimento com três botões (aceitar tudo, só o necessário, personalizar); pré-aviso de rastreamento antes do pedido do sistema; quiz com "passo X de 12"; modal numerado com regras de contagem de repetição; fim de treino com pontos, ranking e pergunta sobre a execução.
23. https://screensdesign.com/apps/jefit-workout-planner-gym-log/ (app provável: JEFIT; ver limitação 5). ScreensDesign. Pergunta lesões ("costas ou joelhos sensíveis") no cadastro; guia do exercício com vídeo, diagrama de músculos e notas; painel de recuperação com marcação de lesão; telas de aquecimento antes de cada permissão; fim de treino com métricas e botão "Save Workout".
24. https://screensdesign.com/apps/ladder-strength-training-plans/. ScreensDesign. Ladder: cartões de ajuda nas telas de escolha; linha do tempo do teste grátis em 4 passos; tela com 5 instruções de gesto para o treino; modal "Swap Movement" com recomendação do treinador; "área perigosa" para excluir conta.
25. https://screensdesign.com/apps/caliber-strength-training/. ScreensDesign. Caliber: lições semanais curtas ("Why Strength Training", com botão "Complete Lesson"); modal do Strength Score com os níveis; banner com link "Take me there"; opção "Dealing with an injury" no questionário; modal "salvar como modelo?" no fim.
26. https://screensdesign.com/showcase/centr-personal-fitness-app. ScreensDesign. Centr: 16 passos, quiz e paywall duro; modos "Coached" e "Self-Guided". Avisos, explicação de exercício e fim de treino: não descritos.
27. https://screensdesign.com/showcase/peloton-fitness-workouts. ScreensDesign. Peloton: antes da aula há uma prévia com equipamento, playlist e plano da aula. Pede notificações e dados de saúde depois da assinatura. Fim de treino: não descrito.
28. https://www.nike.com/ntc-app. Página oficial do Nike Training Club. Só texto de marketing (treinos, programas, treinadores). Sem aviso de segurança nem explicação de exercício. Não vi as telas.
29. https://screensdesign.com/showcase/strava-run-bike-hike. ScreensDesign. Strava: 18 passos; a página diz que a navegação pode confundir. Termos e privacidade: não citados. Resumo da atividade: feed com kudos e gráficos.

### Apps de saúde e hábito

30. https://screensdesign.com/showcase/duolingo-language-lessons. ScreensDesign. Duolingo: 45 passos, mas faz uma lição antes de pedir conta. Mascote dá o feedback. A página mostra só 7 telas; não vi o texto por tela.
31. https://www.925studios.co/blog/duolingo-design-breakdown. Análise de agência (datas inconsistentes na página). Segundo ela, o Duolingo "educa" com dicas durante a atividade, painéis que deslizam entre lições e ilustrações de estado vazio, não com tutorial no início.
32. https://www.mindtheproduct.com/lessons-from-duolingos-product-handbook/. Artigo, 13/02/2025, sobre o manual de produto do Duolingo. Segundo ele, a empresa evita pop-ups e onboarding longo. Cita: "se uma função ou tela precisa de explicação, não está certa".
33. https://screensdesign.com/showcase/headspace-meditation-sleep. ScreensDesign. Headspace: 10 passos; leva a um exercício guiado de respiração em vez de listar funções; linha do tempo visual do teste grátis (quando termina, quando avisa, quando cobra).
34. https://screensdesign.com/showcase/noom-weight-loss-food-tracker. ScreensDesign. Noom: 77 passos ("excepcionalmente longo", segundo a página); lições e "artigos curtos" dentro da jornada. O texto das lições não aparece na página pública.
35. https://gallery.reteno.com/flows/web-screens-myfitnesspal. Galeria Reteno. MyFitnessPal (fluxo web): prova social antes da personalização, busca de alimento antes do cadastro. Texto por tela e consentimento: só em imagens, não vi.
36. https://screensdesign.com/apps/flo-period-pregnancy-tracker/. ScreensDesign. Flo: consentimento de privacidade com caixas no início; pedido de rastreamento; Modo Anônimo com tela de introdução e aviso das limitações; modais educativos com aviso médico e crédito de revisão por especialistas; perguntas de onboarding com "pouco texto, uma pergunta, opções curtas e um botão" (leitura do autor da página).
37. https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score. Central de ajuda da Oura, atualizada em 01/10/2026. Artigo de cerca de 800 palavras, com índice no topo: o que é, o que é uma boa nota, como melhorar (2 dicas), fatores que reduzem (6 itens). Faixas fixas: 85-100 ótima, 70-84 boa, 60-69 razoável, 0-59 requer atenção. Primeira frase funciona como resumo.
38. https://www.zerolongevity.com/blog. Blog do Zero. Respostas rápidas em perguntas e respostas ("café preto quebra o jejum?"). Sem aviso médico formal; o único alerta é consultar profissional para decisões de jejum ou suplemento.

## Abertura (o que o app não faz, privacidade em uma frase)

1. **Valor antes de texto.** Duolingo põe a pessoa numa lição antes do cadastro (ScreensDesign, item 30). Headspace leva a um exercício guiado (item 33). Aqui: a abertura mostra "monte seu treino" e um botão; o "o que o app não faz" vira uma linha com "saiba mais".
2. **Camada curta com link.** O ICO descreve aviso curto no alto e detalhe por link (item 12). Aqui: uma frase de privacidade ("tudo fica no seu aparelho") e um link "Como tratamos seus dados".
3. **Linha do tempo em vez de parágrafo.** Headspace mostra o teste grátis como uma linha visual (item 33); Ladder usa 4 passos (item 24). Aqui: "o que o app faz / não faz" como 3 ícones com uma palavra cada, o texto abre ao tocar.
4. **Pedido de permissão com tela de aquecimento.** StrongLifts, Freeletics, Ladder e JEFIT explicam antes do pedido do sistema (itens 17, 22, 23, 24). Aqui: a foto do equipamento tem uma tela de uma frase sobre o que acontece com a imagem, antes de pedir a câmera.
5. **Não deixar tutorial na abertura.** O NN/G recomenda dicas na hora certa (item 2) e o Duolingo diz evitar onboarding longo (item 32). Aqui: nada de carrossel de funções na abertura.

## Triagem de saúde

1. **PAR-Q+ oficial: 7 perguntas curtas, sim ou não, na primeira página.** Se todas forem "não", a pessoa está liberada e a página já diz "comece devagar". Se alguma for "sim", vai para perguntas de seguimento por condição, e cada condição só abre se a pessoa disser que a tem (item 15). Aqui: uma pergunta por tela, a lista de 9 condições vira perguntas de sim/não e só as respostas "sim" abrem uma pergunta de seguimento.
2. **Resultado em uma frase, depois a ação.** No PAR-Q+, o resultado é "liberado" ou "completar as páginas 2 e 3 / falar com profissional" (item 15). Aqui: dois resultados, cada um com um título, uma frase e um botão.
3. **Texto de apoio só no que for confuso.** A página do PAR-Q+ põe um esclarecimento dentro da própria pergunta ("responda NÃO se a tonteira foi por respiração rápida"). Aqui: esclarecimento curto sob a pergunta que precisa dele, não dois parágrafos antes da lista.
4. **Aviso de que a avaliação vale por 12 meses e perde a validade se a saúde mudar** (item 15). Aqui: uma linha no resultado ("refaça se algo mudar") em vez de um parágrafo no início.
5. **Cadastro que pergunta lesão como escolha, não como texto.** Caliber, JEFIT e Boostcamp perguntam por lesões e limitações no cadastro com opções (itens 16, 23, 25). Nenhum dos três, segundo as páginas, mostra aviso de segurança longo ali.

Observação: uma prévia acadêmica de 2024 (resumo de busca, não abri o PDF) diz que só 3 das 7 perguntas principais foram "facilmente compreendidas". Não confirmei. Vale testar o texto das perguntas com pessoas reais.

## Perguntas do cadastro com ajuda

1. **Uma pergunta, opções curtas, um botão.** Segundo ScreensDesign sobre o Flo (item 36), o onboarding costuma ter pouco texto por tela. Aqui: a ajuda de 2 a 3 linhas vira uma linha só, no máximo.
2. **Ajuda que abre com toque.** O NN/G diz que dica de hover não existe em toque; serve a "dica que abre" com "?" ou "i" (item 1). Aqui: um "?" ao lado da pergunta abre uma folha curta. O NN/G ainda diz para não pôr nada vital ali (item 1).
3. **Explicar por que se pergunta, na hora.** O ICO chama de "aviso na hora do dado": uma frase curta onde a pessoa vai digitar (item 12). Aqui: "Perguntamos a altura só para escolher a carga inicial" sob o campo, sem parágrafo.
4. **Perguntar o que muda o plano; adiar o resto.** Boostcamp e JEFIT perguntam equipamento, frequência e limitações; peso desejado e idade ficam como campos simples (itens 16, 23). O NN/G pede dividir o essencial e o raro (item 5). Aqui: o que não muda o treino sai do cadastro.
5. **Valor visível enquanto responde.** Boostcamp mostra "montando seu plano" com barra de progresso (item 16); Freeletics mostra "passo X de 12" (item 22). Aqui: barra de progresso e um aviso curto de "faltam N perguntas".

## Definições de termos (série, repetição, reserva)

1. **Ensinar no ponto de uso, não numa lista.** MacroFactor ensina RIR no fluxo, segundo ScreensDesign (item 18). Aqui: o bloco "Como ler o seu treino" com 5 definições vira uma palavra sublinhada ou um "?" na primeira vez em que a palavra aparece.
2. **Folha de baixo curta.** O NN/G aceita folha para detalhe extra, mas só para interação curta, com X visível e sem empilhar (item 3). Aqui: "Reserva" abre uma folha de 2 frases e um exemplo.
3. **Modal só para regra que importa.** Boostcamp tem um modal que explica como as séries são calculadas (item 16); Freeletics tem um modal numerado de regras de contagem (item 22). Aqui: um modal desses só para a regra da reserva, que é a mais confusa.
4. **Lição curta, separada.** Caliber tem lições semanais curtas, com botão de completar (item 25). Aqui: as definições ficam numa área "Aprender" opcional, com cartões de uma ideia cada.
5. **Termo sem explicar confunde.** A crítica já anotada na pesquisa 03 ("Kudos" do Strava) e o NN/G (item 8) apontam o mesmo: quem lê pouco desiste. Aqui: toda palavra técnica tem uma definição de uma linha na primeira aparição.

## Avisos do programa (fases, avisos longos, "Sobre o programa")

1. **Aviso só onde a ação é arriscada.** StrongLifts usa modal de alerta só para o que apaga dados (item 17); o NN/G diz que modal serve para risco irreversível, não para informação geral (item 6). Aqui: o aviso de segurança fica num modal curto na triagem e na primeira vez que o programa começa. O resto vira cartão.
2. **Cartão com título-frase.** Caliber usa telas como "Knowledge Is Power" e lições com título (item 25). Aqui: "Sobre o programa" vira 3 cartões ("Por que 3 fases", "Quando parar", "O que o app não faz"), cada um com título-frase e 1 linha.
3. **Dois níveis no máximo.** NN/G: mais de 2 níveis de profundidade piora a usabilidade (item 5). Aqui: cartão (nível 1) abre folha com o texto (nível 2). Sem terceiro nível.
4. **Aviso fixo e curto, perto de onde importa.** Flo repete avisos médicos curtos em várias telas de saúde, segundo ScreensDesign (item 36). Aqui: a linha "Dor aguda? Pare e procure um profissional" fica sempre à mão no treino, não em parágrafo.
5. **Acordeão para as fases.** O NN/G dá o acordeão como visão geral antes do detalhe (item 4), mas pede para não deixar o primeiro aberto e para o "Voltar" recolher. Aqui: as fases são 3 linhas fechadas.

## "Por quê" de cada exercício, com nível de evidência

Não achei em nenhum app aberto um selo de nível de evidência. Os padrões abaixo são de como se mostra o "por quê".

1. **Mapa do corpo como justificativa.** Fitbod usa um mapa de músculos recuperados ou cansados para explicar o treino do dia, segundo ScreensDesign (item 19). Aqui: o "por quê" do exercício é um desenho do músculo e uma frase, com o selo de evidência ao lado.
2. **Modal de "como calculamos".** Boostcamp tem um modal explicando como as séries são calculadas (item 16). Aqui: o selo "evidência moderada" é um botão; tocar abre uma folha com a regra e a fonte.
3. **Recomendação do treinador na troca.** Ladder mostra, no modal de troca, a recomendação do treinador e alternativas (item 24). Aqui: ao trocar, o app mostra a regra que escolheu cada alternativa, em uma linha.
4. **Passos "científicos" durante o carregamento.** MacroFactor mostra, segundo ScreensDesign, etapas "científicas" ao montar o plano (item 18). Aqui: na montagem do programa, 3 linhas curtas ("escolhemos 10 séries por semana: evidência robusta").
5. **Lista curta, resto sob demanda.** Oura abre com uma frase-resumo e deixa o resto em seções (item 37). Aqui: mostrar 1 justificativa (a principal) com selo, "ver mais 3" abre as outras.

## Fim do treino

1. **Resumo em número, não em parágrafo.** StrongLifts mostra duração, volume e lista de exercícios (item 17). Freeletics mostra pontos, ranking e recorde (item 22). Boostcamp mostra métricas e mapa de músculos (item 16). Aqui: o parágrafo sobre a semana vira "3 de 4 treinos" e uma barra.
2. **Um próximo passo claro.** Ladder termina com resumo, cartão de sequência semanal e "continue" (item 24). Aqui: um botão "Ver próximo treino".
3. **Comemorar só o que é real.** A página do Fitbod diz que o confete é "genérico" e sugere ligá-lo a recordes (item 19). Aqui: marca discreta só quando houve progressão.
4. **Pergunta rápida em vez de texto.** Freeletics pergunta sobre a execução com opções (item 22); Ladder pergunta se está satisfeito (item 24). Aqui: "Como foi? Fácil, certo, pesado" com 3 botões, no lugar de um texto sobre esforço.
5. **Salvar como modelo é uma pergunta de duas opções.** Caliber usa modal "Salvar / Não salvar" (item 25). Aqui: confirmações curtas, sem texto.

## Privacidade em "Meus dados"

1. **Rótulo em tópicos antes do texto.** O rótulo da Apple lista categorias de dados e duas etiquetas (item 10). O Google Play mostra "o que coleta, o que compartilha, se criptografa, se dá para excluir" (item 11). Aqui: "Meus dados" abre com 4 linhas fixas: "Fica no aparelho / Fotos: apagadas após uso / Sem conta / Dá para apagar tudo", cada uma com ícone.
2. **Dizer "não coleta" explicitamente.** O Google Play mostra "não coleta nem compartilha dados" quando for o caso (item 11), e a Apple deixa de fora dado que só fica no aparelho (item 10). Aqui: a frase "Nenhum dado sai do seu aparelho, exceto a foto, que é apagada" vale mais que o parágrafo de 7 linhas.
3. **Camadas.** O ICO: resumo no alto, detalhe por link, painel de preferências (item 12). Aqui: resumo de 4 linhas, "Ler a política completa" abre uma tela à parte.
4. **Modo especial com explicação e limite.** Flo tem Modo Anônimo com tela de introdução e aviso das limitações, segundo ScreensDesign (item 36). Aqui: o aviso do navegador ("limpar dados apaga o treino") vira um aviso de uma linha ao lado do botão de apagar, com "exportar antes".
5. **Controle perto do dado.** Ladder tem "área perigosa" para excluir conta (item 24); Flo tem exclusão e exportação nas configurações (item 36). Aqui: botões "Exportar" e "Apagar tudo" no topo, texto embaixo.

## Termos de uso

1. **Reescrever em linguagem simples e dizer que reescreveu.** A Strava avisou por e-mail que "reescreveu e redesenhou" as políticas, com a parte de cobrança em linguagem simples (item 14). Ainda assim, a política oficial abre sem resumo em tópicos (item 13). Aqui: fazer o resumo que a Strava não fez.
2. **Resumo em tópicos, texto jurídico depois.** O ICO descreve a camada curta e a camada detalhada (item 12). Aqui: 5 tópicos ("Não é aconselhamento médico", "Você decide quando parar", "Seus dados ficam com você"...) e "Ler os termos completos".
3. **Aceite em um toque, sem rolar.** Freeletics usa um modal com três botões (aceitar tudo, só o necessário, personalizar) (item 22). Aqui: dois botões e um link, nada de rolagem obrigatória.
4. **Confirmar só o que é perigoso.** StrongLifts e Ladder só usam modal de confirmação para exclusões (itens 17, 24). O NN/G concorda (item 6). Aqui: termos não bloqueiam a tela com modal grande; um cartão com "Li e aceito" basta.
5. **Data e versão no topo.** A Strava mostra a data de vigência no topo (item 13). Aqui: "Versão de 13/11/2026" em uma linha.

## O que quase todos fazem

- Deixam o cadastro com pouco texto por tela (uma pergunta, opções curtas, um botão), mesmo quando o cadastro é longo (Flo, Duolingo, Boostcamp, Freeletics, Caliber; segundo ScreensDesign).
- Ensinam a usar o app na hora, não na abertura: dicas no primeiro treino (Fitbod, Hevy), cartões de ajuda nas telas de escolha (Ladder), painéis entre lições (Duolingo; segundo 925 Studios). O NN/G diz o mesmo desde 2014.
- Explicam uma permissão numa tela própria antes do pedido do sistema (StrongLifts, Freeletics, Ladder, JEFIT).
- Usam modal para o que apaga ou é irreversível (StrongLifts, Ladder, NN/G).
- Mostram o fim do treino em números e marcas (duração, volume, recorde, sequência), não em texto (StrongLifts, Freeletics, Boostcamp, Ladder).
- Mostram vídeo ou desenho junto do exercício, com a explicação escrita atrás de um toque (Freeletics, Ladder, Caliber, JEFIT).
- Põem o detalhe em outra camada (resumo e depois texto): ICO, rótulos da Apple e do Google Play, artigo da Oura com índice.

## O que só um ou dois fazem, mas vale olhar

- **Linha do tempo do teste grátis** (Headspace, Ladder): mostra datas em vez de texto. Aqui serviria para "como o programa progride" em 3 pontos.
- **Primeira frase do artigo já resume** (Oura): "A prontidão reflete o equilíbrio entre recuperação e atividade". Aqui: cada cartão abre com uma frase que se sustenta sozinha.
- **Faixas fixas com nome** (Oura: ótima, boa, razoável, requer atenção): o texto longo vira rótulo curto. Aqui: o nível de evidência já é isso (robusta, moderada, um estudo, consenso).
- **Modal "como calculamos"** (Boostcamp): o selo de evidência abre a regra. Combina com o compromisso do app.
- **Modo com explicação dos limites** (Flo, Modo Anônimo): diz o que o modo não faz. Aqui: "Meus dados" diz também o que a proteção não cobre.
- **Pergunta de execução após o treino** (Freeletics): coleta informação com 3 botões. Aqui: "alguma dor?" como pergunta de um toque, ligada ao aviso de segurança.
- **Aquecimento antes de cada permissão** (StrongLifts, JEFIT, Freeletics): reduz texto no aviso do sistema.
- **Mapa do corpo como "por quê"** (Fitbod, Boostcamp): troca frase por desenho.

## O que não deu para confirmar

- Quanto texto cada app mostra por tela. As galerias não medem; só descrevem.
- O texto real de avisos de segurança, de definições e de termos em Hevy, Fitbod, Strong, MacroFactor, Peloton, Centr, Nike Training Club, Strava e Noom. As páginas abertas não mostram.
- Se algum app de treino mostra "nível de evidência" ou fonte científica. Não achei. MacroFactor diz, segundo a galeria, mostrar passos "científicos" no cadastro, sem detalhe.
- Se algum app de treino resume os termos de uso em tópicos. Não achei exemplo aberto.
- Dados de pesquisa do Baymard (a página não abriu) sobre dica, ajuda em campo e acordeão.
- Os efeitos de "ler mais" que corta o texto: não achei pesquisa aberta nesta rodada. O que vale é o NN/G sobre acordeão e divulgação progressiva.
- Se os resumos de páginas do ScreensDesign (feitos por ferramenta ou autor) descrevem as telas com exatidão. Ver limitação 1.
- Whoop, Calm, Zero (além do blog), Apple Saúde (artigos e explicação de métrica), Future e Strong: sem fonte aberta útil nesta rodada.
- Zero: o que apareceu foi só o blog. O app e o seu cadastro não foram vistos.

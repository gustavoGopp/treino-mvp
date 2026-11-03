# Reformulação visual (design v2, 03/11/2026)

> Pedido do Gustavo, depois da 1ª revisão de design (`design.md`): revisar de novo tudo o que eu fiz, pesquisar a fundo (exercício, design de interface, cor, tipografia, apresentação) e propor uma **reformulação visual completa**, desapegada da estética atual. **Só a animação do Boneco fica como está.** Os pontos de atenção: um **cadastro** que pareça rápido e leve, e uma **tela de treino** muito fácil, só com o necessário.
>
> **Nada mudou no app.** A proposta é um protótipo navegável no canvas "treino-mvp · reformulação visual" (https://claude.ai/artifact/BKbDRaxPwJwsLYsWuAAVNd), com 7 telas no tema claro, as mesmas no escuro, o "antes" (o app de hoje) e o sistema visual. A fonte das telas está em `revisoes/design/canvas/`. O Boneco do protótipo sai do motor do app, sem mudança (`scripts/design/prototipo/gerar.mjs` e `rasterizar.mjs`).
>
> Selos como em `docs/pesquisa/00-metodo.md`. Norma técnica (WCAG, guias de plataforma) entra como **consenso**. Todos os estudos abaixo tiveram **só o resumo ou o registro conferido por busca** nesta sessão; nenhum texto completo foi lido. O que é opinião minha está marcado **[opinião]**.

## Em uma frase
O app de hoje acerta no conteúdo e nas regras, mas mostra tudo ao mesmo tempo: caixas, selos, avisos e controles com o mesmo peso. A proposta faz o contrário: **uma coisa por tela no cadastro, uma série por vez no treino, o botão principal sempre embaixo do polegar**, letras grandes e uma cor só para ação. O Boneco fica igual, e o resto fica em volta dele.

## 1. Revisão crítica do que eu fiz na 1ª rodada

O que estava **fraco ou errado** na revisão anterior (`design.md`), e o que fiz com isso:

| # | Problema | Correção |
|---:|---|---|
| 1 | **Medi uma persona só** (a Ana: iniciante, halteres). Bruno, Carla e Diego (máquinas, 2 locais, dor) não passaram pelas telas: telas como "trocar exercício", máquina de placas, drop set e o fluxo de dor ficaram sem medida. | Fica registrado como limite. A proposta v2 cobre os componentes dessas telas (stepper, seletor, alerta), mas medir as 4 personas é tarefa da implementação. |
| 2 | **"Série feita" medido só na 1ª série.** Nas séries seguintes as caixas somem e o botão sobe; eu disse isso, mas o número que pus em destaque (98%) é o pior caso. | Na v2 o botão fica **fixo embaixo** em qualquer série: o problema deixa de depender da série. |
| 3 | **Selo do Birch 2012 como "robusta".** É uma revisão de levantamentos populacionais de prevalência, não de ensaios; pelo método do projeto, o mais honesto é **moderada**. | Corrigido aqui; `design.md` fica com a nota. |
| 4 | **Hoober 2013 (49% com uma mão)** veio de fonte secundária; o 49% bate com os outros números (36% e 15%), mas não li o original. | Mantido como **um estudo** observacional, sem revisão por pares, com a ressalva. |
| 5 | **A conta "9,2 mm ≈ 57 px"** supôs a densidade de um Pixel 7. Em outro celular muda. | Na v2 o piso é **48 px** (Material) e os toques mais usados têm **56 a 64 px**, o que cobre a folga sem depender do aparelho. |
| 6 | **Os esboços tiraram coisas que não podiam sair:** o do treino apagou os selos de evidência; o do cartão de texto recolheu a "montagem segura". As duas coisas são princípios do `CLAUDE.md`. | Na v2 o selo continua visível em toda regra mostrada (discreto, numa pílula cinza), e a segurança nunca fica recolhida. |
| 7 | **O contraste foi medido por script só no texto com nó próprio**; não pegou texto sobre imagem nem estados de foco. | Na v2 a paleta foi escolhida já com folga (texto a 5,5:1 ou mais nos dois temas; bordas de controle a 3:1 ou mais). |
| 8 | **Não houve teste com gente.** Tudo foi medida automática e opinião. | Vale também para a v2: o protótipo serve para o Gustavo testar com uma mão, de verdade, antes de qualquer código. |
| 9 | **Eu propus remendos** (botão maior aqui, linha a menos ali) sobre uma base que já empilha caixas. | É exatamente o que a v2 refaz. |

O que **continua valendo** da 1ª rodada (números medidos): o guia com 24 a 31 controles pequenos; o vermelho × laranja só pela cor (2,1:1 e 1,7:1); o laranja que só ajuda em 15 das 31 animações; os 21 itens de equipamento sem desenho; a vista de frente do afundo e do búlgaro; o corpo pequeno nos exercícios de polia. A v2 resolve os de tela; os do desenho do Boneco continuam como decisões separadas (itens 3, 5 e 6 de `design.md`), porque o Boneco não muda sem a sua aprovação, folha a folha.

## 2. O que a pesquisa diz

### Cadastro: parecer rápido e ser leve
| O que | Selo | Fonte |
|---|---|---|
| **Uma pergunta por tela** ajuda a pessoa a focar e entender o que se pede; o governo britânico testou o padrão em vários serviços e o adotou como ponto de partida. | consenso (pesquisa de serviço, não ensaio publicado) | GOV.UK Design System, "Question pages"; GDS, "One thing per page" (2015) |
| **Menos campos importa mais que menos passos**: num estudo de checkout, a maioria dos sites precisava de 8 campos e usava 11,3. | consenso (pesquisa de usabilidade de mercado) | Baymard Institute, 2024 |
| **Mostrar o progresso só ajuda se ele parece andar rápido**; quando parece atrasado, piora a experiência e a taxa de conclusão. | um estudo (2 experimentos) | Conrad, Couper, Tourangeau e Peytchev 2010, *Interacting with Computers* |
| **Perto do fim, a pessoa acelera** (efeito do gradiente de meta); começar com algum progresso já marcado aumenta a conclusão. | um estudo cada (experimentos de campo) | Kivetz, Urminsky e Zheng 2006; Nunes e Drèze 2006 |
| **O que vem pronto tende a ficar** (efeito do padrão), porque mudar custa esforço; por isso, um padrão precisa ser seguro e fácil de trocar. | moderada (estudo de dados populacionais) | Johnson e Goldstein 2003, *Science* |
| **Mostrar primeiro o essencial** e deixar o resto num 2º nível deixa a interface mais fácil de aprender. | consenso | Nielsen Norman Group, "Progressive disclosure" |
| **Mais opções na tela, mais tempo para decidir** (lei de Hick-Hyman). | robusta (lei clássica, muito replicada) | Hick 1952; Hyman 1953 |
| **Triagem PAR-Q+:** 7 perguntas gerais; "não" em todas libera; qualquer "sim" leva a perguntas de acompanhamento. | consenso (painel de especialistas) | Warburton, Jamnik, Bredin e Gledhill, PAR-Q+ 2023 |

### Treino: uma mão, um relance
| O que | Selo | Fonte |
|---|---|---|
| **O polegar alcança uma área limitada**, que depende do tamanho do celular e da mão; o resto pede a outra mão ou mudar a pegada. | um estudo (modelo validado com 20 pessoas) | Bergstrom-Lehtovirta e Oulasvirta 2014, CHI |
| **Alvo de 9,2 mm** não piorou desempenho nem preferência com o polegar. | um estudo | Parhi, Karlson e Bederson 2006, MobileHCI |
| **Tamanho de toque:** 44 pt (Apple), 48 dp (Google), 24 px mínimo e 44 px recomendado (WCAG 2.2). | consenso | Apple HIG; Material Design; WCAG 2.2, critérios 2.5.8 e 2.5.5 |
| **O tempo para tocar cresce com a distância e cai com o tamanho do alvo** (lei de Fitts). | robusta | MacKenzie 1992; Soukoreff e MacKenzie 2004 |
| **Uso em relance domina** os apps de atividade: abrir, olhar, fechar. | um estudo (256 pessoas, 10 meses) | Gouveia, Karapanos e Hassenzahl 2015, UbiComp |
| **RIR** (repetições de reserva) é uma escala prática para a carga do dia; a estimativa erra mais longe da falha e em séries longas. | moderada | Zourdos et al. 2016; Helms et al. 2016; Zourdos et al. 2021 |
| **Descanso:** para quem é iniciante, curto e longo funcionam; descansos mais longos podem ajudar quem já treina. | moderada | Grgic et al. 2017 (revisão); Singer et al. 2024 (meta-análise) |

### Visual: cor, letra, apresentação
| O que | Selo | Fonte |
|---|---|---|
| **Texto escuro em fundo claro se lê melhor** (acuidade e revisão de texto), em qualquer idade. Por isso o tema claro é o padrão quando o celular não pede o escuro. | um estudo (do mesmo grupo, com réplicas) | Piepenbrock, Mayr e Buchner 2013, *Ergonomics* |
| **Tema escuro:** cinza bem escuro em vez de preto puro, e cores dessaturadas para manter o contraste. | consenso | Material Design, "Dark theme" |
| **Contraste:** 4,5:1 para texto, 3:1 para borda de controle e gráfico (WCAG 2.2, 1.4.3 e 1.4.11). O sucessor em teste (APCA) ainda é rascunho. | consenso | WCAG 2.2; APCA (rascunho do WCAG 3) |
| **Cores que não dependem do daltonismo:** azul × laranja se distinguem; vermelho × verde não. | consenso | Okabe e Ito (Color Universal Design); Birch 2012 (8% dos homens de origem europeia, **moderada**) |
| **Letra feita para não confundir caracteres** (I/l/1, O/0, B/8), gratuita, criada para pessoas com baixa visão. Não achei estudo publicado com tamanho de efeito. | consenso (desenho guiado por pesquisa; avaliação publicada pendente) | Braille Institute, Atkinson Hyperlegible (2019; versão Next de 2025) |
| **Corpo de texto a 16 px ou mais** no celular; abaixo disso a pessoa amplia, e no iPhone um campo abaixo de 16 px dá zoom ao tocar. | consenso | guias de plataforma e de acessibilidade (não é número da WCAG) |
| **A primeira impressão visual se forma em ~50 ms** e influencia o resto; **complexidade visual** pesa mais que a quantidade de cor. | um estudo cada | Lindgaard et al. 2006; Reinecke et al. 2013, CHI |
| **O que é bonito parece mais fácil de usar**, antes e depois do uso. | um estudo cada (com réplica) | Kurosu e Kashimura 1995; Tractinsky, Katz e Ikar 2000 |
| **Material didático:** tirar o supérfluo (coerência), realçar o essencial (sinalização) e dividir em partes (segmentação) ajudam a aprender. | moderada (meta-análises reunidas numa revisão) | Mayer 2017, *J Comput Assist Learn*; `richter2016` |

### Exercício e motivação
| O que | Selo | Fonte |
|---|---|---|
| **Motivação autônoma** (a pessoa sente que escolheu e que é capaz) se associa a fazer exercício, e a intrínseca a manter no longo prazo. Na tela: escolhas claras, sem culpa, e progresso visível. | moderada (revisão sistemática, 66 estudos) | Teixeira et al. 2012, *IJBNPA* |
| **Gamificação** aumenta a atividade física pouco a moderadamente, e o efeito cai depois do fim (g = 0,15 no seguimento). | moderada (meta-análise de ECRs) | Mazeas et al. 2022, *JMIR* |
| **Apps de atividade usam poucas técnicas de mudança de comportamento**; as mais comuns são instrução e demonstração, retorno sobre o desempenho e metas. | um estudo cada | Conroy, Yang e Maher 2014 e 2015, *Am J Prev Med* |
| **Hábito leva semanas a meses** (mediana ~66 dias, com muita variação); faltar um dia não atrapalha. | um estudo (39 pessoas com bom ajuste) | Lally et al. 2010, *Eur J Soc Psychol* |

**O que tiro disso para o app [opinião]:** sem medalhas, sequências que "quebram" ou confete. O app mostra o que já mostra bem (o retorno de cada série, a sugestão para a próxima vez, a semana), com menos ruído e sem culpa. Gamificação tem efeito pequeno e que cai, e cobrança por sequência vai contra a motivação autônoma e contra o "semana com menos treino é dado, não falha" do próprio projeto.

## 3. A proposta

### Seis princípios
1. **Uma coisa por vez.** No cadastro, uma pergunta por tela, e o toque responde e segue. No treino, uma série por vez. *(GOV.UK; Hick-Hyman; Mayer)*
2. **A ação principal embaixo, sempre.** "Começar", "Série feita", "Continuar": fixos na parte de baixo, onde o polegar alcança, com 56 a 64 px de altura. *(Bergstrom-Lehtovirta 2014; Fitts; Parhi 2006)*
3. **Os números são a tela.** Carga, repetições e descanso em 40 a 96 px, com algarismos de largura igual. *(Gouveia 2015, uso em relance)*
4. **Uma cor só para ação.** Azul para tocar; verde para "feito"; vermelho só para alerta de saúde. O vermelho e o laranja dos músculos ficam só no Boneco, sem disputa. *(Okabe e Ito; WCAG 1.4.1)*
5. **A evidência fica, discreta.** O selo continua em toda regra mostrada, numa pílula cinza de uma palavra ("consenso", "moderada"); a fonte fica um toque adiante. *(princípio de evidência do `CLAUDE.md`)*
6. **Menos caixas.** Fundo quente e claro, superfícies brancas sem borda, espaço em vez de linha. *(Reinecke 2013; Lindgaard 2006)*

### O sistema visual (quadro "Sistema visual" no canvas)
- **Letra:** Atkinson Hyperlegible Next, uma família só (no lugar de Barlow Condensed + IBM Plex). Corpo 17 px; nunca abaixo de 16 no corpo; 14 só em rótulos curtos.
- **Cores, tema claro:** fundo `#F5F4F0`, superfície `#FFFFFF`, texto `#15171C` (16,3:1), texto 2 `#4B505B` (7,4:1), borda de controle `#868B95` (3,1:1), ação `#2443CF` (6,9:1), feito `#0E7350` (5,9:1), alerta `#B3261E` (6,5:1).
- **Cores, tema escuro:** fundo `#111316` (não preto puro), superfície `#1A1D22`, texto `#F3F2EE` (16,6:1), texto 2 `#AEB3BD` (8,9:1), borda `#6E737D` (3,9:1), ação `#9CB1FF` (9,0:1), feito `#62D2A2`, alerta `#FF8F85`.
- **Toques:** 48 px no mínimo; 56 nos botões e seletores; 64 no "Série feita".
- **Espaço** em passos de 4 (4, 8, 12, 16, 20, 24, 32); cantos de 12, 16 e 20.
- **O palco do Boneco** mantém as cores de hoje (`--stage` e as do estilo A): ele não muda.

Todas as razões de contraste acima foram calculadas pela fórmula da WCAG sobre o fundo de cada tema.

### Tela a tela (no canvas, as fileiras "Depois")
**1. Cadastro (navegável).** Cinco etapas com barra de progresso: saúde, experiência, rotina, equipamento e confirmar.
- **Saúde:** as 9 condições numa lista curta, numa tela só, com "Nenhuma vale para mim" (principal) e "Sim, alguma vale". Quem marca alguma escolhe quais e segue para o acompanhamento de hoje. *Muda a regra `seguranca.triagem.nenhuma`, que hoje pede as 9 perguntas com Sim/Não: precisa da sua decisão.*
- **Experiência:** as 3 perguntas viram 3 telas de um toque cada, que avançam sozinhas. O nível aparece no resumo, não numa caixa no meio.
- **Rotina:** dias (2 a 6) e minutos (30 a 90) em números grandes, um toque cada; a prioridade é opcional, com "Pular". A divisão do treino sai do cadastro (o app já recomenda uma) e fica em "Meus dados".
- **Equipamento:** quatro cartões grandes (academia completa, condomínio, casa, monto a lista) e a foto. "Casa" pergunta só os halteres. *"Academia completa" sem perguntar os pesos supõe uma faixa padrão de halteres, que a calibração da 1ª série já corrige: precisa da sua decisão.*
- **Confirmar:** um resumo em linhas tocáveis, e "Algo a evitar?" opcional no fim, sem tela própria.
- **Conta [opinião, contada no protótipo]:** 10 toques até o programa com "academia completa", 13 com "casa", 0 caractere digitado. Hoje: 13 toques **sem contar** a tela de equipamento (medido no R1), que sozinha pede mais uns 5 a 8 toques e 4 alturas de rolagem.

**2. Início.** Semana em 7 bolinhas; abas A/B/C; o treino do dia num cartão, com a miniatura do Boneco e "guia em texto" quando não há animação; um aviso recolhido numa linha ("2 músculos abaixo da meta"). "Começar" fixo embaixo, e uma barra de navegação com Treino, Semana e Meus dados (hoje o app não tem navegação fixa).

**3. Treino (navegável).**
- Topo: sair, progresso do treino e "Senti algo" sempre visível, em contorno vermelho.
- O exercício com a miniatura (toque abre o guia).
- O cartão da série, nesta ordem: a dica da série numa linha (com o selo), carga e repetições com − e + de 56 px e o número em 40 px, e a reserva (RIR) em 5 botões de 56 px.
- "Série feita" de 64 px fixo embaixo, que pede a reserva antes de salvar.
- No descanso, o cartão vira um relógio de 96 px, com a próxima série e "−15 s / Pular / +15 s" embaixo.
- "Trocar só neste treino" fica como link.

**4. Guia.** O Boneco igual, em largura total. Controles de 48 px ("Lento", "De lado / De frente"); os 4 modos em abas de 48 px; as **3 dicas em letra grande** logo abaixo; segurança, passo a passo e "de onde vem" em linhas de 56 px. "Voltar ao treino" na cor do app.

**5. Fim do treino.** Três números (séries, exercícios, minutos), "Como foi hoje?" em 3 botões grandes, "Na próxima vez" com as sugestões e "Ver a sua semana".

**6. A sua semana.** "2 de 3 treinos" em destaque, sem culpa ("Qualquer dia serve"). Séries por músculo em barras: o cheio é o que foi feito e o tracejado é a faixa da meta, e o número fica escrito ao lado (não depende da cor).

**7. Meus dados.** Grupos (programa, cópia de segurança, saúde), linhas de 60 px, "Apagar todos os dados" em vermelho e por último.

## 4. Para decidir (item a item, nada marcado)
Para cada item: entra, não entra, ou entra de outro jeito.

| # | Item | Muda regra ou desenho? |
|---:|---|---|
| A | O sistema visual: letra Atkinson Hyperlegible Next, a paleta clara e escura, toques de 48 a 64 px | só tela |
| B | Cadastro em uma pergunta por tela, com avanço automático no toque | só tela |
| C | Triagem em lista única, com "Nenhuma vale para mim" e "Sim, alguma vale" | **regra** (`seguranca.triagem.nenhuma`) |
| D | "Academia completa" sem perguntar os pesos (faixa padrão, corrigida pela calibração) | **regra** (padrão de inventário) |
| E | Divisão do treino fora do cadastro (fica em "Meus dados") | só tela |
| F | "Algo a evitar?" como linha opcional no resumo, sem tela própria | só tela |
| G | Início com o treino do dia em cartão e "Começar" fixo | só tela |
| H | Barra de navegação fixa: Treino, Semana, Meus dados | só tela |
| I | Treino: uma série por vez, "Série feita" fixo de 64 px, descanso em tela cheia | só tela |
| J | Guia: controles de 48 px, dicas em letra grande, resto recolhido (segurança sempre à mão) | só tela |
| K | Fim do treino e semana como no protótipo | só tela |
| L | Meus dados em grupos | só tela |
| M | Tema: segue o celular; o claro é o padrão | só tela |

Os itens de desenho do Boneco da 1ª rodada (legenda do laranja, adutores e vista de frente, enquadramento da polia, estilo clássico) continuam em aberto em `design.md`: eles não dependem da reformulação.

## 5. Riscos e o que eu não sei
- **Sem teste com gente.** O próximo passo honesto é você usar o protótipo com uma mão, na academia, e anotar no Diário do R3 o que atrapalhar.
- **Algarismos da Atkinson Hyperlegible Next:** não confirmei se a fonte traz algarismos de largura igual (`tnum`). Se não trouxer, o relógio "pula" ao contar; a saída é uma fonte só para números (a Atkinson Hyperlegible Mono, da mesma família).
- **Avanço automático no toque:** o protótipo espera 0,16 s antes de seguir, para a pessoa ver o que marcou. Toque errado se desfaz com "Voltar". Na implementação, convém medir quantas pessoas voltam.
- **Tamanho do trabalho [opinião]:** é uma reescrita das telas (`src/features/`, `src/styles.css`), não um ajuste. Proponho fazer em 3 etapas, cada uma com teste e com a sua aprovação: (1) o sistema visual e os componentes; (2) treino e guia, as telas mais usadas; (3) cadastro, início, semana e meus dados. Os testes de toque (44 px) e de contraste passam a valer para todas as telas.
- **O motor e o Boneco não mudam:** as linhas de base (`estilo-a.json`, equivalência do clássico) continuam valendo.

## Fontes desta rodada
GOV.UK Design System, *Question pages*; GDS (2015), *One thing per page* · Baymard Institute (2024), *Checkout flow: average form fields* · Conrad FG, Couper MP, Tourangeau R, Peytchev A (2010). *Interacting with Computers* 22(5):417-427 · Kivetz R, Urminsky O, Zheng Y (2006). *J Marketing Research* 43:39-58 · Nunes JC, Drèze X (2006). *J Consumer Research* 32(4):504-512 · Johnson EJ, Goldstein D (2003). *Science* 302:1338-1339 · Nielsen Norman Group, *Progressive disclosure* · Hick WE (1952); Hyman R (1953) · Warburton DER, Jamnik VK, Bredin SSD, Gledhill N (2023), PAR-Q+ · Bergstrom-Lehtovirta J, Oulasvirta A (2014). CHI:1991-2000 · Parhi P, Karlson AK, Bederson BB (2006). MobileHCI:203-210 · Apple Human Interface Guidelines; Material Design (acessibilidade e *Dark theme*); W3C WCAG 2.2 (2023) · MacKenzie IS (1992). *Human-Computer Interaction* 7:91-139; Soukoreff RW, MacKenzie IS (2004) · Gouveia R, Karapanos E, Hassenzahl M (2015). UbiComp · Zourdos MC et al. (2016). *J Strength Cond Res* 30(1):267-275; Helms ER et al. (2016). *Strength Cond J* 38(4):42-49 · Grgic J et al. (2017). *Eur J Sport Sci* 17(8):983-993; Singer A et al. (2024). *Front Sports Act Living* · Piepenbrock C, Mayr S, Buchner A (2013). *Ergonomics* · Okabe M, Ito K, *Color Universal Design* · Birch J (2012). *J Opt Soc Am A* 29(3):313-320 · Braille Institute, *Atkinson Hyperlegible* (2019, 2025) · Lindgaard G et al. (2006). *Behaviour & Information Technology* 25(2):115-126 · Reinecke K et al. (2013). CHI:2049-2058 · Kurosu M, Kashimura K (1995). CHI · Tractinsky N, Katz AS, Ikar D (2000). *Interacting with Computers* 13(2):127-145 · Mayer RE (2017). *J Comput Assist Learn* · Teixeira PJ et al. (2012). *IJBNPA* 9:78 · Mazeas A et al. (2022). *JMIR* 24(1):e26779 · Conroy DE, Yang CH, Maher JP (2014). *Am J Prev Med* 46(6):649-652 · Lally P et al. (2010). *Eur J Soc Psychol* 40(6):998-1009.

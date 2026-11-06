# Redesign, agente 4: organização visual e hierarquia (06/11/2026)

Esboços: [`img/agente-4-esbocos.html`](img/agente-4-esbocos.html) (abra no navegador; cada quadro é um celular de 360 × 740 que rola por dentro) e as 8 folhas em PNG: [sistema](img/agente-4-sistema.png), [cadastro 1](img/agente-4-cadastro-1.png), [cadastro 2](img/agente-4-cadastro-2.png), [equipamento](img/agente-4-equipamento.png), [programa](img/agente-4-programa.png), [treino](img/agente-4-treino.png), [guia e fim](img/agente-4-guia-fim.png), [semana e dados](img/agente-4-semana-dados.png). Tudo em cinzas: a cor é do agente 5.

## 1. Em uma frase

O app de hoje não tem nenhuma falha medida de toque ou contraste, mas cada tela foi desenhada por conta própria (19 tamanhos de letra, 19 tipos de caixa, 19 de botão, 8 jeitos de recolher), e por isso eu proponho um sistema pequeno (7 degraus de letra, 6 de espaço e uns 16 componentes com os seus estados), a ação principal sempre fixa embaixo, a mesma barra inferior em todas as telas de "casa" e o selo de evidência tocável, que leva de fato até a fonte (hoje ele não leva a lugar nenhum no celular).

## 2. O que medi

**Método.** Quatro scripts em `scripts/design/redesign/agente-4/`, todos com a persona fictícia Ana (`tests/e2e/jornada.ts`):
- `inventario.mjs`: lê `src/styles.css` e os 24 arquivos de `src/features/**/*.tsx` e conta classes, tamanhos de letra, pesos, espaços, raios, bordas e as variantes de cada família de componente. Saída em `reports/design/redesign/agente-4/inventario.json`.
- `medidas.spec.ts`: percorre 22 estados do app no Pixel 7 (412 × 915) e no celular pequeno (360 × 740) e mede, em cada um, quantos tamanhos e pesos de letra aparecem de fato, quantas caixas, alvos de toque e selos há na 1ª tela e na página inteira, quantas alturas de tela a página tem e onde fica o botão principal. Saída em `medidas-pixel7.json` e `medidas-pequeno.json`, com as capturas em `antes/`.
- `icones-frequencia.mjs`: cruza `icones.tsx` com `equipamentos.ts` e ordena os itens sem desenho pelo uso nos 149.760 programas do teste de estresse (`docs/revisoes/auditoria/inventario.md`).
- `esbocos.spec.ts` (fotografa as folhas dos esboços e mede quantos caracteres cabem numa linha de corpo) e `reduzir-png.py` (deixa cada PNG abaixo de 300 kB).

**O que está bom [medido].** 0 toque abaixo de 44 px e 0 contraste baixo nos 22 estados, nas duas larguras. 0 linha de texto acima de 75 caracteres. Nenhuma tela rola de lado. A página mais longa da semana (`/semana`) já é a mais clara do app: 6 alvos, 2 caixas, 1,9 alturas de tela.

**O sistema de hoje, em números [medido, `inventario.mjs`].**

| O que | Hoje | Proposta |
|---|---:|---:|
| Tamanhos de letra distintos no CSS das telas | 19 (de 12 a 72 px, inclusive 15,3 e 38,25 px vindos de `rem`) | 7 |
| Tamanhos de letra numa só tela | de 5 (confirmar, evolução) a 12 (treino no descanso) | até 5 |
| Pesos de letra | 5 (400, 500, 600, 700, 800) | 3 (400, 700, 800) |
| Alturas de linha | 9 | 3 |
| Valores de espaço (padding, gap, margem) | 17 (1 a 40 px; 2, 3, 6, 9, 10, 14, 18, 22, 34 fora de qualquer escala) | 6 (4 · 8 · 12 · 16 · 24 · 32) |
| Raios de canto | 16 valores (3 variáveis `--r1/2/3` e 13 números soltos) | 3 (8 · 16 · pílula) |
| Espessuras de borda | 5 (1; 1,5; 2; 3 px; tracejada) | 2 (1 divisor · 2 contorno) |
| Alturas mínimas de toque | 7 (44, 48, 52, 56, 60, 64, 108) | 3 (48 · 56 · 64) |
| Sombras | 5 | 1 (só na folha inferior) |
| Classes declaradas e nunca usadas | 26 | 0 |
| Classes usadas sem CSS próprio | 13 | 0 |

**As famílias de componente: inventário de hoje × conjunto mínimo [medido para "hoje"; a coluna da direita é a proposta].**

| Família | Variantes hoje (nomes de classe) | Conjunto mínimo proposto |
|---|---:|---|
| Botão | 19: `btn`, `sec`, `pequeno`, `perigo`, `alerta`, `salvar`, `cta`, `link-sec`, `link-guia`, `voltar`, `alerta-topo`, `iconbtn`, `ctl`, `reset`, `prefiro`, `tctl`, `sim-nao`, `opcao-ajuste`, `day` | **1 botão**, 4 variantes (primário, secundário, terciário, perigo) × 3 alturas (48, 56, 64) + botão só de ícone |
| Cartão, caixa | 19: `box`, `warnbox`, `caixa-erro`, `resultado`, `sugestao`, `fase`, `faixa`, `faixa-semana`, `registro`, `foto-eq`, `detalhes-eq`, `card`, `cartao-texto`, `cartao-ex`, `volta`, `troca-local`, `reservado`, `descanso`, `resumo-ex` | **1 superfície**, 4 tons (neutra, informação, aviso, erro) |
| Lista | 18: `lista`, `lista-triagem`, `cartoes-ex`, `opcoes-ajuste`, `resumo-cadastro`, `pontos-evolucao`, `lista-evolucao`, `lista-locais`, `musculos`, `sugestoes-foto`, `fichas`, `series-feitas`, `cues`, `check`, `steps`, `porques`, `trocas-local`, `vol` | **1 lista de linhas**, 4 formas (simples, tocável com ›, com miniatura, numerada) |
| Chip, pílula, etiqueta | 12: `chip`, `chip-valor`, `chips-valor`, `errchip`, `fichas`, `series-feitas`, `selo`, `etiqueta`, `marca`, `day`, `breath`, `phase` | **chip** (é um controle, 48 px) e **pílula** (é um rótulo, não se toca; exceto o selo) |
| Seletor | 10: `opcao`, `opcoes`, `cartao-eq`, `chip-valor`, `estilo-boneco`, `seg`, `modes`, `abas`, `sim-nao`, `divisao` | **opção em linha** (56), **chip** (48), **segmentado** (48), **cartão de equipamento** |
| Campo | 3: `numero`, `campo-texto`, `arquivo-campo` | **campo** (texto e número, 17 px, nunca abaixo de 16) |
| Stepper, contador | 3: `stepper`, `contador`, `tctl` | **stepper** (56; compacto 48) |
| Barra de progresso | 8: `progresso`, `barra`, `tbar`, `barra-volta`, `m-barra`, `timeline`, `pontos`, `semanas` | **progresso**, 4 formas (barra, pontos, segmentos, barra com meta) |
| Recolher (`details`) | 8: `mais`, `dobra`, `evitar`, `passo-a-passo`, `ver-mais`, `sobre`, `cartao-texto`, `details.box` | **recolher**, 2 formas (em superfície, plano) |
| Título de seção | 4: `secao`, `titulo`, `info-dia`, `numero-grande` | 2 degraus: **pergunta/seção** (20) e **número** (40) |
| Texto de apoio | 9: `ajuda`, `lede`, `note`, `muted`, `meta`, `sub-rx`, `erro`, `status`, `status-ok` | 3: **corpo**, **apoio**, **mensagem de erro** |
| Folha inferior, diálogo | 0 (tudo aparece no meio da página) | **folha inferior** (padrão e modal) e **diálogo** (só para apagar) |

Onde o mesmo conceito tem dois nomes ou dois estilos [medido]: "perigo" e "alerta" (botão); `box`, `card` e `cartao-texto` (superfície); `warnbox` e `caixa-erro` (aviso × erro, com bordas diferentes); `chip`, `chip-valor` e `fichas` (pílula × controle); `seg`, `modes` e `abas` (o mesmo segmentado em três telas); 8 recolheres com 4 alturas (44, 48, 56 e a da caixa); `lede`, `ajuda`, `note` e `muted` (texto de apoio em 15, 16 e 17 px).

**As telas, em números [medido, `medidas.spec.ts`; Pixel 7 / celular pequeno].**

| Tela (estado) | Alturas de tela | Botão principal começa a (% da altura) | Alvos na 1ª tela / total | Selos na página | Tamanhos de letra |
|---|---:|---:|---:|---:|---:|
| Boas-vindas | 1,5 / 1,8 | 127% / 154% (fora) | 2 / 4 | 1 | 8 |
| Triagem, lista | 1,5 / 1,8 | 122% / 147% (fora, por regra) | 1 / 4 | 2 | 7 |
| Triagem, uma a uma | 2,0 / 2,4 | 183% / 223% (fora) | 9 / 21 | 1 | 6 |
| Experiência, respondida | 1,8 / 2,1 | 158% / 182% (fora) | 8 / 13 | 1 | 7 |
| Rotina, respondida | 1,9 / 2,3 | 172% / 206% (fora) | 16 / 25 | 3 | 6 |
| Equipamento, lugar | 4,4 / 5,0 | 92% / 91% (fixo) | 6 / 55 | 1 | 7 |
| Equipamento, com halteres marcados | 5,1 / 5,9 | 123% / 288% | 5 / 76 | 1 | 8 |
| Confirmar | 1,0 / 1,1 | 73% / 83% | 13 / 46 | 0 | 5 |
| Programa (Ana, semana 1) | 2,2 / 2,6 | 84% / **196% (fora)** | 17 / 44 | **61** | 9 |
| Guia (afundo) | 3,4 / 3,9 | sem botão principal | 19 / 36 | 0 | 10 |
| Treino, série | 1,4 / 1,8 | 91% / 88% (fixo) | 15 / 18 | 3 | 11 |
| Treino, descanso | 1,3 / 1,7 | — | 15 / 22 | 2 | **12** |
| Fim do treino | 1,0 / 1,1 | 75% / 88% | 7 / 7 | 2 | 8 |
| Semana | 1,9 / 2,2 | — | 4 / 6 | 2 | 10 |
| Meus dados | 2,5 / 3,1 | — | 6 / 12 | 0 | 8 |
| Locais, novo local | 4,6 / 5,3 | 92% / 91% (fixo) | 12 / 61 | 1 | 8 |

Outras medidas:
- **Linha de corpo (17 px):** cabem 40 caracteres a 360 px, 47 a 412 px e no máximo 60 (coluna de 560 px) [medido, `esbocos.spec.ts`].
- **Título de tela (30 px):** "Seu treino, com o equipamento que você tem" ocupa 3 linhas e 104 px a 360 px [medido].
- **A barra inferior** aparece em Programa, Semana e Meus dados, mas não em Evolução nem em Locais, que são telas filhas dessas [medido].
- **Enquanto carrega:** o estado vem do aparelho e, até chegar, a tela fica em branco (`estado.tsx`, linha 72). Não medi quanto tempo isso leva.
- **O selo de hoje** é uma pílula de texto com a regra num `title`, que só aparece ao passar o mouse. No celular, tocar no selo não faz nada: o caminho até a fonte não existe no aparelho [medido: `src/features/app/ui.tsx`, `Selo`]. As fontes estão em `regras.json` só como chaves (`nunes2021`), sem o texto da referência.
- **Ícones de equipamento:** 49 itens na taxonomia, 25 com desenho, **24 sem** (não 21: os 21 do R0c e mais caneleiras, mini-band e roda abdominal) [medido, `icones-frequencia.mjs`].

**Um cuidado com a contagem de caixas.** O script conta como caixa uma superfície de 120 px de largura ou mais. A 360 px, os cartões de equipamento em 3 colunas têm 104 px e saem da conta (por isso o equipamento tem 50 caixas no Pixel 7 e 2 no pequeno). Use o número do Pixel 7 para comparar.

## 3. O que a pesquisa diz

| Afirmação | Selo | Fonte |
|---|---|---|
| Linha de texto confortável: 45 a 75 caracteres, ~66 o ideal (para livro, letra serifada) | consenso | Bringhurst, *The Elements of Typographic Style*, p. 26: **conferido só em citações de terceiros**, não no livro |
| Linha de texto: média de 45 a 90 caracteres, contando espaços | consenso | Butterick, *Practical Typography*, "Line length" (página lida) |
| No iPhone, o corpo padrão é 17 pt e o mínimo é 11 pt; a escala tem 11 estilos (34, 28, 22, 20, 17, 17, 16, 15, 13, 12, 11); evitar pesos leves; usar poucas famílias de letra | consenso | Apple HIG, "Typography" (lida pela versão em JSON da página) |
| A escala do Material 3 tem 15 estilos (57 a 11 sp); corpo grande de 16 sp; título de 22 e 24 | consenso | Material Components, `docs/theming/Typography.md` (GitHub; a página m3.material.io não abriu) |
| Campo de texto abaixo de 16 px faz o Safari do iPhone dar zoom ao tocar; travar o zoom da página não é a solução | consenso | documentação de terceiros (squirrelscan, West Wind, Website Spec); **não achei página da Apple** |
| Espaço em passos de 8, com 4 para ajustes finos | consenso | material.io (antigo), "Spacing methods": **visto só no resumo da busca**, a página não abriu |
| Mais opções na tela, mais tempo para decidir (lei de Hick-Hyman) | robusta | Hick 1952; Hyman 1953 (já em `design-v2.md`) |
| Tirar o supérfluo, sinalizar o essencial e dividir em partes ajuda a aprender | moderada | Mayer 2017 (já em `design-v2.md`) |
| A complexidade visual pesa na primeira impressão | um estudo | Reinecke et al. 2013, CHI (já em `design-v2.md`) |
| Barra de navegação: de 3 a 5 destinos, cada um com ícone e rótulo | consenso | Material Components, `docs/components/BottomNavigation.md` (GitHub) |
| A barra de abas é para navegar, não para ações; deve ficar visível ao trocar de seção ("se você a esconde, a pessoa esquece onde está"); a exceção é uma tela modal, que é temporária; rótulo de uma palavra | consenso | Apple HIG, "Tab bars" (lida pela versão em JSON) |
| Barra de abas serve para poucas opções (até ~5); menu escondido (hambúrguer) é a navegação menos descoberta | consenso | Budiu 2015, NN/g, "Basic Patterns for Mobile Navigation" |
| Cartão ajuda a navegar por conteúdos diferentes entre si; atrapalha quando a pessoa procura um item, compara opções ou o conteúdo é homogêneo, e ocupa mais espaço que uma linha de lista | consenso | Laubheimer 2016, NN/g, "Cards: UI-Component Definition" |
| Folha inferior: modal bloqueia o fundo, não modal deixa usar; serve para interrupções, decisões e detalhes curtos; não deve substituir o fluxo de páginas; precisa de botão Fechar e do Voltar; não empilhar; "melhora o alcance do polegar" é "em grande parte incorreto" | consenso | Laubheimer 2023, NN/g, "Bottom Sheets" |
| Diálogo modal: para confirmar ação destrutiva sem volta e avisar de erro grave; não para coisa secundária | consenso | Fessenden 2017, NN/g, "Modal & Nonmodal Dialogs" |
| Carregando: abaixo de 1 s, nada; esqueleto para a tela inteira até 10 s; spinner para um bloco só; acima de 10 s, barra com tempo | consenso | Tankala 2023, NN/g, "Skeleton Screens 101" |
| 0,1 s parece instantâneo; 1 s mantém o raciocínio; 10 s é o limite da atenção | consenso | Nielsen 1993, *Usability Engineering* (via NN/g, "Response Times: The 3 Important Limits") |
| Estado vazio: dizer o que acontece, ensinar o que vai aparecer ali e dar o caminho direto para começar | consenso | Kaplan 2021, NN/g, "Designing Empty States in Complex Applications" |
| Ícone sozinho é ambíguo: o rótulo de texto deve estar sempre visível, sem precisar tocar; se não se acha um ícone em 5 s, ele não vai comunicar | consenso | Harley 2014, NN/g, "Icon Usability" |
| Mostrar primeiro o essencial e o resto um toque adiante; mais de 2 níveis de recolher costuma ter baixa usabilidade | consenso | Nielsen 2006, NN/g, "Progressive Disclosure" |
| Alvo de toque: 24 px mínimo, 44 recomendado; ficam de fora os links no meio de uma frase | consenso | WCAG 2.2, 2.5.8 e 2.5.5 (já em `design-v2.md` e em `tests/e2e/toque.ts`) |

**Leitura [opinião].** Nada disso é ensaio sobre apps de treino: é consenso de guias e de pesquisa de usabilidade. O que tem mais peso para este app é a lei de Hick-Hyman e o "uso em relance" (Gouveia 2015, um estudo, já na v2): menos coisas por tela no treino e no cadastro. A 360 px, a coluna de 17 px dá 40 caracteres, abaixo dos 45 de Bringhurst e Butterick; isso é normal no celular e não pede letra menor. A regra de 45 a 75 serve aqui como **teto** (no tablet ou no computador, a coluna não passa de 560 px, ou seja, de 60 caracteres).

## 4. Achados e propostas

### 4.1 Uma escala de letra com 7 degraus
- **Tela/estado:** todas; pior no treino durante o descanso.
- **Problema:** 19 tamanhos no CSS e até 12 numa só tela (treino, descanso: 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 36 e 72 px). Tamanhos vizinhos como 15/16/17/18 não se distinguem a olho e não dizem "isto é mais importante". O título de 30 px ocupa 3 linhas a 360 px. [medido]
- **Evidência:** escalas de plataforma com poucos degraus e corpo de 16 a 17 [fonte: Apple HIG "Typography"; Material 3; consenso]; complexidade visual pesa [fonte: Reinecke 2013; um estudo].
- **Proposta:** 7 degraus, cada um com um uso só.

| Degrau | Tamanho / peso / altura de linha | Uso | Substitui hoje |
|---|---|---|---|
| Relógio | 64 / 800 / 1,0, algarismos de largura igual | só o descanso | 72 |
| Número | 40 / 800 / 1,0 | carga e repetições, os números do fim e da semana | 36, 38,25, 44 |
| Título de tela | 24 / 800 / 1,15 | 1 por tela (o `h1`) | 30, 28, 26 |
| Pergunta ou seção | 20 / 700 / 1,3 | perguntas do cadastro, títulos de seção, nome do exercício no treino (22 se o agente 3 pedir) | 20, 22, 24 |
| Corpo | 17 / 400 (700 em botão e opção) / 1,45 | texto, botões, opções, campos | 16, 17, 18 |
| Apoio | 15 / 400 / 1,45 | ajuda, explicação curta, segunda linha de uma linha de lista | 14, 15, 15,3 |
| Rótulo | 13 / 700 / 1,3 | passo, rótulo da barra inferior, pílulas e selos | 12, 13 |

  Corpo e campo nunca abaixo de 16 px (o zoom do iPhone). 24 px para o título cabe "Seu treino, com o equipamento que você tem" em 2 linhas a 360 px [medido no esboço], e fica entre o Title 1 da Apple (28) e o Headline small do Material (24). Uma família de letra só (a de hoje); a decisão de servir a letra pelo próprio app é do agente 5.
- **Efeito esperado:** de até 12 tamanhos por tela para até 5; título de 3 linhas para 2 na boas-vindas.
- **Custo e risco:** médio; muda `styles.css` (tokens `--t-*` e as regras que usam número solto). O agente 3 pode pedir números maiores no treino: o degrau "número" pode subir sem mudar o resto.

### 4.2 Espaço, raio, borda e toque em passos fixos
- **Tela/estado:** todas.
- **Problema:** 17 valores de espaço (2, 3, 6, 9, 10, 14, 18, 22 e 34 px fora de qualquer passo), 16 raios, 5 bordas e 7 alturas de toque. [medido]
- **Evidência:** passos de 8 com 4 para ajuste fino [fonte: material.io "Spacing methods"; consenso, não verificado na página]; toque 44 a 48 [fonte: WCAG 2.2, Apple, Material; consenso].
- **Proposta:** espaço **4 · 8 · 12 · 16 · 24 · 32** (16 é a margem da tela e o recheio do cartão; 24 separa seções; 32 só antes do título); raio **8** (campo, miniatura, segmento), **16** (cartão, botão, opção) e **pílula**; borda **1** (divisor de lista) e **2** (contorno de controle: o 1,5 de hoje some); toque **48** (chip, segmentado, ícone, barra inferior), **56** (botão, opção, linha de lista) e **64** ("Série feita" e a barra inferior com rótulo). Uma sombra só, a da folha inferior.
- **Efeito esperado:** 17 → 6 espaços, 16 → 3 raios, 5 → 2 bordas, 7 → 3 alturas. Piso de toque segue 48 (não regride).
- **Custo e risco:** médio; só CSS. Risco de mexer em 388 blocos de uma vez: fazer por família (botão, superfície, lista...) com a regressão visual entre uma e outra.

### 4.3 O conjunto mínimo de componentes, cada um com os seus estados
- **Tela/estado:** todas.
- **Problema:** 19 botões, 19 superfícies, 18 listas, 8 recolheres (tabela da seção 2). O mesmo conceito tem nomes e estilos diferentes, e 26 classes nem são usadas. [medido]
- **Evidência:** sinalizar o essencial e tirar o supérfluo [fonte: Mayer 2017; moderada]; cartão só onde o conteúdo é heterogêneo, lista onde se procura e compara [fonte: Laubheimer 2016; consenso].
- **Proposta:** 16 peças. Estados comuns a todo controle: **normal, pressionado (ou escolhido), desabilitado, foco** (contorno de 3 px, como hoje) e, onde houver, **erro** e **carregando**. Nada depende só da cor: escolhido ganha marca (✓, bolinha cheia ou fundo + contorno de 2 px); erro ganha texto.

| Componente | Variantes | Estados | Substitui hoje |
|---|---|---|---|
| Cabeçalho | de seção (marca), de passo (‹ Voltar, nome do passo), de tarefa (Sair, "1 de 6", Senti algo) | — | `top`, `brand`, `voltar`, `progresso`, `exhead` |
| Barra inferior | 3 itens com ícone e rótulo | atual, normal, foco | `nav-inferior` |
| Barra de ação fixa | 1 ou 2 botões; acima da barra inferior quando ela existe | — | `acao-fixa`, `registro .salvar` |
| Botão | primário, secundário, terciário (link), perigo; 48/56/64; só ícone | normal, pressionado, desabilitado, foco, carregando ("Analisando…") | os 19 da tabela |
| Superfície | neutra, informação, aviso (barra de 4 px à esquerda), erro | — | os 19 da tabela |
| Lista de linhas | simples, tocável (›), com miniatura, numerada | normal, pressionada, foco | os 18 da tabela |
| Opção em linha | rádio, caixa; com ícone e 2ª linha | normal, escolhida, erro, desabilitada, foco | `opcao`, `opcoes`, `estilo-boneco`, `divisao` |
| Chip | valor (dias, minutos, kg, nota 0–10, RIR) | normal, escolhido, desabilitado, "Outro" com campo | `chip-valor`, `chips-valor`, `day` |
| Segmentado | 2 a 4 partes | escolhida, normal, foco, erro | `seg`, `modes`, `abas`, `sim-nao` |
| Cartão de equipamento | grade de 3 colunas, ícone + nome sempre escrito | normal, marcado, foco; ícone que falta = contorno tracejado | `cartao-eq`, `foto-eq`, `detalhes-eq` |
| Campo | texto, número | normal, foco, erro | `numero`, `campo-texto`, `arquivo-campo` |
| Stepper | 56 e compacto 48 | normal, no limite (desabilitado), foco | `stepper`, `contador`, `tctl` |
| Pílula | selo (tocável), registro ("1 · 8 kg × 10"), status ("principal", "recorde") | — | `selo`, `etiqueta`, `marca`, `fichas`, `series-feitas`, `errchip`, `breath`, `phase`, `chip` |
| Progresso | barra, pontos, segmentos, barra com meta | — | os 8 da tabela |
| Recolher | em superfície, plano | fechado, aberto, foco | os 8 da tabela |
| Folha inferior e diálogo | folha padrão (não modal), folha modal, diálogo | aberta; fecha com "Fechar" e com o Voltar | novo |

- **Efeito esperado:** ~130 variantes de hoje viram 16 componentes. A pessoa aprende uma vez o que é um botão, uma opção, uma lista.
- **Custo e risco:** grande se feito de uma vez; médio por família. Os testes e2e procuram por papel e nome (`getByRole`), não por classe, então devem passar; a regressão visual vai mudar (é o objetivo).

### 4.4 Navegação: a mesma barra em todas as telas de "casa", nenhuma barra em tarefa
- **Tela/estado:** Evolução, Locais, cadastro, treino.
- **Problema:** a barra inferior aparece em Programa, Semana e Meus dados, mas some em Evolução e Locais, que são filhas delas; ali a pessoa volta por botões repetidos no fim da página ("Voltar à sua semana"). [medido]
- **Evidência:** a barra fica visível ao trocar de seção, senão a pessoa esquece onde está; a exceção é a tela modal [fonte: Apple HIG "Tab bars"; consenso]; 3 a 5 destinos com rótulo [fonte: Material; Budiu 2015; consenso].
- **Proposta:** o mapa abaixo. A barra fica com os mesmos 3 itens (Treino, Semana, Meus dados): 3 é o mínimo do Material e não há uma 4ª seção que a pessoa visite por conta própria [opinião]. Telas filhas mantêm a barra com o pai aceso e ganham "‹ Pai" no cabeçalho. Cadastro e treino são tarefas: sem barra, com cabeçalho de passo ou de tarefa (a exceção "modal e temporária" da Apple).

```
SEM BARRA (tarefa)                               COM BARRA (casa)  [Treino | Semana | Meus dados]
-------------------------------------------      ---------------------------------------------------
/  Boas-vindas ─► /comecar/triagem ─► /nivel      /programa  (Treino)
   ─► /rotina ─► /inventario ─► /restricoes ─►       ├─ toque num exercício ─► folha: detalhes,
   cabeçalho: ‹ Voltar · nome do passo              │     porquês com selo, "Ver como fazer" ─► /guia/:id
   + "Passo n de 6"; ação fixa embaixo              ├─ linha "A sua semana" ─► /semana
                                                    └─ "Começar o treino" (fixo) ─► /treino
/treino   cabeçalho: Sair · "n de 6" · Senti algo  /semana  (Semana)
   ├─ "Ver como fazer" ─► /guia/:id                 └─ exercício ─► /evolucao/:exId  ‹ Semana (barra fica)
   │    (cabeçalho: ‹ Voltar ao treino)             /dados  (Meus dados)
   ├─ descanso: folha padrão (não cobre o topo)     ├─ Meus locais ─► /locais ─► /locais/:id  ‹ Meus dados
   ├─ Senti algo: folha modal (não cobre o topo)    ├─ Estilo do boneco, rotina e divisão: folha ou tela filha
   └─ Terminar ─► /treino/fim (sem barra)           ├─ Refazer a triagem ─► /comecar/triagem (sem barra)
        └─ "Ver a sua semana" ─► /semana            └─ Apagar tudo ─► diálogo
/guia/:id fora do treino (pela boas-vindas ou pelo programa): cabeçalho ‹ Voltar, sem barra (é leitura focada).
```

- **Efeito esperado:** 0 tela de "casa" sem barra; sai 1 botão "Voltar" repetido por tela filha.
- **Custo e risco:** pequeno; `NavInferior` entra em `Evolucao.tsx` e `Locais.tsx`, sai o botão repetido. Os testes que clicam em "Voltar à sua semana" mudam.

### 4.5 A ação principal sempre presa embaixo
- **Tela/estado:** boas-vindas, triagem (uma a uma), experiência, rotina, programa (celular pequeno).
- **Problema:** o botão que leva adiante começa fora da tela em 5 das 8 telas do cadastro: 127% a 154% na boas-vindas, 158% a 182% na experiência, 172% a 206% na rotina; e o "Começar o treino" do programa fica a 196% no celular pequeno. Só equipamento, confirmar e treino têm a ação fixa. [medido]
- **Evidência:** princípio 2 da v2 (ação embaixo, ao alcance do polegar) [fonte: Bergstrom-Lehtovirta 2014; um estudo]. Observação contra: a NN/g diz que o meio da tela é o lugar mais fácil de tocar [fonte: Laubheimer 2023; consenso]; o ganho aqui é **achar** o botão sem rolar, não alcançá-lo [opinião].
- **Proposta:** a barra de ação fixa vira padrão em toda tela que tem uma ação principal; com a barra inferior, ela fica logo acima. **Exceção mantida:** na lista da triagem, os 2 botões ficam no fim, depois das 9 perguntas (é a regra de segurança; ver a seção 7).
- **Efeito esperado:** botão principal visível sem rolar em 7 de 8 telas do cadastro (hoje 3) e no programa em qualquer celular.
- **Custo e risco:** pequeno; um componente. O "Continuar" fixo pode ser tocado antes de responder tudo: o erro já existe e aparece no topo e na pergunta.

### 4.6 Programa: o treino de hoje primeiro, o resto um toque adiante
- **Tela/estado:** `/programa`, Ana, semana 1.
- **Problema:** 61 selos, 44 alvos e 18 caixas numa página de 2,2 a 2,6 alturas de tela; 9 tamanhos de letra; no celular pequeno o "Começar" fica fora. Cada exercício é um cartão com "Detalhes" dentro (recolher dentro de cartão dentro de página). [medido]
- **Evidência:** lista para conteúdo homogêneo que se percorre [fonte: Laubheimer 2016; consenso]; até 2 níveis de recolher [fonte: Nielsen 2006; consenso]; Hick-Hyman [robusta].
- **Proposta:** (1) título e uma linha de resumo; (2) a semana, a fase e os avisos como **3 linhas tocáveis** (o conteúdo e a ordem das mensagens são do agente 1: **ponto de encaixe**); (3) os dias em segmentado; (4) os exercícios como **lista com miniatura**, com a prescrição em 20 px; (5) tocar na linha abre uma **folha modal** com "Ver como fazer", evolução, alternativas, "prefiro" e os porquês com selo. "Começar" fixo acima da barra.
- **Efeito esperado:** selos na página principal de 61 para ~3 (cada um volta a aparecer junto do seu texto na folha: nenhum some); alvos de 44 para ~15; "Começar" sempre visível.
- **Custo e risco:** médio; `Programa.tsx` é o maior arquivo de tela (53 classes). Folha modal sobre a lista: NN/g pede Fechar e Voltar; não empilhar folha sobre folha (ver como fazer abre o guia como página).

### 4.7 O selo de evidência: o mesmo desenho, um caminho real até a fonte
- **Tela/estado:** toda tela com regra (programa, treino, guia, semana, cadastro).
- **Problema:** o selo hoje é uma pílula com a regra num `title`, que o celular não mostra; não há toque, e as fontes só existem como chave interna. O princípio "o caminho até a fonte" não se cumpre no aparelho. [medido: `ui.tsx`]
- **Evidência:** metadado discreto com o detalhe um toque adiante [fonte: Nielsen 2006; consenso]; rótulo visível, não por cima do mouse [fonte: Harley 2014; consenso].
- **Proposta:** a pílula continua ao lado de todo texto de regra, no degrau "rótulo" (13 px), com o texto de hoje ("evidência robusta", "consenso de especialistas"); vira um link no meio da frase (cumpre `toque.ts`, que isenta links em frase, como a WCAG 2.5.8) e abre uma folha com: a regra, o que o selo quer dizer (o texto de `docs/pesquisa/00-metodo.md`) e as fontes por extenso. Por tipo de tela:
  - **Programa:** selo nas 3 linhas do topo (fase, avisos) e em cada porquê, dentro da folha do exercício. "Sobre o programa" mantém todas as regras com selo.
  - **Treino:** 1 selo por linha de sugestão (a dica da série em 1 linha, não 2 caixas). A folha da fonte abre abaixo do cabeçalho e **não cobre o "Senti algo"**.
  - **Guia:** a segurança fica aberta e visível; no fim, um recolher "De onde vem este guia" com as fontes da técnica (pedido 6.2).
  - **Semana e evolução:** a pílula junto da frase, como hoje (2 a 3 por tela).
  - **Cadastro:** a pílula na ajuda de cada pergunta, como hoje.
- **Efeito esperado:** de 0 para 100% dos selos com caminho até a fonte no celular, sem pílula a mais na tela.
- **Custo e risco:** pequeno no componente (`Selo` vira link + folha); depende do pedido ao domínio 6.1 para mostrar a referência por extenso. Até lá, a folha mostra a regra e o significado do selo.

### 4.8 Equipamento: o layout (o fluxo e a contagem de toques são do agente 2)
- **Tela/estado:** `/comecar/inventario` e "Cadastrar outro local".
- **Problema:** 4,4 a 5,9 alturas de tela, 55 a 76 alvos abertos de uma vez, 50 caixas; ao marcar halteres, o "Continuar" vai a 288% no celular pequeno; a foto é um bloco no meio da página. [medido]
- **Evidência:** Hick-Hyman [robusta]; mostrar o essencial e o resto a um toque [fonte: Nielsen 2006; consenso]; folha para tarefa curta que interrompe [fonte: Laubheimer 2023; consenso].
- **Proposta:** (1) "Onde você treina?" com as 4 opções do domínio (casa, condomínio, academia, corpo livre) em linhas de 56 px com ícone; (2) "Reconhecer pela foto" como botão secundário que abre uma **folha modal** com privacidade, convite, escolha das fotos e as sugestões com "Tenho / Não tenho" em segmentado; (3) "Conferir e ajustar a lista" com as 6 categorias **recolhidas** e a contagem "4 de 5" escrita; (4) dentro da categoria aberta, a grade de cartões e os detalhes do item marcado logo abaixo, em chips. **Ponto de encaixe:** o agente 2 decide quais perguntas ficam, a ordem e se a lista abre fechada.
- **Efeito esperado [opinião, contado no esboço]:** 1ª tela com ~8 alvos em vez de 55; a página aberta numa categoria só, em ~1,5 altura de tela.
- **Custo e risco:** médio; `Inventario.tsx`. Risco: quem quer conferir tudo abre 6 recolheres. A contagem escrita em cada categoria reduz esse custo.

### 4.9 Os 24 ícones de equipamento que faltam
- **Tela/estado:** equipamento (lista e foto).
- **Problema:** 24 itens aparecem só com o nome, entre cartões com desenho; a grade fica irregular. [medido]
- **Evidência:** o rótulo sempre visível é o que garante a leitura; o ícone ajuda quando é simples e distinto [fonte: Harley 2014; consenso].
- **Proposta:** desenhar no mesmo traço dos 25 de hoje (64 × 48, traço na cor do texto, chão em y = 44, só formas geométricas), com o nome **sempre** escrito. Até lá, um contorno tracejado no lugar do desenho. Ordem pelo uso (vagas nos 149.760 programas):

| # | Item | Vagas | Grupo de desenho |
|---:|---|---:|---|
| 1 | Multifuncional | 336.547 | estação de polia (reaproveita coluna e cabo de `estacao_polia_dupla`) |
| 2 | Puxador alto | 139.394 | estação de polia |
| 3 | Remada baixa (estação) | 69.222 | estação de polia |
| 4 | Caneleiras | 43.644 | peso pequeno |
| 5 | Kettlebell | 35.591 | peso pequeno |
| 6 | Cadeira abdutora e adutora | 29.542 | máquina de assento |
| 7 | Glúteo na máquina | 21.352 | máquina de assento |
| 8 | Máquina de abdominal | 20.030 | máquina de assento |
| 9 | Máquina de rosca | 16.936 | máquina de assento |
| 10 | Panturrilha sentada | 10.306 | máquina de assento |
| 11 | Panturrilha em pé | 8.806 | máquina de assento |
| 12 | Voador | 8.127 | máquina de assento |
| 13 | Banco Scott | 7.714 | banco (reaproveita `banco_reto`) |
| 14 | Supino na máquina | 6.860 | máquina de assento |
| 15 | Fitas de suspensão | 4.891 | acessório |
| 16 | Remada articulada | 3.392 | máquina de assento |
| 17 | Hack | 3.340 | máquina de assento |
| 18 | Desenvolvimento na máquina | 1.962 | máquina de assento |
| 19 | Máquina de tríceps | 1.016 | máquina de assento |
| 20 | Roda abdominal | 568 | acessório |
| 21 | Barra hexagonal | 0 | acessório (reaproveita `anilha`) |
| 22 | Banco romano | 0 | banco |
| 23 | Graviton | 0 | máquina de assento |
| 24 | Mini-band | 0 | peso pequeno (reaproveita `elasticos`) |

  Os 5 primeiros somam 81% e os 10 primeiros 94% da coluna "vagas" desses 24 [medido; a coluna conta um exercício em cada item que o serve, então é uma ordem, não uma parcela exata]. 13 dos 24 são "máquina de assento" e vão se parecer entre si a 64 × 48 [opinião]: desenhar uma peça comum (assento, encosto, coluna de placas) e mudar só o que distingue (onde fica a almofada, o braço, o pé).
- **Efeito esperado:** grade homogênea; 0 item sem desenho.
- **Custo e risco:** médio [opinião: ~1 dia, 1 peça comum + 24 desenhos de 5 a 15 linhas em `icones.tsx`]. Vale um teste que falha se um item da lista não tiver desenho (hoje `ICONES` é `Partial`). Risco: ícones parecidos confundem; por isso o nome fica sempre.

### 4.10 Estados: vazio, erro, carregando, desabilitado, foco
- **Tela/estado:** programa sem histórico, semana vazia, carregando o estado, erros do cadastro, análise da foto.
- **Problema:** enquanto o estado carrega, a tela fica em branco; os erros aparecem numa caixa no topo (`caixa-erro`) e na pergunta, com 2 estilos; não há um padrão de estado vazio. [medido no código]
- **Evidência:** abaixo de 1 s, nada; esqueleto só para a tela inteira e até 10 s; spinner para um bloco [fonte: Tankala 2023; Nielsen 1993; consenso]; vazio que ensina e dá o caminho [fonte: Kaplan 2021; consenso].
- **Proposta:** **carregando:** nada até 1 s; se passar, o esqueleto da tela (cabeçalho + 2 linhas de lista); a foto mostra "Analisando…" no próprio botão, desabilitado. **Vazio:** um contorno, uma frase do que vai aparecer ali e o botão para começar ("A sua semana aparece aqui depois do 1º treino"). **Erro:** resumo no topo (superfície de erro, com o texto de hoje) + a pergunta marcada com contorno de 2 px e a mensagem escrita embaixo. **Desabilitado:** fundo de superfície 2 e texto apagado, nunca só a cor. **Foco:** o contorno de 3 px de hoje, em todo controle.
- **Efeito esperado:** 0 tela em branco por mais de 1 s; 1 padrão de erro.
- **Custo e risco:** pequeno; `estado.tsx` (o `null` vira esqueleto com atraso) e `Erros` em `ui.tsx`. Não medi o tempo de carga: se for sempre abaixo de 1 s, o esqueleto nunca aparece, e tudo bem.

### 4.11 Meus dados: 3 grupos de linhas no lugar de 7 caixas
- **Tela/estado:** `/dados`.
- **Problema:** 13 caixas, 2,5 a 3,1 alturas de tela; cada caixa tem 1 título, 1 frase e 1 botão. [medido]
- **Evidência:** lista para itens homogêneos [fonte: Laubheimer 2016; consenso]; diálogo para ação destrutiva sem volta [fonte: Fessenden 2017; consenso].
- **Proposta:** 3 grupos com rótulo (Programa · Cópia de segurança · Saúde e aparelho), linhas tocáveis de 56 px com a 2ª linha explicando; "Apagar todos os dados" por último, com a confirmação num **diálogo** (o único do app) em vez da confirmação na página.
- **Efeito esperado:** de ~2,5 para ~1,2 altura de tela [opinião, contado no esboço].
- **Custo e risco:** pequeno; `Dados.tsx` e os testes que acham "Apagar".

## 5. O que não fazer

- **Menu escondido (hambúrguer) ou uma 4ª aba "Guia" ou "Evolução".** O menu escondido é a navegação menos descoberta [fonte: Budiu 2015; consenso]; guia e evolução são telas filhas, que se abrem a partir do exercício.
- **Barra inferior no treino ou no cadastro.** São tarefas de uma coisa só; a barra convida a sair no meio e rouba 64 px do "Série feita" [opinião; Apple HIG admite esconder em tela modal].
- **Ícone sem rótulo** (na barra, nos cartões de equipamento, nos controles do guia). O rótulo sempre visível é o que funciona [fonte: Harley 2014; consenso]. Os botões de ícone do guia (⏸, ⏮) precisam de nome acessível, como hoje.
- **Cartão para tudo.** Lista de exercícios, de locais e de dados é homogênea: linha, não cartão [fonte: Laubheimer 2016; consenso].
- **Folha inferior como fluxo.** O cadastro e o treino continuam sendo páginas; folha só para detalhe, interrupção e foto [fonte: Laubheimer 2023; consenso]. Nunca folha sobre folha.
- **Recolher dentro de recolher** (hoje o "Detalhes" do exercício fica dentro do cartão, dentro da página, com mais um recolher dentro do cartão de texto). No máximo 2 níveis [fonte: Nielsen 2006; consenso].
- **Esqueleto ou spinner abaixo de 1 s**: o pisca-pisca atrapalha mais que ajuda [fonte: Tankala 2023; consenso].
- **Esconder os selos atrás de um "i" único por tela.** O selo é por regra, não por tela (princípio de evidência).
- **Letra abaixo de 16 px em campo** (zoom do iPhone) ou abaixo de 13 px em qualquer lugar; nem travar o zoom da página.
- **Esconder a segurança do guia num recolher** para ganhar espaço: ela fica aberta (regra do projeto).

## 6. Pedidos ao domínio (decisão separada)

1. **As fontes por extenso no app.** Um arquivo de dados `fontes.json` (validado com zod) gerado de `docs/pesquisa/fontes.md`, com autor, ano, título, periódico e link de cada chave usada em `regras.json`. **Teste:** toda chave em `regras.json` → `fontes` existe em `fontes.json`, e o texto de cada uma bate com `fontes.md`. Sem isso, a folha do selo mostra a regra e o significado do selo, mas não a referência.
2. **"De onde vem este guia".** Hoje as fontes da técnica ficam só em comentários dos arquivos de `src/engine/exercicios/` e em `docs/pesquisa/animacoes/`. Pedido: um arquivo de dados fora do motor (o motor não muda) que ligue cada guia às suas fontes. **Teste:** todo guia com animação aprovada ou cartão de texto tem pelo menos 1 fonte que existe em `fontes.json`.

## 7. Conflitos com "o que não muda"

1. **Triagem: botões no fim × ação fixa embaixo.** A regra de segurança (`seguranca.triagem.nenhuma` e o comentário em `Triagem.tsx`) pede que a pessoa passe pelas 9 perguntas antes de responder. Mantive os botões no fim (o esboço mostra isso); a triagem é a única tela do cadastro sem ação fixa. Decisão do Gustavo, se quiser mudar.
2. **Folhas no treino × "Senti algo" sempre à vista.** Toda folha do treino (descanso, fonte do selo, o próprio "Senti algo") começa abaixo do cabeçalho de tarefa. Isso vira regra do sistema, com um teste: em cada estado do treino, o botão "Senti algo" está visível e não coberto.
3. **O texto da pílula do selo.** Nos esboços usei a forma curta ("consenso") por falta de espaço a 360 px; o app hoje diz "consenso de especialistas" e o `00-metodo.md` diz que "o texto exibido repete o selo da regra". **Recomendo manter o texto de hoje** e pôr a explicação completa na folha. Se o Gustavo preferir a forma curta, é uma decisão dele.
4. Os textos de segurança e das regras com selo estão copiados do app nos esboços, sem mudança; onde o texto vem do gerador, o esboço mostra ‹ › em vez de inventar.

## 8. Resumo em 10 linhas para o Gustavo

1. O app passa em todos os testes de toque e contraste; o que falta é coerência: cada tela tem o seu jeito.
2. Hoje há 19 tamanhos de letra, 17 espaçamentos, 16 cantos e 19 tipos de botão; numa só tela do treino aparecem 12 tamanhos.
3. Proponho 7 tamanhos de letra, 6 espaços, 3 cantos, 2 bordas e 3 alturas de toque, cada um com um uso só.
4. Os ~130 jeitos de desenhar botão, caixa, lista e seletor viram 16 peças, cada uma com os seus estados (escolhido, desabilitado, foco, erro).
5. O botão que leva adiante fica preso embaixo em todo o cadastro (hoje está fora da tela em 5 de 8 telas); a triagem é a exceção, por segurança.
6. A barra inferior (Treino, Semana, Meus dados) fica igual, mas aparece também em Evolução e Locais; no treino e no cadastro, não.
7. O início fica com o treino de hoje e "Começar" sempre à vista; os detalhes de cada exercício abrem numa folha (de 61 selos e 44 botões numa página para ~3 e ~15).
8. O selo de evidência hoje não abre nada no celular; proponho que um toque mostre a regra, o que o selo quer dizer e a fonte (precisa de um arquivo de fontes).
9. O equipamento abre com "Onde você treina?" e a lista recolhida por categoria; a foto vira uma folha; faltam 24 ícones (não 21), e 5 deles cobrem 81% do uso.
10. Os esboços em cinza de todas as telas estão em `img/agente-4-esbocos.html`; o conteúdo do treino (agente 3), das telas de retorno (agente 1), do equipamento (agente 2) e a cor (agente 5) encaixam nesse esqueleto.

## 9. Fontes

- Bringhurst R. *The Elements of Typographic Style* (Hartley & Marks). Conferido só por citações de terceiros (lista da Haskell-cafe, 2012; clagnut.com); **o livro não foi lido**.
- Butterick M. *Practical Typography*, "Line length", practicaltypography.com/line-length.html. Página lida: "45–90 characters, including spaces".
- Apple. Human Interface Guidelines, "Typography" e "Tab bars". Lidas pela versão JSON (developer.apple.com/tutorials/data/design/human-interface-guidelines/…); a página HTML não abriu. Conferidos: tabela de tamanhos do iOS, 17 pt e 11 pt, "avoid light font weights"; "navigation, not actions", "make sure the tab bar is visible", exceção da tela modal, rótulos.
- Google. Material Components for Android, `docs/theming/Typography.md` e `docs/components/BottomNavigation.md` (GitHub, raw). Conferidos: 15 estilos da escala; "three to five destinations"; ícone e rótulo. **m3.material.io não abriu.**
- Google. material.io (antigo), "Spacing methods". **Não verificado:** visto só no resumo de uma busca.
- Comportamento de zoom do Safari no iPhone em campos < 16 px: squirrelscan docs ("input-zoom"); West Wind Weblog (2023); specification.website. **Não achei documento da Apple.**
- Nielsen J (2006). "Progressive Disclosure". NN/g. Lido (2 níveis no máximo).
- Nielsen J (1993). *Usability Engineering*; NN/g, "Response Times: The 3 Important Limits". Lido o artigo.
- Budiu R (2015). "Basic Patterns for Mobile Navigation: A Primer". NN/g. Lido.
- Laubheimer P (2016). "Cards: UI-Component Definition". NN/g. Lido.
- Laubheimer P (2023). "Bottom Sheets: Definition and UX Guidelines". NN/g. Lido.
- Fessenden T (2017). "Modal & Nonmodal Dialogs: When (& When Not) to Use Them". NN/g. Lido.
- Tankala S (2023). "Skeleton Screens 101". NN/g. Lido.
- Kaplan K (2021). "Designing Empty States in Complex Applications: 3 Guidelines". NN/g. Lido.
- Harley A (2014). "Icon Usability". NN/g. Lido.
- W3C (2023). WCAG 2.2, critérios 2.5.5 e 2.5.8. Já conferido em `design-v2.md` e aplicado em `tests/e2e/toque.ts`.
- Já citados e conferidos em `docs/revisoes/design-v2.md` (não reabri): Hick 1952; Hyman 1953; Mayer 2017, *J Comput Assist Learn*; Reinecke et al. 2013, CHI; Bergstrom-Lehtovirta e Oulasvirta 2014, CHI; Gouveia, Karapanos e Hassenzahl 2015, UbiComp.
- Dados do projeto: `docs/revisoes/auditoria/inventario.md` (vagas por exercício, 149.760 programas); `docs/pesquisa/00-metodo.md` (selos); `docs/pesquisa/fontes.md` (`nunes2021`, `simao2012`, usados no esboço da folha do selo).

**Não consegui verificar:** o livro de Bringhurst (só citações); as páginas do Material 3 em m3.material.io (usei a documentação do GitHub); a página "Spacing methods" do material.io; um documento da Apple sobre o zoom em campos abaixo de 16 px. O tempo que o app leva para carregar o estado do aparelho eu não medi.

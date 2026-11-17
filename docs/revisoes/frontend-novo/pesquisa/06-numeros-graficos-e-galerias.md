# Pesquisa 06: números, gráficos pequenos e galerias de interface de celular

Data: 12/11/2026. Todos os endereços abaixo foram abertos e carregaram, salvo onde a linha diz "só o resumo da busca". Selos: robusta (norma ou várias fontes independentes), moderada, um estudo, consenso (prática corrente), opinião (de um autor, ou minha). Onde escrevo "minha inferência", é conclusão minha a partir da fonte, não frase dela.

## 1. Em 10 linhas

1. Todo número que muda na tela (carga, repetições, relógio, séries feitas) deve usar dígitos tabulares (`font-variant-numeric: tabular-nums`). Assim o relógio não "dança" e as colunas alinham. Para texto corrido, proporcional.
2. A unidade ("kg", "reps") vai menor e mais clara que o número. Em pt-BR o decimal é vírgula ("82,5 kg"); o `Intl.NumberFormat("pt-BR")` faz isso sozinho.
3. Número grande funciona como herói quando é um só por tela. As fontes de painel recomendam poucos indicadores (cinco ou menos por página, "os poucos vitais") e sempre uma comparação com algo (semana passada, meta).
4. Na comparação, a seta diz a direção e a cor diz se foi bom. Sem cor sozinha: seta ou texto sempre junto ("+2,5 kg vs. semana passada"). Para este app, melhor evitar verde e vermelho e usar texto neutro.
5. Gráfico de linha no celular: poucos rótulos (3 a 6 linhas de grade no celular, 5 a 10 rótulos de tempo no máximo), rótulo direto no lugar de legenda, destaque no último ponto, linha de grade clara. Com 1 ou 2 pontos, mostre os pontos, não uma linha que sugira tendência.
6. Nunca exija toque para ver o dado importante. A Apple diz isso expressamente. O valor atual deve estar escrito em texto grande; o toque só mostra detalhes.
7. Progresso contra meta: barra horizontal é mais fácil de ler que anel (a Nielsen Norman desencoraja medidores radiais; a evidência sobre anel contra barra é mista). Um grupo muscular por linha, "8 de 12 séries" escrito, e a barra apenas reforça.
8. Cor: uma cor de destaque e o resto em cinza. Elementos do gráfico precisam de 3:1 contra o fundo (WCAG 1.4.11), nos dois temas. Cor nunca é a única pista (WCAG 1.4.1).
9. Acessibilidade: todo gráfico precisa de texto alternativo curto, mais uma tabela ou frase com os valores. A animação de entrada deve respeitar `prefers-reduced-motion`.
10. As galerias públicas (Mobbin, Pttrns, Page Flows e afins) mostram pouco sem conta. O que dá para usar sem login: categorias, artigos e checklists públicos (ex.: o artigo de exemplos de apps de treino do screensdesign.com). Os padrões que mais se repetem: série com alvo, anterior e confirmado separados; descanso que começa da série confirmada e permite +/- tempo e pular; resumo que separa feito de planejado.

## 2. Tabelas por assunto

### 2.1 Tipografia de números

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric | documentação (MDN) | `tabular-nums` dá a todos os dígitos a mesma largura (recurso `tnum`); `lining-nums` põe todos na linha de base; `slashed-zero` risca o zero; `proportional-nums` é o oposto do tabular. Combinam: `lining-nums tabular-nums`. Só funciona se a fonte tiver o recurso. Suporte amplo desde 01/2020. | robusta |
| https://practicaltypography.com/alternate-figures.html | livro de tipografia (Butterick) | Tabular para grades e tabelas; proporcional para texto corrido; "lining" serve em qualquer contexto; tabular/proporcional e lining/old-style são escolhas independentes. Teste: uma linha de zeros sobre uma linha de uns, se ficam do mesmo comprimento a fonte é tabular. | opinião (Butterick) |
| https://type.today/en/journal/numerals | texto de tipografia | Tabular para preços, menus e tabelas; evitar old-style proporcional em tabelas. Slashed zero separa 0 de O (ajuda em código denso). Sobre relógios e UI o artigo não fala; minha inferência: onde o valor muda, tabular. | consenso |
| https://data.europa.eu/apps/data-visualisation-guide/fonts-for-numbers | guia de dataviz (União Europeia) | Use números lining e tabulares em visualização de dados. Teste "111111" sobre "666666": mesma largura = tabular. Verifique o padrão da sua fonte: algumas vêm proporcionais ou não-lining. | consenso |
| https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat | documentação (MDN) | `new Intl.NumberFormat("pt-BR", {style:"unit", unit:"kilogram"})` formata unidade; `formatToParts()` devolve pedaços (inteiro, vírgula, unidade), o que permite pôr o "kg" num `<span>` menor. A página mostra de-DE com vírgula decimal; a saída pt-BR ("1.234,5 kg") não está na página, conferir no navegador. | robusta (API); saída pt-BR a conferir |
| https://developer.apple.com/design/human-interface-guidelines/typography.md | guia de plataforma (Apple HIG) | Tamanho padrão 17 pt e mínimo 11 pt no iOS; peso fino pede tamanho maior; respeitar tamanho de texto do sistema. Não trata de dígitos tabulares nesta página. | consenso |
| https://www.datawrapper.de/blog/text-in-data-visualizations | blog de dataviz | Máximo de dois tamanhos de texto bem distintos nos rótulos, ênfase com negrito; fonte acima de 12 px; arredonde números e deixe o valor exato para o toque ou o texto; inclua a unidade nos rótulos; evite rótulos girados. | consenso |
| https://service-manual.ons.gov.uk/data-visualisation/guidance/chart-text | guia de governo (ONS, Reino Unido) | % e moeda entram direto no rótulo do eixo; outras unidades ficam no título do eixo ou no subtítulo; alt text em 1 frase de 100 a 200 caracteres. | consenso |

Sobre peso forte contra tamanho: nenhuma fonte aberta deu regra numérica. A que chega mais perto é a do Datawrapper (tamanho e peso para hierarquia, no máximo dois níveis). Minha recomendação, marcada como opinião: o tamanho carrega a hierarquia do número herói; o peso fica médio (500 a 600) para não "engordar" o relógio; a unidade vai em peso normal e cor secundária.

### 2.2 Número grande como herói (cartões de estatística)

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://tabulareditor.com/blog/kpi-card-best-practices-dashboard-design | blog de BI | No máximo 5 indicadores por página, só os que mudariam uma decisão; a memória de trabalho segura 3 a 4 itens; rótulo curto e específico; compare com meta mostrando valor, meta e diferença; mantenha a tendência pequena para o número continuar o maior elemento. | opinião (autor do blog) |
| https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns | blog de produto | Promova "os poucos vitais" e jogue o resto para uma tela de detalhe; toda cartão com a mesma ordem (valor, rótulo, variação, sparkline) para dar para varrer; diga a janela da comparação em linguagem simples ("vs. mês passado"); seta para direção, cor para bom ou ruim em cada métrica; diferencie zero de "ainda sem dado". | opinião (autor do blog) |
| https://www.nngroup.com/articles/dashboards-preattentive/ | Nielsen Norman | Comprimento e posição são os melhores para quantidades; área e ângulo são piores; pizza, rosca e medidores radiais são desaconselhados para leitura rápida; cor não deve indicar magnitude, só reforçar. Cerca de 4,5% da população tem daltonismo. | moderada |
| https://www.nngroup.com/articles/mobile-ux/ | Nielsen Norman | Tela pequena: cada elemento novo empurra outro para fora; mostrar primeiro o essencial; alvos de toque maiores e desfazer importante. | moderada |
| https://developer.apple.com/design/human-interface-guidelines/charts.md | guia de plataforma (Apple) | O dado deve ser o elemento mais proeminente; descrições e eixos dão contexto sem competir. Sumário em texto do ponto principal (ex.: frase curta acima do gráfico). | consenso |

### 2.3 Gráfico de linha pequeno no celular

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines | guia de governo (ONS) | Celular: 3 a 6 linhas de grade (desktop 6 a 10); números redondos (0, 5, 10); toda linha de grade rotulada; eixo de linha pode não começar em zero, mas se não começar deixe folga de 1/4 a 1/3 do espaço antes do primeiro ponto. | robusta (guia oficial) |
| https://data.europa.eu/apps/data-visualisation-guide/labels-and-marks | guia de dataviz (UE) | Rótulo direto em vez de legenda; marcadores só no primeiro e no último ponto e nos extremos; 5 a 10 rótulos de tempo, abreviados em tela estreita. | consenso |
| https://www.datawrapper.de/blog/line-charts | blog de dataviz | Rótulo escrito à mão junto da linha, na cor dela; cinza para o contexto; símbolos nos pontos quando há poucas datas; com poucos valores, coluna costuma comparar melhor que linha. | consenso |
| https://www.vis4.net/blog/doing-the-line-charts-right/ | blog de dataviz | Sem legenda separada; destaque uma ou duas linhas; 5 a 7 linhas é o teto. | opinião (autor do blog) |
| https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/ | guia de governo (Reino Unido) | Linhas grossas o bastante, sem marcadores pesados; linhas pontilhadas passam a ideia de previsão; no máximo cerca de 4 linhas; grade clara e no máximo cerca de 10; rótulos horizontais; eixo quebrado só se necessário e descrito no texto alternativo. | consenso |
| https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart | sistema de design (Semrush) | Pontos aparecem quando há poucos dados: com 1 ponto, mostra o ponto (linha tracejada em cor diferente); com 2, mostra os pontos. Pontos de 8 px. Zero é dado, diferente de "n/a". | consenso |
| https://developer.apple.com/design/human-interface-guidelines/charts.md | guia de plataforma (Apple) | Em ambiente compacto, maximizar a largura da área do gráfico e encurtar rótulos do eixo vertical; faixa fixa quando 0 a máximo têm sentido, dinâmica quando os valores variam; sequência familiar de ticks (0, 5, 10); se o dado é inspecionável por toque, use menos linhas de grade e rótulos mais claros; combinar linha com pontos para mostrar valores individuais. | consenso |
| https://developer.apple.com/design/human-interface-guidelines/charting-data.md | guia de plataforma (Apple) | Gráfico simples e com detalhe sob escolha; nem todo conjunto de dados precisa de gráfico, pode ser lista; use frase de resumo acima; mantenha o mesmo estilo entre gráficos do app e entre a versão pequena e a expandida. | consenso |
| só o resumo da busca: Atlassian, Material, Polaris Viz e Visa (ver seção 5) | busca | A busca não trouxe regra verificável de linha pequena dessas fontes. | só o resumo da busca |

Quantos pontos: nenhuma fonte dá número exato para "de 1 a 30 pontos". Minha opinião, a partir das regras de rótulo: com mais de uns 12 pontos, tire os marcadores, deixe só o primeiro, o último e o melhor.

Estado quase vazio (1, 2 ou 3 pontos): a Semrush dá a regra para 1 e 2 pontos (mostrar os pontos). A Datawrapper diz que com poucos valores a coluna costuma ser melhor que a linha. Minha inferência: com 1 ponto, número grande mais frase ("primeira carga registrada: 60 kg"); com 2 ou 3, pontos ligados por linha fina, sem eixo de tendência e sem texto que diga "subindo" se houver só 2; a partir de 4, o gráfico de linha completo.

### 2.4 Progresso contra uma meta

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://www.nngroup.com/articles/dashboards-preattentive/ | Nielsen Norman | Comprimento é mais fácil de julgar que ângulo ou área; medidores radiais desaconselhados para leitura rápida. Indica barra em vez de anel. | moderada |
| só o resumo da busca: "progress ring vs progress bar" | busca | A busca achou um texto de blog dizendo que barras são mais rápidas e precisas em relógio de pulso, outro (não revisado) onde o anel teve erro menor, e estudos sobre duração percebida, não sobre leitura de porcentagem. Conclusão: evidência mista; não afirmar que anel engana sempre. | só o resumo da busca |
| https://developer.apple.com/design/human-interface-guidelines/activity-rings.md | guia de plataforma (Apple) | O anel de atividade é reservado para Mover, Exercitar e Ficar de pé; não usar para outros dados nem imitar. Mostra que a Apple trata o anel como marca registrada de um conceito, não como componente genérico. | robusta (norma da Apple) |
| https://developer.apple.com/design/human-interface-guidelines/progress-indicators.md | guia de plataforma (Apple) | Barra e círculo são ambos válidos para progresso determinado; seja preciso; descreva o que o indicador mede. | consenso |
| https://developer.apple.com/design/human-interface-guidelines/gauges.md | guia de plataforma (Apple) | Medidor: rótulos para valor atual e para os dois extremos do intervalo; no macOS, o estilo discreto (segmentos) só com valores pequenos, o contínuo para faixas grandes. | consenso |
| https://screensdesign.com/articles/workout-tracker-app-design-examples/ | artigo de galeria | Indicadores de progresso devem dizer o que medem (exercícios, séries ou tempo); planejado e feito ficam em totais separados; sessão parcial é marcada como parcial. | consenso |
| https://tabulareditor.com/blog/kpi-card-best-practices-dashboard-design | blog de BI | Mostre o valor, a meta e a diferença (absoluta e percentual); use símbolo junto com a cor. | opinião (autor do blog) |
| só o resumo da busca: especificação do gráfico de bala de Stephen Few | busca | Few propôs a barra linear de "bala" para substituir medidores: barra do valor, marca da meta e faixas opcionais; a escala parte de zero. O PDF da especificação abriu em formato que a ferramenta não leu. | só o resumo da busca |

Acima e abaixo da meta sem semáforo (minha opinião, a partir das fontes): a barra passa da marca de meta com um trecho a mais na mesma cor de destaque, e o texto diz "8 de 12" ou "14 de 12 (+2)". Abaixo: a barra mais curta, sem vermelho. As fontes de painel (saasui) pedem seta e texto junto da cor; a ONS limita a 5 cores e usa cinza para o resto.

### 2.5 Semana e calendário compactos

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| só o resumo da busca: "habit tracker streak alternative" | busca | Os apps que fogem de sequência trocam por meta semanal (ex.: 4 de 7 dias), visão da semana inteira e dia pulado contado de forma diferente de dia falhado. Fontes são páginas de loja e blogs de produto; um estudo citado (Lally 2010) só aparece em ficha de app, não confirmado. | só o resumo da busca (opinião de fornecedores) |
| https://screensdesign.com/articles/workout-tracker-app-design-examples/ | artigo de galeria | O artigo não descreve calendário. Descreve sessão parcial marcada como parcial e histórico com planejado separado de feito. | consenso |
| https://www.nngroup.com/articles/mobile-ux/ | Nielsen Norman | Alvos de toque maiores que no mouse; desfazer é importante por causa de toques acidentais. | moderada |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | norma | Alvo mínimo de 24 x 24 px CSS (nível AA), com exceções de espaçamento. O CLAUDE.md do projeto exige 44 px, que é mais exigente. | robusta |
| https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | norma | Dia feito, hoje e planejado não podem ser distinguidos só pela cor: use forma (círculo cheio, vazio, anel) e texto acessível. | robusta |

Não achei fonte aberta com medida para "7 dias numa linha". Minha inferência: 7 colunas em 320 px dão cerca de 40 px por coluna com a margem de 16 px; para tocar com 44 px, o dia não precisa ser botão (a semana é informação, não navegação).

### 2.6 Sparklines, gráficos mínimos e sistemas de design

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ | texto de Tufte | Sparkline é um gráfico "pequeno, intenso, simples, do tamanho de uma palavra", que cabe em frases e tabelas; mostra tendência e variação local; proporção comprida e baixa, com inclinações perto de 45 graus; uma faixa sombreada pode marcar o normal e a cor pode ligar a linha ao número. A página não usa o termo "data-ink"; fala em "minimizar o desenho, não o dado". | opinião (Tufte, referência clássica) |
| https://github.com/Shopify/polaris-viz/blob/main/BUILDING_BLOCKS.md | documentação de sistema (Shopify Polaris Viz) | Sparklines servem mais para progresso até um total acumulado, e também para mudança no tempo; "sparkbars" servem a valores não acumulados medidos em pontos do tempo, como um dia por barra. Não dá número de pontos. Pelo resumo da busca, o status do projeto é incerto. | consenso |
| https://www.datawrapper.de/blog/what-to-consider-when-creating-small-multiple-line-charts | blog de dataviz | Pequenos múltiplos: menos painéis do que o planejado; mesmo eixo y entre painéis; cor para agrupar ou destacar, não para diferenciar painéis; no celular, se rolar demais, são painéis demais. | consenso |
| https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/ | guia de governo | Para mais de 4 séries: pequenos múltiplos com o mesmo eixo, ou um gráfico de foco com uma série em destaque e o resto em cinza claro. | consenso |
| https://developer.apple.com/design/human-interface-guidelines/charting-data.md | guia de plataforma (Apple) | Gráficos pequenos servem para dado "de relance" e como prévia de um maior; a versão expandida deve manter o mesmo estilo, cores e anotações. | consenso |
| https://carbondesignsystem.com/data-visualization/chart-anatomy/ | sistema de design (IBM Carbon) | Evite encher o quadro do gráfico de elementos; rótulo direto sempre que possível; título descritivo que reflete a conclusão principal. | consenso |
| https://www.data-to-viz.com/ | catálogo de gráficos | Tem uma árvore de decisão por tipo de dado e uma seção de erros comuns, com o "gráfico espaguete" (linhas demais ficam ilegíveis). Não trata de sparkline. | consenso |
| só o resumo da busca: PatternFly, Material 2, Visa, Atlassian | busca | PatternFly recomenda sparkline sem eixo e com o nome do item abaixo; Material 2 tem página beta de visualização e dicas de acessibilidade; Visa e Atlassian não abriram com conteúdo. Não usei números dessas. | só o resumo da busca |

Material, Atlassian, Visa e Adobe Spectrum: as páginas abriram só com o título, deram erro 404 ou vieram vazias (ver seção 5). A página de orientação de gráficos da Apple abriu inteira, em formato markdown, e está usada acima.

### 2.7 Cor em gráfico

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | norma (WCAG 1.4.11) | Partes do gráfico necessárias para entender precisam de 3:1 contra as cores vizinhas; 2,999:1 não passa; linhas não precisam contrastar entre si quando raramente se cruzam; fatias de pizza precisam se distinguir, a menos que rótulos tragam a mesma informação; gradiente: testar a parte menos contrastante. | robusta |
| https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | norma (WCAG 1.4.1) | Cor não pode ser o único meio de informar; precisa de forma, texto ou padrão. Gráfico só por cor reprova. | robusta |
| https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts | guia de governo (ONS) | Com uma cor principal, use outra para destacar a categoria ou o ponto-chave; os menos importantes em cinza; máximo 5 cores (nunca mais de 9); texto abaixo de 4,5:1 só se for grande; anotação explicando o destaque. | consenso |
| https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/ | guia de governo (Reino Unido) | Rótulo de linha em preto ou cinza-escuro, cor só quando as linhas estão muito próximas; legenda por cor reprova a 1.4.1; foco numa série e cinza claro nas outras. | consenso |
| https://developer.apple.com/design/human-interface-guidelines/charts.md | guia de plataforma (Apple) | Não dependa só de cor; use formas ou padrões (ex.: círculo e losango); separe com uma faixa estreita áreas de cor contíguas. | consenso |
| https://carbondesignsystem.com/data-visualization/color-palettes/ | sistema de design (IBM Carbon) | Paletas de gráfico próprias para claro e escuro; no escuro as escalas sequenciais invertem (o mais claro marca o maior valor); alerta vermelho, laranja, amarelo, verde. Não dá razão de contraste. | consenso |
| https://warp-ds.github.io/docs/foundations/data-visualization/color/introduction | sistema de design (Warp) | Contraste medido por WCAG 2 (3:1 em elementos visuais) e por APCA; no modo escuro o APCA exige mais contraste; linhas finas pedem mais contraste que áreas grandes (tons diferentes para linha e área); tokens de cor trocam sozinhos entre claro e escuro. | consenso |
| https://data.europa.eu/apps/data-visualisation-guide/dark-mode | guia de dataviz (UE) | No modo escuro recolorir todos os elementos do gráfico para manter contraste alto; vermelho e verde não são ótimos para daltônicos. Pelo resumo da busca, o artigo do Chameleon (arXiv) diz que só escurecer o fundo piora a legibilidade (não abri o artigo). | consenso |
| https://www.nngroup.com/articles/dashboards-preattentive/ | Nielsen Norman | Cor não indica magnitude; é cue secundária. | moderada |

### 2.8 Acessibilidade de gráfico

| Endereço | Tipo de fonte | A regra ou o padrão | Selo |
|---|---|---|---|
| https://www.w3.org/WAI/tutorials/images/complex/ | norma (tutorial W3C WAI) | Gráfico precisa de descrição curta (no `alt`) e longa (os valores, a tendência), de preferência uma tabela com legenda na própria página; `aria-describedby` só para texto simples, pois perde tabelas e títulos. | robusta |
| https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/ | guia de governo | Todo gráfico precisa de alternativa em texto (critério 1.1.1): tabela de dados ou descrição da mensagem logo abaixo; não repetir o título nem listar todos os pontos na descrição; mencionar quebra de eixo. | robusta (norma aplicada) |
| https://service-manual.ons.gov.uk/data-visualisation/guidance/chart-text | guia de governo (ONS) | Alt text de uma frase, 100 a 200 caracteres, no formato "Um [tipo de gráfico] mostrando que [título]". | consenso |
| https://developer.apple.com/design/human-interface-guidelines/charts.md | guia de plataforma (Apple) | Rótulo de acessibilidade para cada elemento importante, com contexto (a data junto do valor); sem palavras subjetivas ("rapidamente"), use valores; descreva o que o dado representa, não a cor; "junho 6" em vez de "6/6"; esconder rótulos visuais de eixo e tick dos leitores de tela; não exija interação para revelar informação crítica; alvo de toque: expandir a área para o gráfico todo e deixar arrastar para ler valores; animar mudanças ajuda, mas avisar de outro jeito para quem desliga animação. | consenso |
| https://chartability.fizz.studio/ | método de auditoria | 7 princípios (Perceptível, Operável, Compreensível, Robusto e os de "Compromisso, Assistivo, Flexível"); lista curta de 14 testes (20 a 40 minutos) e 50 heurísticas completas. Os detalhes estão no workbook, que não abri. | consenso |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | documentação (MDN) | `reduce` significa pedir menos movimento não essencial; trocar escala por esmaecer; colocar a regra de reduzir depois da regra normal. Suporte amplo desde 01/2020. | robusta |
| https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | norma (WCAG 2.3.3, AAA) | Animação de movimento disparada por interação deve poder ser desligada; mudar só cor ou opacidade não conta como movimento. | robusta |
| https://www.nngroup.com/articles/tooltip-guidelines/ | Nielsen Norman | Dica por hover não existe no toque; use "popup tip" aberto por toque; não esconda informação essencial na dica; suporte teclado. | moderada |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | norma | Alvo mínimo 24 x 24 px CSS. | robusta |

### 2.9 Galerias públicas de interface e de visualização

| Endereço | Tipo de fonte | O que se vê sem login e o padrão tirável | Selo |
|---|---|---|---|
| https://mobbin.com/ | galeria de telas | A página inicial mostra a proposta (biblioteca de apps, fluxos, padrões de interface como diálogos, tabelas, estados vazios), depoimentos e planos. Conta gratuita dá acesso limitado; Pro dá biblioteca, busca e fluxos completos. A ferramenta não conseguiu ver o que o visitante anônimo vê em `/explore`, e a página de categoria de saúde respondeu 403 (bloqueada). Sem padrão tirável. | consenso (descrição da própria galeria) |
| https://pttrns.com/ | galeria de telas | A página pública mostra blog, "banco de dados de apps" e coleções, e diz que agora é "completamente gratuito" mas que é preciso conta para acesso completo. Nenhuma categoria de saúde, temporizador ou estatística visível. Sem padrão tirável. | consenso |
| https://screensdesign.com/ (o endereço uisources.com redireciona para ele) | galeria de telas e artigos | Sem login aparecem cartões de apps, 30 categorias, artigos e guias; categorias como "3-day split workout apps", "5-day gym routine apps", "advanced bodybuilding apps", "AI gym assistant apps". O que é pago não é dito na página. | consenso |
| https://screensdesign.com/articles/workout-tracker-app-design-examples/ | artigo da galeria | Padrões de apps de treino (descritos pelo artigo): série mostra alvo, valor anterior e valor confirmado hoje como elementos separados; valores pré-preenchidos ficam visivelmente "não confirmados" até aceitar; desfazer e editar sem zerar o descanso; descanso começa de uma série confirmada, deixa somar ou tirar tempo, pausar, pular ou desligar, e ao fim avisa mas não inicia a próxima série; resumo lista feito e pulado, duração, volume, recordes, e marca sessão parcial como parcial; guardar localmente primeiro. | consenso |
| https://www.datavizproject.com/ | catálogo de gráficos | Sem login: coleção de visualizações com filtros por família (gráfico, diagrama, mapa, plot, tabela), função (comparação, parte do todo, tendência no tempo etc.) e forma; cada item tem nome, miniatura e página própria. Útil para escolher tipo de gráfico, não para telas de celular. | consenso |
| https://datavizcatalogue.com/ | catálogo de gráficos | Sem login: 60 tipos de gráfico, navegáveis por função ou lista, cada um com página de método. | consenso |
| https://www.data-to-viz.com/ | catálogo de gráficos | Sem login: árvore de decisão por tipo de dado (inclui séries temporais), galeria e seção de erros comuns ("gráfico espaguete"). | consenso |
| https://chartability.fizz.studio/ | catálogo de testes | Sem login: 14 testes rápidos e 50 heurísticas de acessibilidade de gráfico. | consenso |
| https://pageflows.com/ (screenlane.com redireciona para cá) | galeria de fluxos | Respondeu 403: não abriu. | não abriu |
| https://refero.design/ | galeria de telas | Só o título e a frase de apresentação vieram; nada sobre o que é gratuito. | só o título |
| https://dribbble.com/tags/workout-tracker e https://www.behance.net/search/projects/fitness%20app%20ui | galerias de portfólio | Dribbble veio vazio; Behance respondeu 403. Sem conteúdo; mantidas só com cautela, como a tarefa pedia. | não abriu |

Padrões que se repetem (de treino, saúde, temporizador e estatística), só do que li: descanso com número grande e controles mínimos (resultado de busca, só o resumo: relógio gigante, círculo de contagem, botões de pausar e pular, indicação do próximo exercício, e um app corrigindo "MM:SS não cabe" em telas menores); tabela de séries visível acima do temporizador; um tempo guardado como hora de fim, não como contagem que o sistema pode suspender (artigo da screensdesign). Minha opinião: isso bate com o que o app já pretende e não exige copiar tela de ninguém.

## 3. Receita para este app

### 3.1 Registro da série (carga e repetições)

- Carga e repetições em números grandes, com `font-variant-numeric: tabular-nums lining-nums`, para que o número não mude de largura ao usar os botões de mais e menos. Fonte: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric e https://data.europa.eu/apps/data-visualisation-guide/fonts-for-numbers.
- Unidade ("kg", "reps") menor, mais clara e em peso normal, fora do número; separador decimal vírgula via `Intl.NumberFormat("pt-BR")` e `formatToParts()`. Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat (conferir a saída pt-BR no navegador).
- Mostrar alvo, valor da última vez e valor de hoje como três elementos separados; valor sugerido pré-preenchido parece "não confirmado" até a pessoa aceitar; desfazer sem perder o descanso. Fonte: https://screensdesign.com/articles/workout-tracker-app-design-examples/.
- Alvos de toque de pelo menos 44 px (o projeto) e bem acima do mínimo de 24 px da norma. Fonte: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html.
- Dois níveis de texto, no máximo, na tela (número herói e rótulo). Fonte: https://www.datawrapper.de/blog/text-in-data-visualizations.

### 3.2 Temporizador de descanso

- Relógio em dígitos tabulares: o "dançar" de 1 para 0 acaba. Fonte: https://practicaltypography.com/alternate-figures.html (teste dos zeros e uns) e https://type.today/en/journal/numerals.
- O relógio mostra qual série ele segue; permite +15 s, -15 s, pular e desligar; ao acabar sinaliza mas não inicia a próxima série; guardar o instante de fim, não uma contagem. Fonte: https://screensdesign.com/articles/workout-tracker-app-design-examples/.
- Se houver anel de progresso em volta do número, que seja decoração do relógio, e o número em texto é a informação. Tipo de gráfico de ângulo é pior para leitura exata (https://www.nngroup.com/articles/dashboards-preattentive/); uma barra reta fina embaixo do número é alternativa mais fácil de ler. A evidência sobre anel contra barra é mista (só o resumo da busca).
- Animação do anel ou da barra só com movimento quando `prefers-reduced-motion: no-preference`. Fonte: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion.

### 3.3 Resumo do fim do treino

- No máximo 3 a 4 números, com um maior que os outros: o que mudou hoje. Fonte: https://tabulareditor.com/blog/kpi-card-best-practices-dashboard-design (5 ou menos, 3 a 4 na memória de trabalho) e https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns (os poucos vitais).
- Cada número com sua comparação escrita: "+2,5 kg desde o último treino". Direção por seta ou sinal, sempre com texto; sem verde e vermelho (cor não carrega o significado). Fontes: https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns e https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html.
- Listar feito e pulado, e marcar sessão parcial como parcial, sem tom de bronca. Fonte: https://screensdesign.com/articles/workout-tracker-app-design-examples/.
- Distinguir "zero" de "sem dado ainda" (primeira vez que faz o exercício). Fonte: https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns.

### 3.4 Semana

- Uma linha por grupo muscular, com rótulo à esquerda, barra horizontal e texto à direita ("8 de 12 séries"). Barra é leitura por comprimento, a mais fácil. Fontes: https://www.nngroup.com/articles/dashboards-preattentive/ e https://developer.apple.com/design/human-interface-guidelines/gauges.md (rótulos de valor e dos extremos).
- Marca de meta como traço na barra; acima da meta, o trecho extra na mesma cor, mais o texto "+2"; abaixo, barra mais curta em cinza e cor de destaque, sem vermelho. Fonte do princípio de bala: só o resumo da busca sobre Stephen Few; o resto é minha opinião.
- Sete dias em uma linha: círculo cheio (feito), anel (planejado), ponto sob o dia (hoje), e a letra do dia sempre escrita; formas diferentes, não só cor. Nada de sequência nem contador de "dias seguidos"; mostrar "3 de 4 dias nesta semana". Fontes: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html e, só como resumo da busca, os apps que trocam sequência por meta semanal.
- Cores: um destaque e cinza no resto; elementos com 3:1 no claro e no escuro. Fonte: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html.

### 3.5 Evolução de um exercício (linha de 1 a 30 pontos)

- Altura útil: não achei número em fonte aberta. Minha opinião: pelo menos cerca de 160 a 200 px, largura total menos margens, com o valor do último ponto escrito grande acima do gráfico. Fonte do princípio (dado mais proeminente, frase de resumo em cima): https://developer.apple.com/design/human-interface-guidelines/charts.md.
- Eixo y com 3 a 4 linhas de grade claras e rotuladas em números redondos; eixo x com poucos rótulos (primeira e última semana, e mais uma ou duas), abreviados. Fontes: https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines e https://data.europa.eu/apps/data-visualisation-guide/labels-and-marks.
- Linha fina na cor de destaque, ponto final grande e rotulado com a carga; nos outros pontos, marcadores só se forem poucos (primeiro, último, melhor). Fonte: https://data.europa.eu/apps/data-visualisation-guide/labels-and-marks.
- Eixo y não precisa começar em zero para linha, mas deixar folga de cerca de 1/4 a 1/3 abaixo do primeiro ponto quando não começar em zero. Fonte: https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines.
- 1 ponto: número grande e frase, sem gráfico. 2 ou 3 pontos: pontos visíveis ligados por linha fina, sem frase de tendência. Fonte: https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart (1 e 2 pontos com marcadores) e https://www.datawrapper.de/blog/line-charts (poucos valores: coluna pode comparar melhor).
- Sem toque, o dado importante já está escrito (último valor e melhor valor). O toque ou o arrastar sobre a área inteira do gráfico só revela os outros pontos; alternativa sem toque: uma lista ou tabela "semana, carga, repetições" abaixo. Fontes: https://developer.apple.com/design/human-interface-guidelines/charts.md (não exigir interação, ampliar o alvo) e https://www.nngroup.com/articles/tooltip-guidelines/.
- Acessibilidade: `role="img"` com `aria-label` curto, mais a tabela equivalente no mesmo conteúdo da página; rótulos usam a data junto do valor ("12 de outubro: 80 kg"). Fontes: https://www.w3.org/WAI/tutorials/images/complex/ e https://developer.apple.com/design/human-interface-guidelines/charts.md.
- Animação de entrada do traço só com `prefers-reduced-motion: no-preference`. Fonte: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion.

## 4. O que não fazer

- Fonte proporcional em números que mudam (relógio, carga, repetições): a largura oscila e a interface "treme".
- Número com unidade do mesmo tamanho e peso do valor: a unidade compete com o número.
- Painel com cinco, seis cartões do mesmo tamanho e peso: ninguém sabe o que olhar (3 a 4 itens é o limite da memória de trabalho, segundo a fonte de BI).
- Comparação sem dizer com o quê. Sempre escrever "vs. último treino" ou "vs. semana passada".
- Verde e vermelho como único sinal de bom e ruim; seta de "queda" em vermelho para uma carga que desceu num deload ou num dia ruim, o que culpa.
- Anel de progresso para vários valores lado a lado: o ângulo é mais difícil de comparar que o comprimento. Um anel por grupo muscular, com muitos grupos, vira "anéis de atividade" imitados (a Apple reserva esse desenho).
- Legenda em cor separada do gráfico (reprova na 1.4.1 segundo a fonte do governo do Reino Unido); no celular, rótulo direto.
- Linha que sugere tendência com 2 pontos; eixo y que corta o dado para dramatizar um aumento pequeno.
- Dica que só aparece por hover ou por toque longo como única forma de ver o valor.
- Sequência de dias, medalhas, confete e contadores de "dias seguidos" (regra do projeto; as fontes de hábito consultadas, só pelo resumo da busca, apontam meta semanal como alternativa).
- Copiar a tela de qualquer app ou galeria: este documento descreve princípios, não desenhos.

## 5. O que não consegui abrir ou conferir

Não abriram ou vieram sem conteúdo útil:
- https://pageflows.com/ (403), e screenlane.com, que redireciona para ela.
- https://mobbin.com/explore/mobile/app-categories/health-fitness (403); a página inicial do Mobbin abriu, mas não mostrou o que o visitante anônimo vê.
- https://refero.design/ (só título e frase), https://dribbble.com/tags/workout-tracker (vazio), https://www.behance.net/search/projects/fitness%20app%20ui (403).
- https://design.visa.com/data-visualization/charts/line-chart/ (só o título), https://m2.material.io/design/communication/data-visualization.html e https://m3.material.io/blog/data-visualization-accessibility (só o título "Material Design" e o do blog), https://polaris.shopify.com/design/data-visualizations (redireciona para a documentação geral), https://spectrum.adobe.com/page/line-chart (404), https://atlassian.design/foundations/data-visualization/ (404), https://design.customer.io/foundations/data-visualization (host fora da rede permitida), https://www.gov.uk/guidance/content-design/data-visualisation (404).
- https://practicaltypography.com/numbers.html, https://web.dev/articles/baseline-in-action, https://www.datawrapper.de/blog/line-chart-best-practices, https://www.datawrapper.de/blog/mobile-friendly-tables-and-charts/ (todas 404).
- https://flowingdata.com/2012/06/04/a-simple-way-to-make-sparklines/ (403). Observable Plot (429, limite de pedidos). Nightingale: não achei página aberta.
- https://matthewstrom.com/writing/tables redireciona para um domínio de grafia diferente (mattstromawn.com), que não segui por não ter certeza de que é o mesmo autor.
- Dois PDFs (regras de cor de Stephen Few e a especificação do gráfico de bala) abriram em formato binário que a ferramenta não leu; usei só o resumo da busca sobre a bala.
- https://developer.apple.com/design/human-interface-guidelines/typography.md abriu, mas a parte sobre dígitos tabulares não aparece nas linhas que li.
- As subpáginas da ONS sobre anotações e ordenação não foram lidas.

Não conferido (só o resumo da busca): pesquisas sobre anel contra barra e duração percebida; o artigo Chameleon (arXiv) sobre modo escuro; apps que trocam sequência por meta semanal; guias de cartão KPI de fornecedores de BI além dos dois lidos.

Lacunas de conteúdo que nenhuma fonte aberta resolveu, tratadas como opinião minha na receita: altura mínima útil do gráfico em px, número de pontos antes de tirar marcadores, tamanho exato da unidade em relação ao número, peso da fonte do número herói, e como mostrar "acima da meta" sem semáforo.

## Lista de referências abertas e conferidas (46)

MDN font-variant-numeric; Butterick alternate-figures; type.today numerals; EU fonts-for-numbers; MDN Intl.NumberFormat; WCAG 1.4.11; WCAG 1.4.1; WCAG 2.5.8; WCAG 2.3.3; W3C WAI imagens complexas; MDN prefers-reduced-motion; Datawrapper line-charts; Datawrapper small multiples; Datawrapper text-in-data-visualizations; vis4.net; EU labels-and-marks; EU dark-mode; Carbon chart-anatomy; Carbon color-palettes; Warp color; Semrush line chart; ONS using-colours; ONS axes-and-gridlines; ONS chart-text; ONS índice; Analysis Function charts; Apple charting-data; Apple charts; Apple progress-indicators; Apple activity-rings; Apple gauges; Apple typography; NN/g mobile-ux; NN/g dashboards-preattentive; NN/g tooltip-guidelines; saasui KPI; Tabular Editor KPI; Tufte sparklines; Polaris Viz building blocks; Chartability; Data Viz Project; Dataviz Catalogue; From Data to Viz; Mobbin (inicial); Pttrns (inicial); screensdesign.com (inicial); screensdesign artigo de apps de treino.

Tipos de fonte: norma (W3C), documentação (MDN), sistemas de design e guias de plataforma (Apple, Carbon, Semrush, Warp, Shopify), guias de governo (ONS, Analysis Function, UE), blogs de dataviz (Datawrapper, vis4), livro de tipografia (Butterick, type.today), Nielsen Norman, texto de Tufte, galerias e catálogos (Mobbin, Pttrns, screensdesign, Data Viz Project, Dataviz Catalogue, From Data to Viz, Chartability).

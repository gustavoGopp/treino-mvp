# Referências do frontend novo

A pesquisa foi feita em 7 frentes, todas em 12/11/2026, cada uma num arquivo de `docs/revisoes/frontend-novo/pesquisa/` (01 a 07): bibliotecas e código aberto, sistemas de design, apps de treino e saúde, acabamento e "cara de IA", PWA com cara de app nativo, números, gráficos e galerias, e leitura e toque na academia. Este arquivo lê os sete por inteiro e reagrupa as referências por tema, não por pesquisador. Só entram as páginas que o arquivo de origem marca como abertas e conferidas. Os detalhes, as listas de conferência e as receitas de cada frente ficam nos arquivos de origem.

## Contagem

Total de referências distintas nas tabelas: **277** (cada endereço aparece uma vez, no tema em que mais pesa; quando mais de um arquivo o cita, a coluna "Origem" lista todos).

| Tipo de fonte | Referências |
|---|---|
| norma | 15 |
| documentação oficial | 72 |
| sistema de design | 64 |
| estudo | 16 |
| artigo | 31 |
| blog de autor | 16 |
| guia de equipe de produto | 5 |
| relato de usuários | 7 |
| galeria | 11 |
| repositório ou registro de pacote | 27 |
| Hacker News | 2 |
| loja ou site de produto | 9 |
| livro | 2 |
| **Total** | **277** |

| Tema | Referências |
|---|---|
| 1. Espaçamento e grade | 8 |
| 2. Tipografia | 17 |
| 3. Cor e tema claro e escuro | 21 |
| 4. Números e gráficos | 37 |
| 5. Navegação | 6 |
| 6. Registro da série e temporizador | 31 |
| 7. Guia de execução e palco do Boneco | 2 |
| 8. Cadastro e formulários | 12 |
| 9. Folhas e diálogos | 12 |
| 10. Estados (carregando, vazio, erro, sem rede) | 5 |
| 11. Movimento | 17 |
| 12. Acessibilidade, leitura e toque | 25 |
| 13. Acabamento e "cara de IA" | 18 |
| 14. PWA com cara de app nativo | 28 |
| 15. Bibliotecas, ícones e letras (código e licenças) | 38 |
| **Total** | **277** |

## Limitações

Fora das tabelas, por não terem sido abertos ou conferidos:

- **X (Twitter) e Reddit.** Não abriram nesta sessão: o X devolveu erro (HTTP 402) e o Reddit é bloqueado pela ferramenta; não se usou espelho. Nenhuma referência vem deles. As discussões de usuários vêm do fórum da Whoop, da Barbell Medicine, do MacPowerUsers, de um quadro público de pedidos, de avaliações de loja e do Hacker News (por espelho). Os autores do X que importam foram lidos nos blogs próprios.
- **Páginas vazias, com erro ou sem conteúdo útil.** Páginas normais da Apple e do Material 3 não trazem texto sem JavaScript (foram lidos o JSON público da Apple e a documentação do Material no GitHub); a HIG de acessibilidade da Apple não carregou no arquivo 07. Shopify Polaris redirecionou e não deu números; Adobe Spectrum, Atlassian (dataviz) e gov.uk (dataviz) deram 404; Visa e Material de dataviz vieram só com o título; o site do Braille Institute (Atkinson) veio vazio; a documentação do Ark UI deu 404; Pageflows, Mobbin de saúde e Behance deram 403; Refero e Dribbble vieram vazios; várias páginas de blog e web.dev deram 404 (listadas nos arquivos de origem). Galerias com login mostram pouco ao visitante anônimo.
- **Só o resumo da busca.** Ficaram fora: Dobres 2017 no PubMed, o estudo do IEEE Access 2021, a tese de Düsseldorf, a tese de Tsukuba, o UXmatters 2014, Lambourne e Tomporowski 2010, Dyson e Kipping 1998, Dietrich e Audiffren 2011, as diretrizes NHTSA (2 s e 12 s, por fonte secundária), o artigo Chameleon, a especificação do gráfico de bala de Stephen Few, as buscas sobre anel contra barra e sobre sequência contra meta semanal, os blogs de comparação com interesse comercial, o dev.to de registro de carga (404), as páginas do Setgraph, Motra e Massive/LibreFit/iTrack, o agregador unstar.app e o espelho do Hacker News de PWA (brianlovin.com). Também o texto sobre bloqueio de rolagem no iOS e sobre zoom a 16 px nos campos (arquivo 05).
- **Estudos citados por fonte secundária.** Piepenbrock 2013 e 2014, Buchner 2009, Aleman 2018, Legge 1985 e Sloan 1977 só pelo NN/g e pelo blog de Mathôt; Chang 2012 e 2025 e Henze 2011 só pelo resumo oficial; o estudo do vídeo com 4,5 milhões de pares só pela página do instituto; o estudo de Copenhague só pela notícia da universidade.
- **Dados de registro, não de página.** Ark UI, Recharts, Chart.js, Observable Plot e Chartist entraram pelos dados do registro npm e do Bundlephobia (a página própria de cada um não foi aberta). Os pesos "à mão" de 0,5 a 1 kB são estimativas do pesquisador, não medidas.
- **Um endereço citado só na lista de conferência.** O arquivo 04 cita o artigo da NN/g sobre leitura em F na lista de conferência, mas ele não consta em nenhuma tabela como aberto; ficou fora.
- **Endereços abreviados.** No arquivo 01, as fontes variáveis além da Figtree vêm com o endereço abreviado ("..."); não foram reconstruídas aqui e aparecem resumidas na linha da Figtree.
- **Sem endereço.** Dois itens sem endereço (o SVG à mão do arquivo 01 e os estudos de 1998 a 2011 só pelo resumo) não entram.
- **Versões muito novas** (iOS e Safari 27, Chrome 157 a 163) vêm do caniuse e do firt.dev como as páginas mostraram, sem segunda fonte.

## 1. Espaçamento e grade

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://www.radix-ui.com/themes/docs/theme/spacing | sistema de design | Escala de 9 passos: 4, 8, 12, 16, 24, 32, 40, 48, 64 px. | - | robusta | 02 |
| https://atlassian.design/foundations/spacing | sistema de design | Base de 8 px, tokens de 2 a 80 (inclui 12 e 20). Faixas: pequeno 0 a 8, médio 12 a 24, grande 32 a 80. Itens parecidos juntos, relacionados perto, espaço variado para a hierarquia. | - | robusta | 02 |
| https://carbondesignsystem.com/elements/spacing/overview/ | sistema de design | Escala 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160. Sair da escala deve ser evitado. | - | robusta | 02 |
| https://primer.style/product/primitives/size/ | sistema de design | Escala de 2 a 128 (tem 6, 12, 44). Em ponteiro de toque o espaço entre controles empilhados vai a 16 px, no mouse a 8 px. Alturas de controle 24, 28, 32, 40, 48. Raios 3, 6, 12 e total. | - | moderada | 02 |
| https://design-system.service.gov.uk/styles/spacing/ | sistema de design | Escala própria de 5 px (5 a 60). Em tela pequena os degraus maiores encolhem (o 60 vai a 40). | - | moderada | 02 |
| https://atlassian.design/foundations/radius | sistema de design | Raios 2, 4, 6, 8, 12, 16 e total. Anel de foco 2 px para fora, com raio do elemento mais 2 px. Não há regra explícita de cantos aninhados. | - | moderada | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Shape.md | sistema de design | Escala de canto: 0, 4, 8, 12, 16, 20, 28, 32, 48 e total (50%). | - | consenso | 02 |
| https://vercel.com/geist/materials.md | sistema de design | Raio de 6 px para base e dica, 12 px para menu e modal, 16 px para tela cheia. Sombras translúcidas em níveis crescentes. | - | consenso | 02 |

O que isso diz para o app:
- A escala 4, 8, 16, 24, 32, 48, 64 está dentro do que Radix, Atlassian, Carbon e Primer fazem; o 12 aparece em todos eles (02).
- Margem lateral de celular: nenhum sistema aberto traz número; o 16 px é o valor esperado, mas não foi confirmado como regra (02).
- Raio de canto: os sistemas dão escalas curtas (6, 12, 16 no Geist; 3, 6, 12 no Primer). A regra de cantos aninhados não aparece em nenhum deles; é opinião (02, 04).

## 2. Tipografia

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json | sistema de design | iPhone: corpo padrão 17 pt, mínimo 11 pt. Evitar pesos ultrafino, fino e leve; entrelinha folgada em três ou mais linhas. | - | consenso | 02 |
| https://developer.apple.com/design/human-interface-guidelines/typography.md | sistema de design | Mesmos 17 pt e 11 pt; peso fino pede tamanho maior. A página não trata de dígitos tabulares. | - | consenso | 06 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Typography.md | sistema de design | 15 estilos; Body 16/14/12, Label 14/12/11, Headline 32/28/24. | - | consenso | 02 |
| https://atlassian.design/foundations/typography | sistema de design | Corpo 16/24 e 14/20 (padrão), menor 12/16; estilo "Metric" para número grande (28/32, 24/28, 16/20). Tudo em rem. | - | consenso | 02 |
| https://design-system.service.gov.uk/styles/type-scale/ | sistema de design | Tela pequena: corpo 19/25, corpo pequeno 16/20; toda altura de linha é múltiplo de 5 px. Há opção de espaçamento tabular. | - | consenso | 02 |
| https://carbondesignsystem.com/elements/typography/overview/ | sistema de design | Escala de 12 a 92 px; pesos 300, 400, 600. A página não traz altura de linha, números tabulares nem mínimo. | - | consenso | 02 |
| https://vercel.com/geist/typography.md | sistema de design | Estilos por função (Heading, Button, Label, Copy). "Tabular é usado quando se transmite números". Sem valores em px. | - | consenso | 02 |
| https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ | artigo | No máximo 3 tamanhos de texto e cerca de 2 elementos grandes; 14 a 16 px corpo, 18 a 22 subtítulo, até 32 título. Contraste por peso e valor. | - | moderada | 04 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap-style | documentação oficial | `balance` para títulos (limite de 6 linhas no Chromium, 10 no Firefox); `pretty` reduz palavra órfã em texto longo. Em todos os navegadores atuais desde 10/2024. | - | robusta | 04 |
| https://www.joshwcomeau.com/css/custom-css-reset/ | blog de autor | `balance` em títulos, `pretty` em parágrafos, entrelinha do corpo perto de 1,5, campos com `font: inherit` e 16 px ou mais. | - | consenso | 04 |
| https://alistapart.com/article/more-meaningful-typography/ | artigo | Escala modular a partir do corpo; linha do corpo com 1,54; medida e entrelinha se ajustam juntas. | - | consenso | 04 |
| https://pimpmytype.com/review-fitness-app/ | artigo | Cinza escuro em vez de preto puro; número colado à unidade ("49 km"); um par de fontes dá personalidade a um app de fitness. | - | opinião | 03 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC4612630 | estudo | Arditi e Cho 2005: o espaço entre letras teve efeito grande (F[2,8] = 143,9) e a serifa efeito minúsculo. Amostra de 6 pessoas, uma família de fonte. | - | um estudo | 07 |
| https://www.microsoft.com/en-us/research/uploads/prod/2021/06/Beier-Larson-2010-Design-Improvements-for-Frequently-Misrecognized-Letters.pdf | estudo | Beier e Larson 2010, 41 pessoas: letras estreitas melhoram quando alargadas. Distância limiar entre 4,5 e 9 m (média 6 m). | - | um estudo | 07 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC7720185 | estudo | Atilgan, Xiong e Legge 2020: cerca de 13 caracteres por linha dão 80% da velocidade máxima (visão normal), cerca de 8 na baixa visão. | - | um estudo | 07 |
| https://adk.elsevierpure.com/en/publications/typeface-legibility-and-low-vision-readers/ | artigo | Resumo oficial de palestra (Beier, ATypI 2023): a baixa visão varia muito e o desenho da letra pode ajudar grupos específicos. Sem números. | - | opinião | 07 |
| https://www.csun.edu/cod/conference/sessions/2024/index.php/public/presentations/view/3108.html | artigo | Resumo de palestra (CSUN 2024) que anuncia "estudo quantitativo" sobre a Atkinson Hyperlegible. A página não traz amostra, método nem números. | - | opinião | 07 |

O que isso diz para o app:
- O corpo no celular fica entre 16 e 19 nos sistemas que servem a celular (Apple 17, Material 16, GOV.UK 19); só Atlassian e Carbon, de produto de computador, descem para 14 (02).
- Ficar em 3 a 4 tamanhos de texto e fazer a hierarquia por peso e cor é prática (NN/g, Vercel), mas é consenso, não estudo (04).
- O espaço entre letras pesa mais que serifa no único estudo aberto, que é pequeno (07). Não há estudo publicado sobre a Atkinson Hyperlegible (ver a seção de discordâncias).

## 3. Cor e tema claro e escuro

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://atlassian.design/foundations/color | sistema de design | Papéis de cor (neutro, marca, perigo etc.). Contraste mínimo 3:1 para interface essencial e texto de 24 px ou mais, 4,5:1 para texto menor. Cada token tem valor próprio em cada tema. | - | robusta | 02 |
| https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale | sistema de design | Escala de 12 passos: 1 e 2 fundos, 3 a 5 fundo de componente, 6 a 8 bordas, 9 e 10 cor sólida, 11 e 12 texto. Passos 11 e 12 cumprem APCA Lc 60 e Lc 90. | - | moderada | 02 |
| https://vercel.com/geist/colors.md | sistema de design | 10 degraus (100 a 1000), dois fundos (Background 1 quase sempre, 2 com parcimônia), cinza por padrão. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/color.json | sistema de design | Cores semânticas que se adaptam ao tema; cor só onde há ênfase; na ação principal, cor no fundo do botão. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json | sistema de design | Escuro não é inversão pura. Contraste mínimo 4,5:1, tentar 7:1 em texto pequeno. Evitar opção de tema própria do app. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Color.md | sistema de design | Três grupos de destaque, cada um com 4 a 5 papéis; papéis de superfície à parte. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Dark.md | sistema de design | Fundo escuro padrão é cinza escuro, não preto, porque "aumenta a visibilidade das sombras e reduz o cansaço da vista". Superfícies mais altas ficam mais claras. | - | consenso | 02 |
| https://atlassian.design/foundations/elevation | sistema de design | Níveis afundado, padrão, elevado e sobreposto. No escuro a sombra enxerga-se pouco, então a superfície mais alta fica mais clara; conferir o contraste de novo. | - | consenso | 02 |
| https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | norma | 4,5:1 para texto e 3:1 para texto grande (cerca de 24 px, ou 18,5 px em negrito). O 4,5 vem de 3:1 vezes uma perda de contraste de cerca de 1,5 (visão em torno de 20/40). | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html | norma | Nível AAA: 7:1 para texto e 4,5:1 para texto grande. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | norma | Critério 1.4.11: 3:1 para botões, campos, ícones necessários, estados e partes de gráfico contra o entorno; 2,999:1 não passa. | - | robusta | 06, 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | norma | Critério 1.4.1: cor não pode ser o único meio de informar; usar forma, texto ou padrão. Uma diferença de luminosidade de 3:1 vale como distinção extra. | - | robusta | 06, 07 |
| https://git.apcacontrast.com/documentation/WhyAPCA | documentação oficial | APCA é candidato ao WCAG 3 e não é norma. Lc 90 preferido para corpo, Lc 75 mínimo, Lc 45 para títulos grandes. Em letra grande no escuro, manter abaixo de Lc 90. | - | opinião | 07 |
| https://www.nngroup.com/articles/dark-mode/ | artigo | Revisão: texto escuro em fundo claro lê melhor (Piepenbrock 2013), vantagem maior com letra menor; Dobres 2017 não achou efeito com luz "de dia"; Legge 1985, 7 pessoas com meios turvos liam mais rápido no escuro. | - | moderada | 07 |
| https://cogsci.nl/blog/is-bright-text-on-a-dark-background-a-good-idea | blog de autor | Mathôt 2014 atribui a vantagem do fundo claro à pupila pequena. Não fala de halação nem astigmatismo. | - | opinião | 07 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC6925951 | estudo | Mathôt e Ivanov 2019 (três experimentos de 9, 9 e 20 pessoas): a explicação da pupila é mais fraca que o blog sugere. | - | um estudo | 07 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC5213401 | estudo | Dobres e outros 2016, 48 pessoas, sala a cerca de 23 lux: cerca de 82 ms para acertar com texto escuro em fundo claro contra 113 ms ao contrário. No escuro, letra de 3 mm exigiu 136 ms e a de 4 mm, 108 ms. | - | um estudo (analogia: carro) | 07 |
| https://stripe.com/blog/accessible-color-systems | guia de equipe de produto | Escala perceptualmente uniforme (CIELAB): 5 níveis de distância dão 4,5:1 e 4 níveis dão 3:1. Testar texto também sobre o tom mais claro de cada matiz. | - | moderada | 04 |
| https://www.refactoringui.com/previews/building-your-color-palette | livro | Cinzas são a maior parte da interface (8 a 10 tons); preto puro parece artificial; acento com 5 a 10 tons. | - | consenso | 04 |
| https://www.joshwcomeau.com/css/color-formats/ | blog de autor | HSL engana (mesma luminosidade, brilhos muito diferentes); OKLCH e LCH são uniformes. | - | consenso | 04 |
| https://developer.whoop.com/assets/files/WHOOP - Brand & Design Guidelines-bdea3554e94b4ea09e68695b1e8dc8e7.pdf | sistema de design | Guia de marca (lido por extração de texto): uma fonte para palavras e outra para números, uma cor por tipo de dado, degradês de fundo escuro. | - | consenso | 03 |

O que isso diz para o app:
- Contraste: 4,5:1 para texto e 3:1 para controles é norma (WCAG); 7:1 no relógio e nos botões principais é meta do projeto (opinião, 07).
- Escuro: Material e Atlassian pedem cinza escuro e superfícies mais altas mais claras. Com luz forte, o texto escuro em fundo claro lê pelo menos tão bem; o pior caso medido é letra fina e pequena clara em fundo escuro numa sala escura. Nenhum estudo mediu sol direto, OLED ou academia (07).
- A Apple desaconselha tema próprio do app; a pesquisa 07 pede que a pessoa possa trocar à mão (catarata, por exemplo). É uma discordância, que fica registrada no fim.

## 4. Números e gráficos

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric | documentação oficial | `tabular-nums` dá a todos os dígitos a mesma largura (`tnum`); `slashed-zero` risca o zero. Só funciona se a fonte tiver o recurso. Suporte amplo desde 01/2020. | - | robusta | 04, 06 |
| https://practicaltypography.com/alternate-figures.html | livro | Tabular para grades, proporcional para texto corrido. Teste: uma linha de zeros sobre uma de uns; se tiverem o mesmo comprimento, a fonte é tabular. | - | opinião | 06 |
| https://type.today/en/journal/numerals | artigo | Tabular para preços, menus e tabelas; slashed zero separa 0 de O. | - | consenso | 06 |
| https://data.europa.eu/apps/data-visualisation-guide/fonts-for-numbers | documentação oficial | Em visualização de dados, números lining e tabulares; teste "111111" sobre "666666". | - | consenso | 06 |
| https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat | documentação oficial | `formatToParts()` devolve pedaços (inteiro, vírgula, unidade), o que permite pôr o "kg" num `<span>` menor. A saída pt-BR não está na página, conferir no navegador. | - | robusta | 06 |
| https://www.datawrapper.de/blog/text-in-data-visualizations | artigo | No máximo dois tamanhos de texto bem distintos nos rótulos; fonte acima de 12 px; arredondar e deixar o valor exato para o toque ou o texto. | - | consenso | 06 |
| https://service-manual.ons.gov.uk/data-visualisation/guidance/chart-text | documentação oficial | Alt text em 1 frase de 100 a 200 caracteres, no formato "Um [tipo] mostrando que [título]". | - | consenso | 06 |
| https://tabulareditor.com/blog/kpi-card-best-practices-dashboard-design | artigo | No máximo 5 indicadores por página (a memória de trabalho segura 3 a 4); mostrar valor, meta e diferença; tendência pequena para o número seguir o maior. | - | opinião | 06 |
| https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns | artigo | "Os poucos vitais" no topo; mesma ordem em todo cartão (valor, rótulo, variação); dizer a janela da comparação ("vs. mês passado"); seta para direção e cor para bom ou ruim; zero é diferente de "ainda sem dado". | - | opinião | 06 |
| https://www.nngroup.com/articles/dashboards-preattentive/ | artigo | Comprimento e posição são os melhores para quantidades; pizza, rosca e medidor radial são desaconselhados para leitura rápida. Cor não indica magnitude. Cerca de 4,5% da população tem daltonismo. | - | moderada | 06 |
| https://developer.apple.com/design/human-interface-guidelines/charts.md | sistema de design | O dado deve ser o elemento mais proeminente; frase-resumo acima; não exigir interação para revelar informação crítica; rótulo de acessibilidade com a data junto do valor ("junho 6"); expandir a área de toque para o gráfico todo. | - | consenso | 06 |
| https://developer.apple.com/design/human-interface-guidelines/charting-data.md | sistema de design | Gráfico simples com detalhe sob escolha; nem todo dado precisa de gráfico (pode ser lista); mesmo estilo na versão pequena e na expandida. | - | consenso | 06 |
| https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines | documentação oficial | Celular: 3 a 6 linhas de grade; números redondos; se o eixo não começa em zero, folga de 1/4 a 1/3 antes do primeiro ponto. | - | robusta | 06 |
| https://data.europa.eu/apps/data-visualisation-guide/labels-and-marks | documentação oficial | Rótulo direto em vez de legenda; marcadores só no primeiro, no último e nos extremos; 5 a 10 rótulos de tempo. | - | consenso | 06 |
| https://www.datawrapper.de/blog/line-charts | artigo | Rótulo escrito junto da linha, na cor dela; cinza para o contexto; com poucos valores, coluna costuma comparar melhor que linha. | - | consenso | 06 |
| https://www.vis4.net/blog/doing-the-line-charts-right/ | blog de autor | Sem legenda separada; destaque uma ou duas linhas; 5 a 7 linhas é o teto. | - | opinião | 06 |
| https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/ | documentação oficial | Cerca de 4 linhas no máximo; grade clara; rótulos horizontais; mais de 4 séries pedem pequenos múltiplos ou foco em uma série. Todo gráfico precisa de alternativa em texto (1.1.1). | - | consenso | 06 |
| https://developer.semrush.com/intergalactic/data-display/line-chart/line-chart | sistema de design | Com 1 ponto, mostrar o ponto; com 2, os pontos. Pontos de 8 px. Zero é dado, diferente de "n/a". | - | consenso | 06 |
| https://developer.apple.com/design/human-interface-guidelines/progress-indicators.md | sistema de design | Barra e círculo são válidos para progresso determinado; descrever o que o indicador mede. | - | consenso | 06 |
| https://developer.apple.com/design/human-interface-guidelines/gauges.md | sistema de design | Medidor com rótulos para o valor atual e para os dois extremos do intervalo. | - | consenso | 06 |
| https://developer.apple.com/design/human-interface-guidelines/activity-rings.md | sistema de design | O anel de atividade é reservado para Mover, Exercitar e Ficar de pé; não imitar. Os anéis ficam sempre sobre fundo preto, com cores fixas. | - | robusta | 06, 03 |
| https://www.925studios.co/blog/whoop-design-breakdown | artigo | Cada gráfico responde uma pergunta; três níveis (nota do dia, tendência, detalhe); comparação com a sua própria média. Paleta estreita com significado fixo. | - | consenso | 03 |
| https://simplethread.com/?p=5219 | artigo | Crítica ao Peloton: falta comparar a mesma aula feita várias vezes, o que desmotiva. | - | opinião | 03 |
| https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts | documentação oficial | Uma cor principal e outra para destacar; o resto em cinza; no máximo 5 cores (nunca mais de 9); anotar o destaque. | - | consenso | 06 |
| https://carbondesignsystem.com/data-visualization/color-palettes/ | sistema de design | Paletas de gráfico próprias para claro e escuro; no escuro as escalas sequenciais invertem. | - | consenso | 06 |
| https://warp-ds.github.io/docs/foundations/data-visualization/color/introduction | sistema de design | 3:1 em elementos visuais; no escuro o APCA exige mais contraste; linha fina pede mais contraste que área grande. | - | consenso | 06 |
| https://data.europa.eu/apps/data-visualisation-guide/dark-mode | documentação oficial | No modo escuro, recolorir todos os elementos do gráfico; vermelho e verde não servem bem a daltônicos. | - | consenso | 06 |
| https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ | blog de autor | Sparkline é gráfico "pequeno, intenso, simples, do tamanho de uma palavra"; proporção comprida e baixa, inclinações perto de 45 graus. | - | opinião | 06 |
| https://github.com/Shopify/polaris-viz/blob/main/BUILDING_BLOCKS.md | sistema de design | Sparklines para progresso até um total acumulado; "sparkbars" para valores medidos em pontos do tempo. Não dá número de pontos. | - | consenso | 06 |
| https://www.datawrapper.de/blog/what-to-consider-when-creating-small-multiple-line-charts | artigo | Pequenos múltiplos: menos painéis do que o planejado, mesmo eixo y, cor para agrupar e não para diferenciar. | - | consenso | 06 |
| https://carbondesignsystem.com/data-visualization/chart-anatomy/ | sistema de design | Evitar encher o quadro; rótulo direto; título descritivo que reflete a conclusão. | - | consenso | 06 |
| https://www.data-to-viz.com/ | galeria | Árvore de decisão por tipo de dado e seção de erros comuns ("gráfico espaguete"). Não trata de sparkline. | - | consenso | 06 |
| https://www.datavizproject.com/ | galeria | Coleção filtrável por família, função e forma; serve para escolher tipo de gráfico, não para telas de celular. | - | consenso | 06 |
| https://datavizcatalogue.com/ | galeria | 60 tipos de gráfico, cada um com página de método. | - | consenso | 06 |
| https://chartability.fizz.studio/ | artigo | Método de auditoria de acessibilidade de gráfico: 14 testes rápidos (20 a 40 minutos) e 50 heurísticas. Os detalhes estão no workbook, que não foi aberto. | - | consenso | 06 |
| https://www.w3.org/WAI/tutorials/images/complex/ | norma | Gráfico precisa de descrição curta (`alt`) e longa (valores e tendência), de preferência uma tabela na página; `aria-describedby` perde tabelas e títulos. | - | robusta | 06 |
| https://www.nngroup.com/articles/tooltip-guidelines/ | artigo | Dica por hover não existe no toque; não esconder informação essencial na dica. | - | moderada | 06 |

O que isso diz para o app:
- Todo número que muda (carga, repetições, relógio) pede dígitos tabulares, e a fonte precisa ter o recurso `tnum` (MDN, Butterick, UE). A saída pt-BR do `Intl.NumberFormat` ainda precisa ser conferida no navegador (06).
- Um número herói por tela, com a comparação escrita ("vs. último treino"), e direção por seta ou texto, nunca só por cor (06). Poucos indicadores é opinião de blogs de BI.
- Em gráfico de linha: 3 a 6 linhas de grade no celular, rótulo direto, marcadores só nos pontos importantes, e com 1 ou 2 pontos mostrar os pontos. Barra é mais fácil de ler que anel segundo a NN/g, mas a evidência sobre anel contra barra é mista (06). Altura mínima do gráfico e número de pontos antes de tirar marcadores não têm fonte; são opinião (06).

## 5. Navegação

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/tab-bars.json | sistema de design | Rótulo em cada aba, de preferência uma palavra; não esconder nem desativar abas; esconder a barra faz a pessoa esquecer onde está; "Mais" dificulta achar o conteúdo. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BottomNavigation.md | sistema de design | 3 a 5 destinos com ícone e rótulo. Indicador de 56 x 32 dp. Altura 80 dp no M3 e 64 dp na versão expressiva. | - | consenso | 02 |
| https://ouraring.com/blog/new-oura-app-experience/ | loja ou site de produto | Cinco abas viraram três; a aba "Hoje" é como a primeira página de um jornal: três notas no alto, destaque do dia, linha do tempo. | - | consenso | 03 |
| https://ryanhalperin.myportfolio.com/fitbod-redesign | blog de autor | Estudo de caso do Fitbod: meta semanal logo no começo, "Iniciar treino" marca o dia, calendários mostram o feito e o faltado. A queixa: difícil ver a constância. | - | opinião | 03 |
| https://sketch.com/blog/gentler-streak | loja ou site de produto | Entrevista da equipe do Gentler Streak: estados da vida real (doente, lesionado, em pausa) fazem parte da tela de início; o padrão é simples e o detalhe fica disponível. | - | consenso | 03 |
| https://hn.svelte.dev/item/48932784 | Hacker News | Comentaristas pedem "design limpo e focado, sem poluição" e desgostam de elementos extras na tela inicial que provocam toque sem querer. | - | relato de usuários | 03 |

O que isso diz para o app:
- Barra de baixo com 3 a 5 destinos, ícone e rótulo sempre visíveis, sem esconder ao trocar de seção (Apple, Material). A altura da barra do iPhone não foi conferida; 64 a 80 dp é leitura do Material (02).
- Tela de início com uma pergunta e poucos números, detalhe um toque depois (Oura, Whoop). É consenso de designers, não medida (03).
- Há poucas fontes abertas sobre navegação; a pesquisa não cobre gesto de voltar nem troca de aba em PWA.
## 6. Registro da série e temporizador

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://screensdesign.com/showcase/hevy-workout-tracker-gym-log | galeria | Hevy: ao concluir a série, um "visto" animado curto dá recompensa sem atrapalhar. Biblioteca com guias de forma 3D em loop. Crítica: a tela é densa para iniciante. Cadastro de 10 passos obrigatório antes de qualquer função. | - | consenso | 03 |
| https://fitnessdrum.com/?p=30850 | artigo | Comparativo (pode ter afiliado): o app apontado como mais rápido adiciona uma série com um toque e mostra o que se levantou na vez anterior. Hevy limita o histórico de gráficos a 3 meses no plano grátis. | - | consenso | 03 |
| https://openlift-app-website-stage.pages.dev/blog/workout-logging-redesign | loja ou site de produto | OpenLift: "menos tempo no celular, mais tempo treinando"; colunas fixas (tipo, alvo, carga, repetições) e um toque que reaproveita a carga anterior. | - | opinião | 03 |
| https://screensdesign.com/showcase/gym-workout-alpha-progression | galeria | Alpha Progression: tocar no visto registra a série e inicia o descanso sozinho. Só 4 passos antes do pagamento. Estrela animada e pop-up de compartilhamento ao terminar (comemoração barulhenta). | - | consenso | 03 |
| https://www.community.whoop.com/t/what-is-going-on-with-the-strength-trainer/5776 | relato de usuários | Digitar carga e repetições leva 4 a 6 toques; ordem "repetições antes de carga" contraria o hábito; apagar e recolocar o exercício some com o histórico. | - | relato de usuários | 03 |
| https://strongsplit.userjot.com/board/feature-improvements | relato de usuários | Quadro de pedidos do Strongsplit: botão de registrar maior (22 votos); trocar kg/lb sem sair do treino (133); concluir a série pelo relógio (233); aviso de descanso alto demais com fone (22). | - | relato de usuários | 03 |
| https://www.community.whoop.com/t/strength-trainer-feedback-rest-timer-workflow-progression-targets-notes-measurements-and-exercise-mapping/14544 | relato de usuários | Pede o alvo de hoje já preenchido e notas por exercício. Descanso manual faz esquecer; pedem início automático, aviso no fim e esperar a confirmação da próxima série. | - | relato de usuários | 03 |
| https://www.hevyapp.com/features/workout-rest-timer/ | loja ou site de produto | Descanso começa quando a série é marcada; ajuste em passos de 15 s; de 5 s a 5 min por exercício, e pode ficar desligado. A página não diz tamanho do relógio, pular nem som. | - | consenso | 03 |
| https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577 | loja ou site de produto | Strong: contagem automática, toque no pulso ao acabar. Notas de versão mostram bug recorrente do temporizador que para em segundo plano ou zera ao fechar; o relógio precisa sobreviver à tela apagar. | - | relato de usuários | 03 |
| https://www.community.whoop.com/t/feature-request-dynamic-island-timer-for-strength-trainer/16274.md | relato de usuários | Querem ver o descanso fora do app, para usar outro aplicativo entre séries. | - | relato de usuários | 03 |
| https://talk.macpowerusers.com/t/gym-iphone-app-recommendation/32667?page=2 | relato de usuários | Elogio específico a mostrar o descanso na tela bloqueada (Live Activity) e ao aumento automático de carga. | - | relato de usuários | 03 |
| https://forum.barbellmedicine.com/t/timer-recommendation/7214 | relato de usuários | Muita gente usa o cronômetro do celular ou a voz; o alarme precisa tocar por cima de música. Um timer simples basta para parte dos usuários. | - | relato de usuários | 03 |
| https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350 | loja ou site de produto | Avaliações do Hevy: elogio a trocar ou acrescentar exercício no meio do treino e a vídeos de demonstração; reclamação do limite de 5 exercícios próprios no grátis. | - | relato de usuários | 03 |
| https://www.community.whoop.com/t/feature-request-a-much-better-strength-training-experience/15924 | relato de usuários | Reclamação de ter de iniciar e parar o app a cada série. | - | relato de usuários | 03 |
| https://developer.apple.com/design/human-interface-guidelines/workouts.md | sistema de design | Durante o treino mostrar só o que ajuda agora; pausa e fim fáceis de tocar; texto grande e de alto contraste. No fim, resumo do que foi registrado; descartar treinos de poucos segundos. | - | robusta | 03 |
| https://tonal.com/blogs/all/celebrate-your-progress-introducing-new-tonal-achievements-prs-and-summaries/ | loja ou site de produto | Recorde comemorado na hora, por tipo; no resumo, progresso ao longo do tempo e comparação semana a semana. | - | consenso | 03 |
| https://builtformars.com/company/hevy | artigo | Análise de UX (parte paga fechada): transforma o total levantado numa comparação fácil de entender e num cartão para compartilhar. | - | opinião | 03 |
| https://ixd.prattsi.org/2025/09/design-critique-strava-ios-app-2/ | artigo | Crítica ao Strava: o resumo é bom por mostrar o que se espera ver, mas falta o próximo passo; termos sem explicação ("Kudos") criam dúvida na 1ª vez. | - | opinião | 03 |
| https://screensdesign.com/articles/workout-tracker-app-design-examples/ | galeria | Série mostra alvo, valor anterior e valor de hoje como elementos separados; valores pré-preenchidos parecem "não confirmados" até aceitar; descanso começa da série confirmada, soma ou tira tempo, pula, e ao fim avisa sem iniciar a próxima; guardar o instante de fim, não uma contagem; sessão parcial marcada como parcial. | - | consenso | 06 |
| https://www.cs.ubc.ca/labs/spin/sites/default/files/local_pdfs/2011_DetectingVibrationsAcrosstheBody.pdf | estudo | Karuei e outros 2011, 16 pessoas: andar na esteira diminui muito a detecção de vibração; coxas e pés são os piores pontos, punhos e coluna os melhores. | - | um estudo | 07 |
| https://discovery.ucl.ac.uk/1502364/1/CHI16.pdf | estudo | Mehrotra e outros 2016, cerca de 10.372 notificações de 20 pessoas: vista em média em 3 min 21 s no modo vibrar contra 5 min 57 s com som. São notificações do dia a dia, não alarme de contagem. | - | um estudo | 07 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC12373581/ | estudo | Gaillet e outros 2025, 21 pessoas, tarefa de piloto: com duas tarefas, som e vibração juntos foram detectados mais rápido (cerca de 548 ms contra 599 do som e 626 da vibração). Os autores dizem que pode ser só soma estatística. | - | um estudo (analogia) | 07 |
| https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/timer_role | documentação oficial | `role="timer"` tem `aria-live="off"` implícito e não anuncia a cada tique; o exemplo troca para `alert` por cerca de 1 s para avisar o momento importante. | - | consenso | 07 |
| https://caniuse.com/mdn-api_navigator_vibrate | documentação oficial | `navigator.vibrate`: Safari iOS sem suporte em nenhuma versão listada (3.2 a 27.2); Chrome Android 157 suporta. Dados lidos em 12/11/2026. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API | documentação oficial | `navigator.vibrate([250,120,250])`; se o aparelho não vibra, a chamada não faz nada. Disponibilidade limitada. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API | documentação oficial | `navigator.wakeLock.request('screen')` em HTTPS; o sistema solta a trava quando a página fica oculta, então pedir de novo em `visibilitychange`. Baseline 2025. | - | robusta | 05 |
| https://caniuse.com/wake-lock | documentação oficial | Wake Lock: Safari iOS a partir do 16.4; Chrome Android 157. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices | documentação oficial | O `AudioContext` só toca se criado ou retomado dentro de um gesto do usuário; senão começa `suspended`. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay | documentação oficial | Áudio só toca sozinho se a pessoa já interagiu com o site; no Safari, `<video>` precisa de `playsinline`. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification | documentação oficial | No celular, `new Notification()` costuma dar `TypeError`; usar `registration.showNotification()` via service worker, com permissão e HTTPS. | - | robusta | 05 |
| https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ | documentação oficial | Push no iPhone exige app adicionado à tela de início e permissão pedida num toque direto. Precisa de servidor de push. iOS/iPadOS 16.4. | - | robusta | 05 |

O que isso diz para o app:
- O padrão que se repete nos apps e nos pedidos de usuários: um botão grande de "feito" que inicia o descanso, valores da vez anterior à vista, ajuste de descanso em passos de 15 s e aviso no fim com som ajustável (03). É consenso e relato, quase nunca estudo.
- No iPhone não há vibração na web, e o aviso com o app em segundo plano só chega por push de servidor. Wake Lock funciona (iOS 16.4). Por isso o fim do descanso deve ter canal visual e sonoro, nunca só vibração (05, 07).
- Os estudos de vibração e de som e vibração juntos são de outros contextos (esteira, piloto); servem por analogia (07). O som precisa de um toque prévio para tocar (MDN).

## 7. Guia de execução e palco do Boneco

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://www.networkscienceinstitute.org/publications/video-moves-you-randomized-field-experiment-shows-how-in-app-videos-increase-exercise | estudo | Experimento com 4,5 milhões de pares usuário-exercício: o vídeo de demonstração aumentou o uso para quem já praticava aquele nível e diminuiu para quem tinha pouca habilidade. Lido só pelo resumo da página do instituto. | - | um estudo | 03 |
| https://ixd.prattsi.org/2023/09/design-critique-nike-training-club-iphone-app/ | artigo | Crítica ao Nike Training Club: os rótulos mostram objetivo, duração e equipamento, mas faltam nível de dificuldade e controle de ritmo. Um guia precisa dizer o que exige antes de abrir. Filtros demais confundem. | - | opinião | 03 |

O que isso diz para o app:
- Há pouca fonte aberta sobre guia de execução. Não se achou comparação de usuários entre vídeo, animação e ilustração (03).
- O único estudo mostra que a demonstração pode afastar iniciantes; o tom do guia para quem está começando importa (um estudo, lido só pelo resumo).
- A regra de `prefers-reduced-motion` para o guia (animação parada no quadro-chave) é decisão do projeto, não achado de pesquisa (07).

## 8. Cadastro e formulários

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/steppers.json | sistema de design | O stepper não mostra valor: ponha ao lado de um campo. Para valores que variam muito, combinar stepper e campo; salto de 10 vezes o passo em campos grandes. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/segmented-controls.json | sistema de design | Segmentos de largura igual, no máximo cerca de 5 no iPhone; não misturar texto e ícone. | - | consenso | 02 |
| https://primer.style/product/components/segmented-control/ | sistema de design | Para escolher uma entre poucas opções; a seleção vale na hora; precisa de nome acessível. | - | consenso | 02 |
| https://design-system.service.gov.uk/components/text-input/ | sistema de design | `inputmode="numeric"` para inteiro e `inputmode="decimal"` para casas decimais; evitar `type="number"`. Rótulo visível acima do campo; placeholder não substitui rótulo; aceitar sufixo digitado como "kg". | - | consenso | 02 |
| https://primer.style/product/ui-patterns/forms/ | sistema de design | Validar ao enviar, depois ao sair do campo; evitar botão de envio desativado; rótulo de até cerca de 3 palavras; com 3 ou mais erros, resumo no topo. Se a validação passa de 1 s, mostrar indicador. | - | consenso | 02 |
| https://carbondesignsystem.com/components/text-input/usage/ | sistema de design | Campos de 24, 32, 40 (padrão) e 48 px. Validação em tempo real recomendada; ajuda fixa abaixo do campo, trocada pelo erro. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/text-fields.json | sistema de design | Mostrar o tipo de teclado adequado (numérico); o placeholder some ao digitar, usar rótulo separado. | - | consenso | 02 |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode | documentação oficial | `inputmode="decimal"`: teclado com o separador decimal do idioma da pessoa (vírgula em pt-BR). É só dica, não valida. Baseline desde 12/2021. | - | robusta | 05 |
| https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html | norma | Critério 3.3.7: o que a pessoa já digitou no mesmo processo vem preenchido ou escolhível. Serve para memória e fadiga. | - | robusta | 07 |
| https://builtformars.com/company/fitbod | artigo | Análise de UX (parte paga fechada): o Fitbod pergunta onde se treina e já marca o equipamento provável; a permissão de notificação começa com pergunta de resposta provável "sim", com exemplo, e diz que dá para mudar depois. | - | opinião | 03 |
| https://screensdesign.com/showcase/fitbod-gym-fitness-planner | galeria | Onboarding de 14 passos (o tamanho é apontado como risco); equipamento detalhado dá treino realista; dicas na 1ª sessão evitam susto. | - | opinião | 03 |
| https://screensdesign.com/showcase/macrofactor-workouts-tracker | galeria | 38 passos e pagamento obrigatório antes de criar conta; sugere versão expressa e valor já no painel vazio do 1º dia. O painel fica quase vazio no primeiro uso. | - | opinião | 03 |

O que isso diz para o app:
- Campo de carga: teclado numérico com `inputmode`, não `type="number"`; rótulo sempre visível; erro que diz o que houve e como corrigir; não apagar o digitado (GOV.UK, Primer, Carbon, Apple).
- Cadastro longo (14 a 38 passos) aparece nas análises de tela como risco de abandono; mostrar valor logo no primeiro uso é opinião de 4 análises, nenhuma medida (03).
- Validação: Primer prefere ao enviar ou ao sair do campo, Carbon em tempo real; é decisão de projeto (02).

## 9. Folhas e diálogos

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/sheets.json | sistema de design | Folha modal bloqueia a tela de trás. Pontos de parada "grande" e "médio". Alça aparece em folha redimensionável. Cancelar no canto de cima à esquerda; sempre oferecer uma saída; evitar folha que cobre quase toda a janela. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/alerts.json | sistema de design | Alerta com título, texto opcional e no máximo três botões; não usar para só informar nem para ação comum que se desfaz. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BottomSheet.md | sistema de design | Alça opcional; largura máxima 640 dp; folha modal pode ser arrastada para baixo para fechar. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Dialog.md | sistema de design | "Diálogos são janelas modais que exigem interação." Margens de 24 dp nas laterais e 80 dp em cima e embaixo. | - | consenso | 02 |
| https://carbondesignsystem.com/components/modal/usage/ | sistema de design | Modal só para exigir resposta, avisar algo urgente ou confirmar decisão; "use com moderação". Cancelar secundário à esquerda e ação principal à direita, 50% da largura cada. | - | consenso | 02 |
| https://www.nngroup.com/articles/confirmation-dialog/ | artigo | Confirmação que aparece sempre vira hábito de apertar "sim". Reservar para ação grave; rótulos "Apagar" e "Manter"; desfazer é a proteção mais forte. | - | opinião | 07 |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog | documentação oficial | `showModal()` já dá fundo inerte, foco para dentro, Esc fecha e `::backdrop`. Disponível amplamente desde março de 2022. | - | robusta | 01 |
| https://developer.mozilla.org/en-US/docs/Web/API/Popover_API | documentação oficial | Atributo `popover` e camada de topo; não modal; Baseline 2025. Serve para menus e avisos, não para a folha principal. | - | robusta | 01 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap | documentação oficial | `scroll-snap-type`, `scroll-snap-align` e `scroll-snap-stop: always`; base de carrossel e de folha por rolagem. | - | robusta | 01 |
| https://dev.to/viliket/native-like-bottom-sheets-on-the-web-the-power-of-modern-css-ld6 | blog de autor | Folha com `overflow-y: scroll` e `scroll-snap-type: y mandatory`. Precisa de JavaScript para teclado virtual e para fechar ao deslizar. Bug do iOS Safari (WebKit 183870) com `pointer-events`. | - | consenso | 01 |
| https://github.com/viliket/pure-web-bottom-sheet | repositório ou registro de pacote | Componente que embrulha um `<dialog>` nativo, com pontos de parada em CSS e `swipe-to-dismiss`. O peso não foi conferido. | MIT | moderada | 01 |
| https://bugs.webkit.org/show_bug.cgi?id=259568 | documentação oficial | Registro de erro: `overflow: hidden` no `body` não trava a rolagem do fundo em PWA instalado no iPhone/iPad. Aberto em 27/07/2023 (Safari 16), última alteração 03/11/2023, sem correção registrada. | - | robusta | 05 |

O que isso diz para o app:
- Folha de baixo para tarefa curta, diálogo para decisão que bloqueia; confirmar só o grave e oferecer desfazer (Apple, Carbon, NN/g). O NN/g é opinião de um autor.
- O `<dialog>` nativo cobre foco, Esc e fundo inerte sem biblioteca; o arrasto da folha se escreve à mão ou por scroll-snap (01).
- No iPhone instalado, travar a rolagem do fundo só com `overflow: hidden` não basta (bug aberto no WebKit, 05).
## 10. Estados (carregando, vazio, erro, sem rede)

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://primer.style/product/ui-patterns/loading/ | sistema de design | Abaixo de 1 s, nada; de 1 a 3 s, indicador sem progresso; de 3 a 10 s, com progresso; acima de 10 s, com progresso e em segundo plano. Esqueleto para áreas grandes, spinner para o caso variável. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/loading.json | sistema de design | Mostrar algo o quanto antes (espaço reservado em vez de tela em branco); deixar fazer outras coisas; avisar quanto tempo deve levar. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/progress-indicators.json | sistema de design | Usar indicador com progresso quando possível, para a pessoa decidir se espera; indicadores são temporários. | - | consenso | 02 |
| https://primer.style/product/ui-patterns/empty-states/ | sistema de design | Título explica o propósito; texto de apoio curto com o próximo passo; uma ação principal. Em erro: sem termos técnicos nem códigos, específico, evitar "Houve um problema", sem tom brincalhão. | - | consenso | 02 |
| https://design-system.service.gov.uk/components/error-message/ | sistema de design | O erro explica o que houve e como corrigir; sem "por favor", "desculpe" ou "inválido"; mesma frase no campo e no resumo; não limpar os campos preenchidos. | - | consenso | 02 |

O que isso diz para o app:
- Erro: dizer o que houve e como corrigir, sem "ocorreu um erro" genérico e sem apagar o que a pessoa digitou (GOV.UK, Primer, Carbon; 02).
- Carregando: nada abaixo de 1 s; mostrar algo logo (Primer, Apple). Se esqueleto vale numa tela cujos dados estão no aparelho é opinião; nenhuma fonte aberta mediu esqueleto contra indicador (02, 05).
- Estado "sem rede": nenhuma das páginas abertas traz regra própria. É lacuna da pesquisa (02).

## 11. Movimento

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://atlassian.design/foundations/motion | sistema de design | Interações 50 a 150 ms; transições 150 a 400 ms (modal 250 ms); saída mais rápida que entrada. Com redução de movimento: "desligado e instantâneo". Os tokens estão em acesso antecipado. | - | consenso | 02 |
| https://carbondesignsystem.com/elements/motion/overview/ | sistema de design | Durações 70, 110, 150, 240, 400 e 700 ms. Movimento expressivo só para momentos raros. A mesma mensagem tem de poder ser dada de forma estática. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md | sistema de design | Durações de 50 a 1000 ms; quanto maior a área percorrida, maior a duração. Curva padrão `(0.2, 0, 0, 1)`. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/motion.json | sistema de design | Tornar o movimento opcional; não usá-lo como única forma de passar informação; evitar movimento em interações frequentes. | - | consenso | 02 |
| https://emilkowal.ski/ui/7-practical-animation-tips | blog de autor | Botão `scale(0.97)` ao pressionar; nunca sair de `scale(0)`; `ease-out` para entrar; interface abaixo de 300 ms; sem animação no que se vê muitas vezes ao dia. | - | opinião | 04 |
| https://www.nngroup.com/articles/animation-duration/ | artigo | Resposta simples ~100 ms; troca de tela 200 a 300 ms; movimento grande até 400 ms; sempre abaixo de 500 ms; entrada um pouco mais longa que saída. | - | moderada | 04 |
| https://www.joshwcomeau.com/animation/css-transitions/ | blog de autor | `ease-out` para entrar, `ease-in` para sair; nunca `transition: all`; `transform` e `opacity` são baratos; `transition: none` em `prefers-reduced-motion`. | - | consenso | 04 |
| https://www.nngroup.com/articles/microinteractions/ | artigo | Microinteração é gatilho mais resposta curta; deve ter propósito, ser sutil e consistente, e deixar o estado ativo distinto do padrão. | - | moderada | 04 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | documentação oficial | `reduce` pede menos movimento não essencial; trocar escala por esmaecer; a regra de reduzir vem depois da normal. Suporte amplo desde 01/2020. | - | robusta | 06, 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | norma | Critério 2.3.3 (AAA): animação disparada por interação deve poder ser desligada; mudar só cor ou opacidade não conta como movimento. | - | robusta | 06, 07 |
| https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API | documentação oficial | `element.animate(keyframes, opções)` devolve um objeto com `finished`. Dados de compatibilidade não foram achados na página. | - | robusta | 01 |
| https://developer.chrome.com/docs/web-platform/view-transitions/same-document | documentação oficial | `startViewTransition(callback)`; a página fica congelada enquanto o callback espera, então buscar dados antes. Tratar como enfeite. Chrome 111; no React, usar `flushSync`. Exemplos de duração: 90/210 ms (fade), 300 ms (slide). | - | robusta | 01, 05 |
| https://caniuse.com/view-transitions | documentação oficial | 93,17% de uso global; Chrome 111+, Safari 18+, Firefox 144+. Usar sempre com teste `if (document.startViewTransition)`. | - | robusta | 01 |
| https://caniuse.com/mdn-api_document_startviewtransition | documentação oficial | `document.startViewTransition`: Chrome 111+, Safari 18.0+, Firefox 144+, Firefox Android 160 (lido em 12/11/2026). | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style | documentação oficial | Entrada animada de `<dialog>` e popover só com CSS, com `transition-behavior: allow-discrete`. Baseline 2024. | - | robusta | 01 |
| https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API | documentação oficial | Duas formas: mesma página e entre páginas (`@view-transition`). Para movimento reduzido, pular a transição em JS ou encurtar os pseudo-elementos. | - | robusta | 01, 05 |
| https://webkit.org/blog/16301/webkit-features-in-safari-18-2/ | documentação oficial | Safari 18.2: transições entre documentos, eventos `pageswap` e `pagereveal`, classes e tipos de transição. | - | robusta | 05 |

O que isso diz para o app:
- Os três sistemas que publicam durações concordam: micro-interação de 50 a 150 ms, troca de tela de 150 a 400 ms, saída mais rápida que entrada, e movimento desligado quando a pessoa pede (02, 04).
- O que se repete dezenas de vezes (o registro da série) deve quase não ter animação (Kowalski, NN/g; opinião e moderada).
- View Transitions funciona no Chrome 111+, Safari 18+ e Firefox 144+; deve ser enfeite opcional. Se o `react-router-dom` do app tem o recurso, não foi conferido (01). Os valores de entrada de 800 ms do Krehel são de página de efeito, não de app de uso rápido (04).

## 12. Acessibilidade, leitura e toque

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | norma | Critério 2.5.8 (AA): alvo de pelo menos 24 x 24 px CSS, ou espaço (círculo de 24 px sem encostar em outro alvo). É piso, não meta. | - | robusta | 02, 04, 06, 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html | norma | Critério 2.5.5 (AAA): 44 x 44 px CSS. Não é obrigatório para o nível AA. | - | robusta | 02, 07 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json | sistema de design | Controle iOS: padrão 44 x 44 pt, mínimo 28 x 28 pt; cerca de 12 pt de respiro ao redor de elementos com contorno e 24 pt ao redor dos sem contorno. Permitir ampliar o texto em pelo menos 200%. | - | consenso | 02 |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json | sistema de design | Região de toque de pelo menos 44 x 44 pt; botão principal em largura total no app; dois botões lado a lado com a mesma altura; ação destrutiva nunca é a principal. | - | consenso | 02 |
| https://carbondesignsystem.com/components/button/usage/ | sistema de design | Um botão principal por página; 2 ou 3 botões por grupo, do mesmo tamanho; largura total só em diálogo, painel e cartão pequeno (máximo 320 px). | - | consenso | 02 |
| https://primer.style/product/components/button/ | sistema de design | Principal "com parcimônia", nunca mais de um num grupo; tamanho médio na maioria dos casos. | - | consenso | 02 |
| https://design-system.service.gov.uk/components/button/ | sistema de design | Um botão principal por página; texto em minúsculas descrevendo a ação; evitar botão desativado; proteger contra clique duplo. A página não traz altura. | - | consenso | 02 |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/TextField.md | sistema de design | Ícones no início e no fim do campo têm tamanho mínimo de 48 dp. | - | consenso | 02 |
| https://www.nngroup.com/articles/touch-target-size/ | artigo | Alvo de pelo menos 1 cm x 1 cm físico; contexto em movimento pede alvo maior; espaço não compensa alvo pequeno. | - | moderada | 04 |
| https://www.nngroup.com/articles/mobile-ux/ | artigo | Tela pequena: cada elemento novo empurra outro para fora; mostrar primeiro o essencial; alvos maiores e desfazer importante. | - | moderada | 06 |
| https://support.google.com/accessibility/android/answer/7101858 | documentação oficial | Alvos de pelo menos 48 dp (a página diz cerca de 9 mm), separados por 8 dp ou mais; a área de toque pode ser maior que o desenho. | - | consenso | 07 |
| https://www.telerik.com/docs/default-source/blogs-docs/parhi-mobilehci06-pdf | estudo | Parhi, Karlson e Bederson 2006, 20 pessoas: sem diferença de erro a partir de 9,6 mm (toque isolado) e 7,7 mm (sequência); recomendam 9,2 e 9,6 mm para o polegar. Aparelho de tela pequena, de 2006. | - | um estudo | 07 |
| https://www.uni-ulm.de/fileadmin/website_uni_ulm/iui.inst.100/institut/Papers/Prof_Rukzio/2010/SchildbachMobileHCI2010.pdf | estudo | Schildbach e Rukzio 2010, 16 pessoas: andando, 31% mais tempo para tocar, 23% mais erros; alvos 20% maiores melhoram e 40% maiores quase compensam. | - | um estudo | 07 |
| https://eprints.lancs.ac.uk/id/eprint/57576 | estudo | Henze, Rukzio e Boll 2011: 120.626.225 toques de 91.731 instalações; os toques são sistematicamente deslocados. Lido só o resumo oficial. | - | um estudo | 07 |
| https://di.ku.dk/english/news/2020/size-does-matter-people-with-longer-thumbs-mistype-on-their-phones-more-often/ | estudo | Notícia da Univ. de Copenhague (2020): 27 pessoas, 54.000 toques; polegar comprido explica 12% dos erros com uma mão, sobretudo embaixo e nos cantos de baixo. Não achei o artigo original. | - | um estudo | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html | norma | Critério 2.5.7 (AA): tudo que se faz arrastando também precisa de um jeito com um toque. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html | norma | Critério 1.4.4: texto redimensionável até 200% sem perder conteúdo nem função. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/reflow.html | norma | Critério 1.4.10: sem rolagem em duas direções a 320 px de largura. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html | norma | Critério 1.4.12: o conteúdo não pode quebrar com entrelinha 1,5x, parágrafo 2x, letra 0,12x e palavra 0,16x. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | norma | Critério 2.4.11: o item com foco não pode ficar escondido por barra fixa; solução com `scroll-padding`. | - | robusta | 07 |
| https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html | norma | Critério 3.2.6: se a ajuda aparece em várias páginas, fica na mesma posição relativa. | - | robusta | 07 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast | documentação oficial | Valores `more`, `less`, `custom`, `no-preference`; `custom` combina com `forced-colors: active`. Amplamente disponível desde 05/2022. | - | robusta | 07 |
| https://scholar.lib.ntnu.edu.tw/en/publications/the-effects-of-acute-exercise-on-cognitive-performance-a-meta-ana-2/ | estudo | Meta-análise Chang e outros 2012 (79 estudos): efeito geral pequeno e positivo (g = 0,097). Lido só o resumo oficial. | - | moderada | 07 |
| https://scholar.lib.ntnu.edu.tw/en/publications/effects-of-acute-exercise-on-cognitive-function-a-meta-review-of-/ | estudo | Meta-revisão Chang e outros 2025 (383 estudos, 18.347 pessoas): efeito pequeno a médio (SMD 0,33); atenção 0,37. O único moderador foi o momento do teste. Lido só o resumo oficial. | - | robusta | 07 |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC9732176 | estudo | Huang e outros 2022, musculação (19 estudos): 24 de 42 resultados positivos, nenhum negativo; testes entre 0 e 30 min depois; só tempo de reação em saudáveis. | - | moderada | 07 |

O que isso diz para o app:
- O WCAG AA pede só 24 px; 44 px é AAA e padrão da Apple. Estudos de toque em movimento (Schildbach, Parhi) apoiam alvos maiores, mas são de 2006 e 2010, com poucas pessoas, e não há estudo com mão suada ou pessoa cansada de exercício (07).
- Depois de exercício, a atenção e a decisão simples não pioram em média, mas os estudos são de laboratório, em saudáveis, uma tarefa por vez. "Menos decisões por vez" é prática de design, não resultado (07).
- Tudo que arrasta precisa de alternativa com um toque; a barra fixa não pode cobrir o campo em foco; o texto precisa crescer a 200% (WCAG, 07).
## 13. Acabamento e "cara de IA"

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://adriankrebs.ch/blog/design-slop/ | blog de autor | Levantamento de 500 páginas do Show HN: Inter em tudo, degradê, roxo, selo acima do título, cartões com ícone no topo, emoji em menu, vidro. 22% tinham 4 ou mais sinais; erro estimado pelo autor de 5 a 10%. | - | um estudo | 04 |
| https://hn.nuxt.dev/item/47864393 | Hacker News | Discussão do levantamento: tema escuro com texto cinza fraco, acento roxo e grade de cartões são os sinais citados. Contra-argumento: muitos já vinham de Tailwind UI e shadcn. | - | consenso | 04 |
| https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui | artigo | Sete sinais com cura: neon demais, brilho decorativo, emoji como interface, cartão dentro de cartão, barras laterais coloridas, pontinhos de status sem estado real. Uma cor dominante, um acento, um neutro. | - | consenso | 04 |
| https://www.saasui.design/blog/saas-ui-looks-ai-generated | artigo | Todo cartão com o mesmo peso, componente padrão, espaçamento uniforme sem ritmo, estados genéricos, sem ponto focal. Teste de apertar os olhos. A cifra "30 a 50%" do texto não tem fonte e foi ignorada. | - | consenso | 04 |
| https://trends.daisyui.com/how-to-make-ai-ui-less-generic/ | artigo | Definir escala-base de espaçamento (ex. 8 px), forma dos cantos, papéis de cor, acento raro e estados (hover, foco, ativo, desabilitado, vazio, erro), com revisão contra a escala. | - | consenso | 04 |
| https://builtin.com/articles/ai-design-slop-era | artigo | Teste: se não dá para dizer de qual produto é a tela sem o briefing, é genérica. Onboarding de 3 passos com pontinhos e erro educado que não explica são sinais. | - | opinião | 04 |
| https://jakub.kr/writing/details-that-make-interfaces-feel-better | blog de autor | Sombras em 3 camadas finas no lugar de borda (opacidades .06/.06/.04); contorno de 1 px a 10% em imagens; raio externo = raio interno + espaçamento. Valores de entrada de 800 ms são de página de efeito. | - | opinião | 04 |
| https://interfaces.rauno.me/ | blog de autor | Campos com 16 px ou mais; hover só em `@media (hover:hover)`; anel de foco que segue o raio; botão pressiona para ~0,96; sem animar o frequente. | - | opinião | 04 |
| https://vercel.com/design/guidelines | guia de equipe de produto | Alvo mínimo 24 px, 44 px no celular; só animar `transform` e `opacity`; títulos de peso 500 a 600; `tabular-nums` em relógios; unidade com espaço não separável; spinner só após 150 a 300 ms e visível ao menos 300 a 500 ms. | - | consenso | 04 |
| https://family.co/blog/family-values | loja ou site de produto | Declara "sweat the details, no matter how small". Sem números; só valor declarado. | - | opinião | 04 |
| https://benji.org/family-values | blog de autor | Rótulo de botão que se transforma (Continuar vira Confirmar); contadores que atualizam no lugar; cada transição justificada pela navegação. Sem durações publicadas. | - | opinião | 04 |
| https://www.raycast.com/blog/a-fresh-look-and-feel | guia de equipe de produto | Ícones redesenhados com o mesmo traço e os mesmos raios; princípios curtos (rápido, simples, agradável). | - | opinião | 04 |
| https://linear.app/now/how-we-redesigned-the-linear-ui | guia de equipe de produto | Alinhamento vertical e horizontal de rótulo, ícone e botão; tema gerado por 3 entradas (base, acento, contraste) em LCH; escopo travado em visual. | - | opinião | 04 |
| https://www.joshwcomeau.com/css/designing-shadows/ | blog de autor | Sombra com o matiz do fundo, não preto puro; uma só direção de luz; sombra em camadas custa render e não deve ser animada. | - | opinião | 04 |
| https://developer.apple.com/design/awards/2024 | documentação oficial | Página do prêmio sobre o Gentler Streak: a visão mensal compara você com o seu histórico; "linguagem visual sutil e consistentemente agradável"; sem lembretes insistentes. | - | consenso | 03 |
| https://mobbin.com/ | galeria | A página inicial mostra a proposta e planos; a página de categoria de saúde deu 403 e o que o visitante anônimo vê não foi conferido. Sem padrão tirável. | - | consenso | 06 |
| https://pttrns.com/ | galeria | Blog, banco de apps e coleções; exige conta para acesso completo. Sem categoria de saúde ou temporizador visível. | - | consenso | 06 |
| https://screensdesign.com/ | galeria | Cartões de apps, 30 categorias, artigos e guias sem login; categorias como "3-day split workout apps" e "advanced bodybuilding apps". | - | consenso | 06 |

O que isso diz para o app:
- "Cara de IA" é a soma de escolhas padrão (degradê roxo, selo acima do título, cartões iguais com ícone, emoji como ícone, cartão dentro de cartão, tudo com o mesmo peso). A cura é decidir: uma cor de destaque, um ponto focal por tela, uma ação principal (04). Serve como lista de revisão, não como prova; o Hacker News mostra que parte desses padrões já era comum antes da IA.
- O levantamento de Krebs é de autor único e o método foi questionado; o que sobra de mais firme é o conjunto de estados (vazio, erro, carregando, foco, pressionado) tratados com o mesmo cuidado que a tela feliz (04, opinião).
- As galerias públicas mostram pouco sem conta; o que serviu foram os artigos e as categorias abertas (06).

## 14. PWA com cara de app nativo

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://webkit.org/blog/7929/designing-websites-for-iphone-x/ | documentação oficial | Com `viewport-fit=cover` a página ocupa a tela toda e a folga vem de `env(safe-area-inset-*)`. Em paisagem, `max(12px, env(safe-area-inset-left))`. iOS 11.2. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/env | documentação oficial | `env(safe-area-inset-bottom)` vale 0 onde nada ocupa a borda; barra fixa com `padding: 1em 1em calc(1em + env(safe-area-inset-bottom))`. Baseline desde 01/2020. | - | robusta | 05 |
| https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html | documentação oficial | Documento de 2014: `apple-mobile-web-app-capable` abre sem as barras do Safari; `black-translucent` deixa o conteúdo sob a barra de status e exige `env(safe-area-inset-top)`. | - | robusta | 05 |
| https://web.dev/blog/viewport-units | documentação oficial | `svh` cabe sempre, `lvh` é com a barra recolhida, `dvh` acompanha. O teclado não muda essas unidades. Firefox 101, Safari 15.4, Chrome 108. | - | robusta | 05 |
| https://developer.chrome.com/blog/viewport-resize-behavior | documentação oficial | `interactive-widget=resizes-visual` é o padrão no Chrome Android 108+; o Safari do iPhone só muda a viewport visual; não vale no Chrome do iOS. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport | documentação oficial | Para manter barra fixa acima do teclado, ouvir `visualViewport.resize` e `scroll` e mover com `transform`. A MDN avisa que pode piscar. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API | documentação oficial | `overlaysContent` e `env(keyboard-inset-height)`; disponibilidade limitada, suporte por navegador não conferido. | - | robusta | 05 |
| https://dev.to/cederhook/fixing-the-ios-standalone-pwa-keyboard-bug-that-shrinks-your-viewport-for-good-63d | blog de autor | No iPhone instalado, a altura encolhe depois do primeiro teclado e não volta (ex.: 932 para 873), deixando a barra de baixo ~59 px alta demais. Testado no iOS 17 e 18. | - | opinião | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior | documentação oficial | `contain` impede a rolagem de vazar para a página de trás; `none` também tira o efeito elástico e o puxar-para-recarregar. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action | documentação oficial | `touch-action: manipulation` desliga o toque duplo para zoom e o atraso do clique. Baseline desde 09/2019. | - | robusta | 05 |
| https://webkit.org/blog/5610/more-responsive-tapping-on-ios/ | documentação oficial | O atraso de ~350 ms some com `width=device-width`, `user-scalable=no` ou `touch-action: manipulation`. iOS 9.3. | - | robusta | 05 |
| https://developer.chrome.com/blog/300ms-tap-delay-gone-away | documentação oficial | Atraso de 300 a 350 ms removido a partir do Chrome 32 (2014) com `width=device-width`; iOS 9.3 em março de 2016. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color | documentação oficial | `transparent` tira o realce do toque; é não padrão. Se tirar, dar outro retorno visível (estado pressionado). | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/user-select | documentação oficial | `-webkit-user-select: none; user-select: none` em botões e controles, não em texto que a pessoa pode querer copiar. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout | documentação oficial | `-webkit-touch-callout: none` desliga o menu ao segurar um link ou imagem no iOS. Não padrão. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display | documentação oficial | `"display": "standalone"` com queda para `minimal-ui` e `browser`; `@media (display-mode: standalone)` estiliza só o instalado. | - | robusta | 05 |
| https://firt.dev/notes/pwa-ios/ | blog de autor | Nota de especialista, atualizada em 13/10/2026: no iPhone `display` vale só `browser` e `standalone`; ícones `maskable` e `monochrome` são ignorados; sem `beforeinstallprompt`; Wake Lock desde 16.4; push só em app instalado; vibração não existe. | - | moderada | 05 |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color | documentação oficial | Um `theme-color` para claro e outro para escuro com `media="(prefers-color-scheme: ...)"`. | - | robusta | 05 |
| https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Define_app_icons | documentação oficial | Ícones de 192 e 512 px em PNG; `purpose: "maskable"` é um ícone próprio. | - | robusta | 05 |
| https://web.dev/articles/maskable-icon | documentação oficial | Zona segura: círculo central de raio 40% da largura; fundo opaco; não usar `"any maskable"` no mesmo ícone. | - | robusta | 05 |
| https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-in-safari-26-beta/ | documentação oficial | Safari 26: todo site adicionado à tela de início abre como app web por padrão; ícones SVG aceitos. Fonte é o post do beta. | - | robusta | 05 |
| https://web.dev/articles/inp | documentação oficial | INP bom é 200 ms ou menos (percentil 75); dar retorno visual no próximo quadro mesmo se o resultado demora. | - | robusta | 05 |
| https://web.dev/articles/cls | documentação oficial | CLS bom é 0,1 ou menos; causas: imagem sem dimensão, fonte que muda ao trocar, conteúdo inserido acima; animar com `transform`. | - | robusta | 05 |
| https://web.dev/articles/font-best-practices | documentação oficial | `font-display: swap` ou `optional`; `size-adjust` na fonte de reserva reduz o salto; servir só WOFF2; embutir `@font-face` no `<head>` costuma ser melhor que `preload`. | - | robusta | 05 |
| https://developer.chrome.com/docs/web-platform/prerender-pages | documentação oficial | Speculation Rules (`prefetch`, `prerender`); Chrome e Edge sim, Firefox parcial, Safari atrás de opção desligada. Não serve para app de página única com rotas internas. | - | robusta | 05 |
| https://web.dev/case-studies/twitter | guia de equipe de produto | Twitter Lite: app shell do cache e código dividido por rota; 600 KB contra 23,5 MB do app nativo; depois do convite de instalação, 250 mil usuários únicos por dia abrem pelo ícone. Dados da própria empresa. | - | moderada | 05 |
| https://web.dev/articles/customize-install | documentação oficial | No Chrome: guardar `beforeinstallprompt`, mostrar botão próprio e chamar `prompt()` uma vez por evento; detectar modo com `display-mode: standalone` e `navigator.standalone` no iOS. | - | robusta | 05 |
| https://web.dev/articles/define-install-strategy | documentação oficial | Mostrar o convite depois de uma ação significativa; guardar dispensas; não empurrar a quem recusou; sempre deixar um caminho de instalação. | - | moderada | 05 |

O que isso diz para o app:
- O que mais denuncia o "site" é o conjunto de toque e gestos: realce azul, atraso de toque, seleção de texto nos botões, puxar para recarregar, tela que pula com o teclado. Cada ponto tem conserto simples e documentado (05).
- No iPhone não há vibração, não há convite automático de instalação, e o aviso com o app fechado só vem por push de servidor, o que quebra o "tudo no aparelho" do projeto. Wake Lock funciona (05).
- Os números de versão novos (iOS 26 e 27, Chrome 157 a 163) vêm do caniuse e do firt.dev e não têm segunda fonte; testar em aparelho real (05).

## 15. Bibliotecas, ícones e letras (código e licenças)

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo | Origem |
|---|---|---|---|---|---|
| https://www.radix-ui.com/primitives/docs/overview/introduction | documentação oficial | Cada peça se instala separada, sem estilo, com padrões WAI-ARIA. Medido: Dialog 14,2 kB min+gzip; Tabs 9,7; Toggle Group 9,0; Toast 12,7. | MIT (Registro) | moderada | 01 |
| https://www.radix-ui.com/primitives/docs/components/dialog | documentação oficial | Foco preso, Esc fecha e devolve o foco, `Title` e `Description` para leitor de tela. Não explica animação de saída. | MIT (Registro) | moderada | 01 |
| https://react-aria.adobe.com/NumberField | documentação oficial | Campo numérico com `increment`/`decrement`, `step`, mín/máx e formatação por idioma. Medido: 26,2 kB via Components, 19,1 kB só com o hook. Pacote inteiro 279 kB (Bundlephobia). | Apache-2.0 (Registro) | moderada | 01 |
| https://base-ui.com/react/overview/quick-start | documentação oficial | Pacote único importado por subcaminho, sem estilo; linha 1.9.0. Medido: Dialog 24,1 kB; Number Field 14,2; Tabs 13,9; Toast 26,9. | MIT (Registro) | moderada | 01 |
| https://base-ui.com/react/components/number-field | documentação oficial | Botões de mais e menos, `step` pequeno (Alt) e grande (Shift), mín/máx e formatação por idioma. Toque-e-segura: a página não diz. | MIT (Registro) | moderada | 01 |
| https://base-ui.com/react/components/toast | documentação oficial | Toast que desliza para sair, auto-fecha em 5 s, limite de 3 na tela, região de foco com F6. | MIT (Registro) | moderada | 01 |
| https://headlessui.com/ | documentação oficial | Dialog, Tabs, Radio Group, Switch etc. Não tem campo numérico, toast nem folha de baixo. Pacote inteiro 63 kB (Bundlephobia). | MIT (Registro) | moderada | 01 |
| https://www.npmjs.com/package/@ark-ui/react | repositório ou registro de pacote | Ark UI v5.40.0 (29/10/2026) tem 69 dependências (Zag.js); pacote inteiro 297 kB. Só dados do registro e do Bundlephobia; a documentação deu 404. | MIT | moderada | 01 |
| https://sonner.emilkowal.ski/ | documentação oficial | `<Toaster />` na raiz e `toast('texto')` em qualquer lugar; 9,6 kB medido (v2.0.8). Reserva para aviso temporário. | MIT (Registro) | consenso | 01 |
| https://github.com/emilkowalski/vaul | repositório ou registro de pacote | Biblioteca de "drawer" (cerca de 8,7 mil estrelas). O dono escreveu "This repo is unmaintained"; última versão 1.1.2 em 14/12/2024; 22,4 kB medido. | MIT | moderada | 01 |
| https://motion.dev/docs/react-reduce-bundle-size | documentação oficial | Componente `motion` 43 kB (valor da página); `LazyMotion` +24 ou +38 kB; `useAnimate` mini 3,3 kB. Medido: `animate` mini 3,3 kB, híbrido 26,4 kB. | MIT (Repo) | moderada | 01 |
| https://motion.dev/docs/animate | documentação oficial | `animate()` mini 3,2 kB e híbrido 22 kB; o mini usa "APIs nativas". | MIT (Repo) | moderada | 01 |
| https://github.com/motiondivision/motion | repositório ou registro de pacote | 35 mil estrelas, mantido por patrocínio, versão 14.13.0 de 12/11/2026. Pacote `motion` inteiro 64 kB (Bundlephobia). | MIT | moderada | 01 |
| https://github.com/leeoniya/uPlot | repositório ou registro de pacote | Canvas 2D, 23,0 kB medido. Sem animação, sem toque embutido, sem texto de acessibilidade. Última versão 1.6.32 (14/03/2025). | MIT | moderada | 01 |
| https://github.com/airbnb/visx | repositório ou registro de pacote | Peças soltas de gráfico (v4 estável, exige React 18 ou 19). `LinePath` + `scaleLinear` 14,8 kB medido; `d3-shape` só `line` e `curveMonotoneX` 3,9 kB. | MIT | moderada | 01 |
| https://www.npmjs.com/package/recharts | repositório ou registro de pacote | Recharts v3.10.1: 150 kB (Bundlephobia); grande demais para poucos pontos. Só dados de registro. | MIT | moderada | 01 |
| https://www.npmjs.com/package/chart.js | repositório ou registro de pacote | Chart.js v4.6.1: 69,6 kB, canvas. Só dados de registro. | MIT | moderada | 01 |
| https://www.npmjs.com/package/@observablehq/plot | repositório ou registro de pacote | Plot 0.6.19: feito para análise de dados, 127 kB. Só dados de registro. | ISC | moderada | 01 |
| https://www.npmjs.com/package/chartist | repositório ou registro de pacote | Chartist 2.2.0, SVG, 27 kB. Licença dupla "MIT OR WTFPL"; só serve pela opção MIT. Só dados de registro. | MIT OR WTFPL | moderada | 01 |
| https://github.com/lucide-icons/lucide | repositório ou registro de pacote | Cada ícone é um componente e só os importados entram; traço ajustável. 6 ícones: 2,3 kB medido. O README diz 1600+ e a lateral 2000+ (não bate). Versão 1.72.0. | ISC | moderada | 01 |
| https://lucide.dev/guide/packages/lucide-react | documentação oficial | "Only the icons you import are included." Pacote inteiro 211 kB (Bundlephobia), que só importa sem tree-shaking. | ISC | moderada | 01 |
| https://github.com/tabler/tabler-icons | repositório ou registro de pacote | 6.287 ícones, grade 24x24, traço 2 px; SVG avulso em `icons/outline/nome.svg`. 6 ícones: 1,0 kB medido. Versão 3.51.0. | MIT | moderada | 01 |
| https://github.com/tailwindlabs/heroicons | repositório ou registro de pacote | Estilos 24 contorno, 24 sólido, 20 sólido, 16 sólido. Última versão 2.2.0 (18/11/2024), pouco ativa. 6 ícones: 0,7 kB medido. | MIT | moderada | 01 |
| https://github.com/phosphor-icons/react | repositório ou registro de pacote | Seis pesos (thin a duotone). 6 ícones: 2,9 kB medido; pacote inteiro 1.065 kB. Última versão 2.1.10 (22/05/2025). | MIT | moderada | 01 |
| https://github.com/iconoir-icons/iconoir | repositório ou registro de pacote | 1.383 ícones, pacote `iconoir-react` 7.12.2. 6 ícones: 1,2 kB medido. | MIT | moderada | 01 |
| https://github.com/google/material-design-icons | repositório ou registro de pacote | Material Symbols com eixos variáveis (peso, preenchimento, grade, tamanho óptico). A página não ensina baixar SVG avulso. Peso não medido. | Apache-2.0 | moderada | 01 |
| https://github.com/Remix-Design/RemixIcon | repositório ou registro de pacote | 3.200+ ícones, 501 kB inteiro. Licença própria "Remix Icon License v1.0", fora da lista MIT/Apache/ISC/BSD. | Remix Icon License 1.0 | moderada | 01 |
| https://cdn.jsdelivr.net/npm/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2 | repositório ou registro de pacote | Pacote Fontsource recortado em latim; woff2 variável medido: Figtree 20,2 kB, Manrope 24,8, Public Sans 26,8, Geist 29,4, Instrument Sans 30,1, Atkinson Hyperlegible Next 34,0 (a atual do app), Hanken Grotesk 34,7, IBM Plex Sans 45,7, Schibsted Grotesk 46,8, Inter 48,3. Têm `tnum` (no recorte): Figtree, Manrope, Public Sans, Geist, Instrument Sans, Atkinson Next, Schibsted, Inter; não têm: Hanken, IBM Plex, DM Sans. Os outros endereços do arquivo 01 vêm abreviados. | OFL-1.1 | moderada | 01 |
| https://github.com/vercel/geist-font | repositório ou registro de pacote | A página confirma OFL-1.1 e não fala de números nem de idiomas. | OFL-1.1 | moderada | 01 |
| https://github.com/rsms/inter | repositório ou registro de pacote | Variável, números tabulares e zero cortado listados; desenhada para tela. Nome reservado "Inter". | OFL-1.1 | moderada | 01 |
| https://github.com/googlefonts/atkinson-hyperlegible | repositório ou registro de pacote | Fonte original (4 estilos) desenhada para baixa visão, separando 1, L, l, I e O, 0. O README não descreve teste, não cita a versão Next e foi arquivado em 19/04/2026. | OFL 1.1 | consenso | 07 |
| https://github.com/LiamMorrow/LiftLog | repositório ou registro de pacote | App que guarda os treinos só no aparelho, sem cadastro, com Material 3. Serve de princípio; não copiar código. | AGPL-3.0 | consenso | 01 |
| https://github.com/Snouzy/workout-cool | repositório ou registro de pacote | Web com shadcn/ui, Radix UI e Tailwind (8,7 mil estrelas). Princípio: peças Radix sob um visual próprio. Pacotes grandes. | MIT | consenso | 01 |
| https://github.com/wger-project/wger | repositório ou registro de pacote | Django, 9.835 commits. Dados de exercícios com licença Creative Commons por entrada. Serve de princípio. | AGPL-3.0-or-later (dados em CC) | consenso | 01 |
| https://f-droid.org/en/packages/com.noahjutz.gymroutines/ | loja ou site de produto | GymRoutines: tudo local, sem internet, exporta dados durante o treino (v0.1.1, 22/04/2025). Princípio: nunca depender de rede no meio do treino. | GPL-3.0-or-later | consenso | 01 |
| https://github.com/johannesjo/super-productivity | repositório ou registro de pacote | "Privado, offline-first, código aberto", 23,6 mil estrelas. A página não confirma o status de PWA. | MIT | consenso | 01 |
| https://github.com/myshov/awesome-mobile-web-development | repositório ou registro de pacote | Lista com seções Touch, Gestures e Performance. Boa parte do conteúdo é antigo. Licença não conferida. | - | consenso | 01 |
| https://github.com/hemanth/awesome-pwa | repositório ou registro de pacote | Lista com checklist de PWA, apps por categoria e casos de estudo. Licença não conferida. | - | consenso | 01 |

O que isso diz para o app:
- O limite é de 175 kB na 1ª tela, com cerca de 170 kB já usados; qualquer biblioteca com mais de uns 5 kB só entra sob demanda (01). Por isso a indicação da pesquisa 01 é escrever à mão a folha, o campo de carga, o aviso temporário e o gráfico, e usar o que o navegador já tem (`<dialog>`, CSS, Web Animations).
- Ícones: copiar só os usados de Lucide (ISC) ou Tabler (MIT), guardando o aviso de licença. Remix Icon tem licença própria e fica fora; Vaul não é mantida (01).
- Letras: Figtree (20 kB), Geist (29 kB) e Atkinson Next (34 kB) são variáveis e OFL, com números tabulares no recorte medido. Escolher por teste visual dos números em tamanho grande, não só pela tabela (01; a escolha entre elas é opinião).
- Os apps abertos de treino são AGPL ou GPL: servem para aprender princípios, nunca para copiar código ou tela (01).

## Onde as fontes discordam do pedido

(a) O espaço de 12 tem apoio em vários sistemas, e o pedido manda tirá-lo da escala. O arquivo 02 (seção 4) mostra o 12 em Radix (passo 3), Atlassian (`space.150`, "botões, espaço entre elementos do cartão"), Carbon (`spacing-04`), Primer, no raio médio do Material (12 dp) e como respiro de cerca de 12 pt ao redor de botões com contorno na Apple. A conclusão do 02 é "o mais sólido dos extras: aceitar 12 como token" (opinião do pesquisador). Só o GOV.UK usa outra base (5 px). Se o sistema novo tira o 12, será decisão de projeto, sem apoio nas fontes.

(b) A regra "raio interno = raio externo menos o respiro" não aparece em sistema de design aberto. O 02 (seção 2.6) diz que nenhuma fonte aberta a enuncia; a única relação em números é o anel de foco da Atlassian (raio do anel = raio do elemento + 2 px). A regra aparece só em blogs de autor: Jakub Krehel, na forma "raio externo = raio interno + espaçamento" (04, marcada como opinião). Nota: o 04 diz que ela coincide com "o consenso de aninhamento", mas o 02 não achou esse consenso nos sistemas.

(c) Alturas de botão de 56 e 64 não aparecem nos sistemas. O 02 (seção 4) acha 48 como o comum (Primer "XL", Carbon, Material 48 dp para ícones de campo); o 64 só como altura da barra de baixo expressiva do Material, e o 56 só como largura do indicador da barra. O 02 diz que 56 e 64 "ficam como escolha de projeto". Em sentido oposto, o 07 (seção "O que isso muda no desenho", item 11) apoia alvos maiores em estudos de toque: Parhi 2006 recomenda 9,2 a 9,6 mm (cerca de 58 a 60 px de CSS, conta do pesquisador) e Schildbach 2010 mostra que alvos 20 a 40% maiores compensam o andar. Ressalvas do próprio 07: aparelho pequeno de 2006, 16 a 20 pessoas, nenhuma fonte com mão suada ou pessoa cansada, e a conversão de px para mm (0,16 mm por px) não foi reconferida; a página do Google diz que 48 dp são cerca de 9 mm e a conta de 160 dpi daria cerca de 7,6 mm.

(d) O nível AA da WCAG pede só 24 px de alvo; 44 é AAA e padrão da Apple. Conferido no 02 (seção 2.3): critério 2.5.8 (AA) com 24 x 24 px CSS, critério 2.5.5 (AAA) com 44 x 44 px, Apple com padrão de 44 pt e mínimo de 28 pt, Material com 48 dp. O 06 anota que a regra de 44 px do projeto é mais exigente que a norma; o 07 chama os 24 px de "piso, não meta". Ou seja, 44 se sustenta como escolha do projeto e da Apple, não como exigência da WCAG AA.

(e) Não há estudo publicado sobre a letra Atkinson Hyperlegible. O 07 (seções 3 e "Não consegui abrir") não achou estudo com resultados: o repositório oficial da Google Fonts só descreve o desenho (separar 1, L, l, I e O, 0), não cita testes, não cita a versão Next e está arquivado desde 19/04/2026; a palestra do CSUN 2024 anuncia "estudo quantitativo" sem amostra nem números; a página do Braille Institute não abriu (07 e 01). O que tem apoio é a ideia geral de que letras mais largas e formas distintas ajudam (Beier e Larson 2010). O 01 mantém a Atkinson Next como a fonte atual do app e deixa a escolha como opinião.

Outros pontos em que as fontes se contradizem ou ficam abaixo do pedido:
- Tema escuro: a Apple (02) desaconselha opção de tema própria do app e o Material pede cinza escuro e não preto; o 07 recomenda seguir o sistema e deixar a pessoa trocar à mão, com o claro como opção mais segura sob luz forte. O 03 lembra que o fundo escuro combina com uso à noite. Nenhum estudo mediu academia com sol (07).
- Validação de campo: Primer prefere ao enviar ou ao sair do campo, Carbon recomenda em tempo real (02).
- Esqueleto: o 02 sugere nenhum esqueleto em tela local, enquanto o 05 lista como lacuna a falta de um esqueleto com o tamanho do conteúdo; nenhuma fonte aberta mediu esqueleto contra indicador.
- Anel contra barra de progresso: a NN/g desencoraja medidores radiais, mas a evidência é mista (06, só o resumo da busca).
- Vibração como canal de aviso: o 07 pede três canais (visual, som e vibração), mas o 05 mostra que não existe vibração na web do iPhone, então ela não pode ser o único canal.
- Texto mínimo: os sistemas aceitam 11 a 12 (Apple, Material, Atlassian, Carbon, 02), enquanto o 07 pede 16 para o que se lê parado e relógio grande; é decisão de projeto.

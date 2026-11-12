# Pesquisa 06: números, gráficos pequenos e galerias de interface de celular

(Rascunho em andamento. Referências conferidas até agora: 15.)

## Referências já abertas e conferidas

| Endereço | Tipo | Regra ou padrão | Selo |
|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric | documentação | tabular-nums (tnum) dá largura igual aos dígitos; lining-nums alinha na linha de base; slashed-zero risca o zero; só funciona se a fonte tiver o recurso; combina-se (`lining-nums tabular-nums`). | robusta |
| https://practicaltypography.com/alternate-figures.html | livro de tipografia | Tabular para grades e tabelas, proporcional para texto corrido; lining serve em qualquer contexto; a escolha tabular/proporcional é independente de lining/old-style. | opinião (Butterick) |
| https://type.today/en/journal/numerals | texto de tipografia | Tabular para preços e tabelas; evitar old-style proporcional em tabelas; slashed zero ajuda a separar 0 de O. | consenso |
| https://data.europa.eu/apps/data-visualisation-guide/fonts-for-numbers | guia de dataviz (UE) | Usar números lining e tabulares em visualização; teste: "111111" sobre "666666" devem ter a mesma largura. | consenso |
| https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | norma | 1.4.11: partes do gráfico necessárias para entender precisam de 3:1 contra o fundo; 2,999:1 não passa; linhas não precisam contrastar entre si se raramente se cruzam. | robusta |
| https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | norma | 1.4.1: cor não pode ser o único meio de informar; gráfico só por cor reprova; texto ou número ao lado resolve. | robusta |
| https://www.datawrapper.de/blog/line-charts | blog de dataviz | Rótulo escrito à mão junto da linha, na cor dela; cinza para o resto; símbolos nos pontos só quando há poucas linhas e datas; com poucos valores, coluna costuma comparar melhor; eixo não precisa começar em zero. | consenso |
| https://www.vis4.net/blog/doing-the-line-charts-right/ | blog de dataviz | Sem legenda separada, rótulo perto da linha; destacar 1 ou 2 linhas; mais de 5 a 7 linhas é demais. | opinião (Lisa Charlotte Muth/Gregor Aisch, autor do blog) |
| https://data.europa.eu/apps/data-visualisation-guide/labels-and-marks | guia de dataviz (UE) | Rótulo direto em vez de legenda; marcadores só no primeiro e último ponto, máximo e mínimo; 5 a 10 rótulos de tempo; em tela estreita abreviar (mês curto, 2 dígitos). | consenso |
| https://www.datawrapper.de/blog/what-to-consider-when-creating-small-multiple-line-charts | blog de dataviz | Menos painéis do que se planejou; mesmo eixo y entre painéis; na tela do celular, se rolar demais, são painéis demais. | consenso |
| https://carbondesignsystem.com/data-visualization/chart-anatomy/ | sistema de design | Rotular direto no gráfico quando possível; não encher o quadro de elementos; fatias de pizza pequenas precisam de tabela. | consenso |
| https://carbondesignsystem.com/data-visualization/color-palettes/ | sistema de design | Paleta de gráfico com versões claro e escuro; escalas sequenciais invertem no escuro (o mais claro marca o maior valor); alerta em vermelho/laranja/amarelo/verde. | consenso |
| https://service-manual.ons.gov.uk/data-visualisation/ | guia de governo (UK) | Só índice: guia, tipos de gráfico, cores, especificações. Não li as subpáginas ainda. | só o índice |
| https://www.nngroup.com/articles/mobile-ux/ | Nielsen Norman | Tela pequena: cada elemento novo empurra outro para fora; mostrar o essencial primeiro; alvos de toque maiores e desfazer importante. | consenso |
| https://developer.mozilla.org/en-US/docs/Web/CSS/prefers-reduced-motion | (a conferir) | -- | -- |

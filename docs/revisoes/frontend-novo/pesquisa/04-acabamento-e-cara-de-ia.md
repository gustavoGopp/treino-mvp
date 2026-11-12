# Pesquisa 04: acabamento e "cara de IA"

Data: 12/11/2026. Só páginas públicas que abriram de fato. Selos: robusta, moderada, um estudo, consenso, opinião (de quem). Nada aqui é copiado de marca de terceiros: serve para aprender o princípio.

Nota sobre as fontes da pesquisa anterior: as seções "Fontes" de agente-4, agente-5 e agente-6 não têm endereços que eu conseguisse extrair por busca de texto; por isso não pude excluir endereços repetidos automaticamente. Nenhum dos endereços abaixo é de uso óbvio nelas, mas confira se algum coincide.

## 1. Em 10 linhas

1. O "cara de IA" não é um defeito único: é a soma de escolhas padrão (degradê roxo, selo acima do título, cartões iguais com ícone, emoji como ícone, cartão dentro de cartão, tudo com o mesmo peso). Um levantamento de 500 páginas do Show HN (Adrian Krebs) usou 15 a 18 desses sinais como teste.
2. A cura é decidir: uma cor de destaque, um foco por tela, uma ação principal. O que não tem função some.
3. Hierarquia vem de peso, cor e espaço, não de tamanho: no máximo 3 tamanhos de texto (NN/g) e peso entre 500 e 600 em títulos (Vercel).
4. Agrupe por proximidade, não por caixas e linhas. Espaço pequeno entre itens ligados, espaço maior entre grupos.
5. Números que mudam (relógio de descanso, carga, repetições) precisam de `font-variant-numeric: tabular-nums`, senão o relógio "dança".
6. Títulos: `text-wrap: balance`; texto corrido: `text-wrap: pretty`. Acaba a palavra órfã sem esforço.
7. Cantos aninhados: raio externo = raio interno + espaçamento. Sombra em camadas finas e de baixa opacidade, com a mesma direção de luz, no lugar de borda grossa.
8. Toque: reação imediata ao pressionar (escala 0,96 a 0,97), alvo mínimo de 44 px no celular, ao menos 16 px nos campos para o iOS não dar zoom.
9. Movimento: curto (100 ms para resposta simples, 200 a 300 ms para troca de tela, nunca mais de 500 ms), `ease-out` para entrar, só `transform` e `opacity`, e quase nada para o que se repete dezenas de vezes (o registro de série).
10. O que separa um app profissional de um genérico é o conjunto de estados (vazio, erro, carregando, foco, pressionado) tratados com o mesmo cuidado que a tela feliz.

## 2. Tabelas por assunto

Observação: X (Twitter) e Reddit não abriram (ver seção 5). Os autores do X têm o conteúdo em blog próprio, que está nas tabelas.

### 2.1 Sinais de "cara de IA" e como tirá-los

| Endereço | Tipo | Autor/equipe | Princípio aproveitado | Selo |
|---|---|---|---|---|
| https://adriankrebs.ch/blog/design-slop/ | blog (levantamento) | Adrian Krebs | Mediu padrões por regra de CSS/DOM em 500 páginas do Show HN. Sinais: Inter em tudo, degradê, roxo, selo acima do título, cartões com ícone no topo, borda colorida no topo ou na esquerda do cartão, passos numerados 1-2-3, faixa de estatísticas, emoji em menu, caixa-alta em rótulos, brilho colorido, vidro (glassmorphism). 22% das páginas tinham 4 ou mais sinais. Erro estimado pelo autor: 5 a 10%. | um estudo (autor único, método próprio) |
| https://hn.nuxt.dev/item/47864393 | Hacker News (espelho) | comentaristas | Discussão do levantamento acima: tema escuro com texto cinza de baixo contraste, acento roxo, borda colorida à esquerda e grade de cartões com ícone são os sinais citados. Contra-argumento: muitos já vinham de Tailwind UI e shadcn; o problema real é pouca decisão. | consenso (com divergência registrada) |
| https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui | blog | The Fountain Institute | Sete sinais com cura: neon demais (use uma cor dominante, um acento e um neutro), brilho decorativo (use profundidade por tipografia e superfície), emoji como interface, roxo em tudo, cartão dentro de cartão (agrupe com espaço e proximidade; cartão só para o que se age de forma independente), barras laterais coloridas, pontinhos de status sem estado real. | consenso |
| https://www.saasui.design/blog/saas-ui-looks-ai-generated | blog | saasui.design | Sete sinais: todo cartão com o mesmo peso (um número herói por tela), componente padrão (personalize 3 ou 4 primitivos), espaçamento uniforme sem ritmo (itens ligados juntos, grupos separados), estados vazio/erro/carregando genéricos, texto de exemplo, sem ponto focal (uma ação primária por tela). Teste do "apertar os olhos". A cifra "30 a 50% de prêmio" do texto não tem fonte; ignorar. | consenso |
| https://trends.daisyui.com/how-to-make-ai-ui-less-generic/ | blog | daisyUI | Defina escala-base de espaçamento (ex. 8 px), forma dos cantos, papéis das cores (superfície, ação, texto suave, borda, sucesso, erro), acento raro, estados (hover, foco, ativo, desabilitado, vazio, erro) e uma etapa de revisão contra a escala. | consenso |
| https://builtin.com/articles/ai-design-slop-era | artigo | Built In | Teste: se não dá para dizer de qual produto é a tela sem o briefing, é genérica. Sinais: onboarding de 3 passos com pontinhos, estado vazio com ilustração e duas linhas vagas, erro educado que não explica, gráfico de rosca no canto. Cura: ponto de vista sobre o produto específico. | opinião (autor do artigo) |

### 2.2 Acabamento (polish, craft, detalhes)

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://jakub.kr/writing/details-that-make-interfaces-feel-better | blog | Jakub Krehel | Sombras em 3 camadas no lugar de borda: `0 0 0 1px rgba(0,0,0,.06)`, `0 1px 2px -1px rgba(0,0,0,.06)`, `0 2px 4px rgba(0,0,0,.04)`; no hover sobem para .08/.08/.06; no escuro, anel de `rgba(255,255,255,.08)`. Imagens com contorno de 1 px a 10% de opacidade e `outline-offset:-1px`. Raio externo = raio interno + espaçamento. | opinião (Krehel; coincide com o consenso de aninhamento) |
| https://interfaces.rauno.me/ | guia | Rauno Freiberg | Campos com 16 px ou mais; hover só dentro de `@media (hover:hover)`; anel de foco com `box-shadow` para seguir o raio; ao menos ~200 ms nas animações de interação; botão pressiona para ~0,96; sem animar o que é frequente. | opinião (Freiberg) |
| https://vercel.com/design/guidelines | guia | Vercel | Alvo mínimo 24 px, 44 px no celular; só animar `transform` e `opacity`; nunca `transition: all`; `:focus-visible` e anel nunca coberto por cabeçalho fixo; contraste sobe em hover/ativo/foco; aspas curvas, reticências de um caractere, unidade com espaço não separável (`10&nbsp;MB`); spinner só após ~150 a 300 ms e visível por pelo menos ~300 a 500 ms. | consenso (guia de equipe) |
| https://family.co/blog/family-values | página de produto | Family (carteira) | Declara "sweat the details" e animação suave entre estados. Sem números. Só valor declarado. | opinião (equipe do produto) |
| https://benji.org/family-values | blog | Benji Taylor | Rótulo de botão que se transforma (Continuar vira Confirmar) em vez de trocar; contadores e rótulos que atualizam no lugar; componente que persiste entre telas não duplica; separador de milhar se move enquanto digita. Foco: cada transição justificada pela navegação. Sem durações publicadas. | opinião (Taylor) |
| https://www.raycast.com/blog/a-fresh-look-and-feel | blog | Raycast | Ícones redesenhados com o mesmo traço e os mesmos raios de canto; barra de ação fixa embaixo com atalhos; busca maior para separar do resto. Princípios: rápido, simples, agradável. | opinião (equipe) |
| https://linear.app/now/how-we-redesigned-the-linear-ui | blog | Linear | Alinhamento vertical e horizontal de rótulo, ícone e botão ("sentido em minutos, não notado de cara"); testou densidades do apertado ao espaçoso; limitou o azul nos cálculos para a interface ficar mais neutra; escopo disciplinado (só visual). | opinião (equipe) |
| https://www.nngroup.com/articles/microinteractions/ | artigo | NN/g | Microinteração é gatilho + resposta curta e próxima; deve ter propósito, ser sutil e curta, deixar o estado ativo distinto do padrão e ser consistente. | moderada |

### 2.3 Tipografia de interface

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric | documentação | MDN | `tabular-nums` deixa todos os dígitos com a mesma largura (usa o recurso `tnum`); só funciona se a fonte tiver esse recurso; suporte amplo desde 01/2020. Vale conferir a fonte escolhida. | robusta (especificação) |
| https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap-style | documentação | MDN | `balance`: linhas de tamanho parecido, limitado a 6 linhas no Chromium e 10 no Firefox, para títulos e legendas. `pretty`: reduz órfã, para texto longo, mais lento. Disponível em todos os navegadores atuais desde 10/2024. | robusta |
| https://www.joshwcomeau.com/css/custom-css-reset/ | blog | Josh W. Comeau | `balance` em títulos e `pretty` em parágrafos; `line-height` do corpo perto de 1,5; títulos menos; campos herdam fonte (`font: inherit`) e ficam com 16 px ou mais para o iOS não dar zoom. | consenso |
| https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ | artigo | NN/g | No máximo 3 tamanhos (pequeno, médio, grande) e cerca de 2 elementos grandes; exemplos 14 a 16 px corpo, 18 a 22 px subtítulo, até 32 px título; contraste por peso e valor, não só pelo matiz; no máximo 3 variações de contraste. Teste de apertar os olhos. | moderada |
| https://alistapart.com/article/more-meaningful-typography/ | artigo | A List Apart | Escala modular a partir do tamanho do corpo; linha de corpo com 1,54; entrelinha apertada distrai, solta demais enfraquece as margens; medida (largura da coluna) e entrelinha se ajustam juntas. | consenso |
| https://vercel.com/design/guidelines | guia | Vercel | Peso nunca abaixo de 400, títulos médios em 500 a 600; `tabular-nums` em tabelas e relógios; título fluido com `clamp(48px, 5vw, 72px)` (exemplo de desktop). | opinião/consenso |

Espaçamento entre letras em título grande: não encontrei número confiável nas páginas que abri. Ver seção 5.

### 2.4 Espaçamento e agrupamento

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ | artigo | NN/g | Quanto mais espaço em volta, mais o elemento se lê como grupo; título colado ao conteúdo mostra que pertencem. Borda ou fundo só reforçam e com parcimônia. | moderada |
| https://www.saasui.design/blog/saas-ui-looks-ai-generated | blog | saasui.design | Ritmo: itens relacionados juntos, grupos separados com folga maior; espaçamento uniforme é sinal de gerado. | consenso |
| https://trends.daisyui.com/how-to-make-ai-ui-less-generic/ | blog | daisyUI | Escala-base (exemplo 8 px) com espaços de seção e preenchimento de cartão definidos e verificados. | consenso |
| https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui | blog | The Fountain Institute | Cartão só para o que se age de forma independente; o resto agrupa por espaço, proximidade e tipografia. | consenso |
| https://www.nngroup.com/articles/touch-target-size/ | artigo | NN/g | Alvo de ao menos 1 cm x 1 cm físico; ação principal maior; contexto em movimento pede alvo maior; espaço não compensa alvo pequeno; botões empilhados pedem mais espaço vertical. | moderada |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | norma | W3C WCAG 2.2 | Mínimo 24 x 24 px CSS; alvo menor passa se um círculo de 24 px centrado nele não toca outro alvo. | robusta |

### 2.5 Movimento com propósito

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://emilkowal.ski/ui/7-practical-animation-tips | blog (também no X) | Emil Kowalski | Botão `scale(0.97)` ao pressionar; nunca sair de `scale(0)` (começar em 0,9 ou mais); `ease-out` para entrar e sair; curva própria mais forte que as de CSS; UI abaixo de 300 ms (180 ms parece mais ágil que 400 ms); sem animação no que se vê muitas vezes ao dia; `blur(2px)` só como último recurso em transição cruzada. Tooltip: 125 ms. | opinião (Kowalski) |
| https://www.nngroup.com/articles/animation-duration/ | artigo | NN/g | Resposta simples ~100 ms; troca de tela 200 a 300 ms; movimento grande até 400 ms; abaixo de 500 ms; entrada um pouco mais longa que saída (300 contra 200 a 250); animação frequente mais curta. | moderada |
| https://www.joshwcomeau.com/animation/css-transitions/ | blog | Josh W. Comeau | Entrada 125 ms contra saída 450 ms em um exemplo; `ease-out` para entrar, `ease-in` para sair; nomear propriedades, nunca `all`; `transform` e `opacity` são baratos; orçamento de 16,6 ms por quadro; `will-change` só no que vai mover; `transition: none` em `prefers-reduced-motion`. | consenso |
| https://jakub.kr/writing/details-that-make-interfaces-feel-better | blog | Jakub Krehel | Entrada escalonada: 100 ms entre blocos e 80 ms entre palavras do título; entrada de 800 ms com `translateY(8px)` e `blur(8px)`; saída mais discreta que a entrada; mola de saída 0,45 s sem repique. (Valores de página de efeito, não de app de uso rápido: usar com cautela.) | opinião (Krehel) |
| https://web.dev/articles/prefers-reduced-motion | artigo | web.dev | Não abriu (404). Substituído por MDN e Vercel acima para esse ponto. | |
| https://vercel.com/design/guidelines | guia | Vercel | Movimento automático com mais de 5 s precisa de controle para pausar; SVG: transformar o `<g>` com `transform-box: fill-box`; variante para movimento reduzido. | consenso |
| https://www.joshwcomeau.com/css/designing-shadows/ | blog | Josh W. Comeau | Sombra em camadas custa render; não animar várias camadas. | opinião (Comeau) |

### 2.6 Cor com parcimônia, cinzas, tema escuro

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://www.refactoringui.com/previews/building-your-color-palette | livro (prévia) | Adam Wathan e Steve Schoger | Cinzas são a maior parte da interface; 8 a 10 tons; preto puro parece artificial; definir os tons à mão, não gerar por clarear/escurecer; cor de acento com 5 a 10 tons. | consenso |
| https://stripe.com/blog/accessible-color-systems | blog | Stripe | Escala perceptualmente uniforme (CIELAB): duas cores a 5 níveis de distância dão contraste de texto pequeno (4,5:1), a 4 níveis valem para ícone e texto grande (3:1); testar texto também sobre o tom mais claro de cada matiz; manter a cor viva ao ajustar. | moderada |
| https://linear.app/now/how-we-redesigned-the-linear-ui | blog | Linear | Tema gerado por 3 entradas (base, acento, contraste) em LCH; texto e ícones neutros mais escuros no claro e mais claros no escuro; pouco azul nos cálculos para a interface ficar neutra. | opinião (equipe) |
| https://www.joshwcomeau.com/css/color-formats/ | blog | Josh W. Comeau | HSL engana: amarelo e azul a 50% de luminosidade parecem muito diferentes; OKLCH/LCH são uniformes. | consenso |
| https://www.joshwcomeau.com/css/designing-shadows/ | blog | Josh W. Comeau | Sombra não é preto puro: usar o matiz do fundo com menos saturação e luminosidade (ex.: `hsl(220deg 60% 50% / .333)`). Uma só direção de luz, proporção igual de deslocamento. | opinião (Comeau) |
| https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui | blog | The Fountain Institute | Uma cor dominante, um acento, um neutro; cor é recurso compartilhado: decidir o que merece o acento e valer em todo lugar. | consenso |

Tema escuro: não consegui abrir um texto específico sobre ele (Smashing e uxdesign.cc falharam). Só os dados de Linear, Stripe e Krehel acima valem. Ver seção 5.

### 2.7 Como equipes de alto acabamento trabalham

| Endereço | Tipo | Autor/equipe | Princípio | Selo |
|---|---|---|---|---|
| https://benji.org/family-values | blog | Family | Cada transição justificada pelo desenho da navegação; bandejas com uma coisa ou uma ação cada, alturas diferentes para sinalizar mudança de fluxo; encantamento escolhido (confete só ao concluir o backup). | opinião |
| https://linear.app/now/how-we-redesigned-the-linear-ui | blog | Linear | Testar cada tipo de tela em separado; escopo travado em visual; alinhamento milimétrico. | opinião |
| https://www.raycast.com/blog/a-fresh-look-and-feel | blog | Raycast | Regras únicas de traço e raio para todos os ícones; princípios curtos (rápido, simples, agradável). | opinião |
| https://family.co/blog/family-values | página de produto | Family | "Sweat the details, no matter how small". | opinião |
| https://stripe.com/blog/accessible-color-systems | blog | Stripe | Resolver no nível do sistema (um passo de cor para o selo inteiro) em vez de ajustar par a par. | opinião |
| https://vercel.com/design/guidelines | guia | Vercel | Regras escritas e verificáveis por equipe. | consenso |
| https://interfaces.rauno.me/ | guia | Rauno Freiberg | Regras curtas de interação, abertas ao público. | opinião |

Não encontrei texto aberto e verificável sobre Things, Arc, Airbnb (movimento além do Lottie), Duolingo (movimento), Apple Fitness e Cash App. A busca devolveu só resumos e páginas de terceiros; não usei.

## 3. Lista de conferência (35 itens)

Tipografia
1. No máximo 3 a 4 tamanhos de texto em uso no app inteiro. (https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
2. Hierarquia feita com peso e cor antes de tamanho; títulos em peso 500 a 600, nada abaixo de 400. (https://vercel.com/design/guidelines)
3. Todo título curto usa `text-wrap: balance`; texto corrido usa `pretty`. Nenhuma palavra sozinha na última linha. (https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap-style)
4. Todo número que muda (relógio, carga, repetições, contagem) com `font-variant-numeric: tabular-nums`; trocar o dígito não move nada ao lado. Conferir se a fonte tem `tnum`. (https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
5. Entrelinha do corpo perto de 1,5 e de títulos menor. (https://www.joshwcomeau.com/css/custom-css-reset/)
6. Unidade colada ao número (`10 kg`, `60 s`) com espaço não separável. (https://vercel.com/design/guidelines)
7. Aspas curvas e reticências de um caractere nos textos. (https://vercel.com/design/guidelines)
8. Campos de texto com fonte de 16 px ou mais. (https://interfaces.rauno.me/)
9. Nenhuma frase de título começa com palavras vazias; as 2 primeiras palavras já dizem o assunto. (https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)

Espaço e agrupamento
10. Espaçamentos só múltiplos de 4 (ou da escala escolhida); nenhum valor solto. (https://trends.daisyui.com/how-to-make-ai-ui-less-generic/)
11. Itens ligados mais juntos que grupos distintos; o espaço entre grupos é visivelmente maior. (https://www.saasui.design/blog/saas-ui-looks-ai-generated)
12. Nenhum cartão dentro de cartão. (https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)
13. Divisórias e bordas só onde o espaço não basta; testar removendo. (https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
14. Alvos de toque de ao menos 44 px, com folga entre vizinhos. (https://vercel.com/design/guidelines e https://www.nngroup.com/articles/touch-target-size/)
15. Nunca abaixo de 24 x 24 px em nada tocável. (https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
16. Ícone, rótulo e botão alinhados vertical e horizontalmente; checar ícones com alinhamento óptico, não só geométrico. (https://linear.app/now/how-we-redesigned-the-linear-ui)

Superfície e forma
17. Cantos aninhados: raio externo = raio interno + espaçamento. (https://jakub.kr/writing/details-that-make-interfaces-feel-better)
18. Sombra em 2 a 3 camadas finas de baixa opacidade, com a mesma direção em todo o app. (https://www.joshwcomeau.com/css/designing-shadows/)
19. Sombra com o matiz do fundo, não preto puro. (https://www.joshwcomeau.com/css/designing-shadows/)
20. Imagens com contorno de 1 px a 10% de opacidade, no claro e no escuro. (https://jakub.kr/writing/details-that-make-interfaces-feel-better)
21. Todos os ícones com o mesmo traço e o mesmo raio de canto; nenhum emoji como ícone. (https://www.raycast.com/blog/a-fresh-look-and-feel e https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)

Cor
22. Uma cor de destaque, usada só no que merece; teste: contar onde aparece. (https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)
23. Sem degradê, brilho colorido ou barra colorida lateral nos cartões. (https://adriankrebs.ch/blog/design-slop/)
24. Cinzas com leve temperatura, de 8 a 10 tons definidos à mão; sem preto puro. (https://www.refactoringui.com/previews/building-your-color-palette)
25. Contraste de texto pequeno de 4,5:1 (3:1 para grande e ícones), também sobre os fundos tingidos e no tema escuro. (https://stripe.com/blog/accessible-color-systems)

Estados e movimento
26. Todo botão tem estado pressionado visível e imediato (escala ~0,96 a 0,97). (https://emilkowal.ski/ui/7-practical-animation-tips)
27. Hover só em `@media (hover: hover)`; foco com `:focus-visible`, anel que segue o raio e nunca coberto por barra fixa. (https://interfaces.rauno.me/ e https://vercel.com/design/guidelines)
28. Nenhum `transition: all`; só `transform` e `opacity` animados; duração de interface abaixo de 300 ms (resposta simples ~100 ms). (https://www.nngroup.com/articles/animation-duration/ e https://vercel.com/design/guidelines)
29. Entradas com `ease-out`; nada nasce de `scale(0)`; saída mais curta que a entrada; o que se repete na série (registrar carga e repetição) quase sem animação. (https://emilkowal.ski/ui/7-practical-animation-tips)
30. `prefers-reduced-motion` tratado: sem deslocamento e zoom; mantém o essencial (mudança de estado por fade curto). (https://www.joshwcomeau.com/animation/css-transitions/)

Conteúdo e conjunto
31. Cada tela tem um ponto focal e uma ação principal; as outras são mais quietas. (https://www.saasui.design/blog/saas-ui-looks-ai-generated)
32. Estados vazio, erro e carregando desenhados e escritos com texto específico do produto. (https://www.saasui.design/blog/saas-ui-looks-ai-generated)
33. Teste de apertar os olhos: a ordem de importância sobrevive ao desfoque. (https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
34. Teste do produto: tampando o logotipo, a tela só poderia ser deste app. (https://builtin.com/articles/ai-design-slop-era)
35. Spinner só após ~150 a 300 ms de espera, e visível ao menos ~300 a 500 ms. (https://vercel.com/design/guidelines)

## 4. Sinais de cara de IA e o que fazer no lugar

| Sinal | No lugar |
|---|---|
| Degradê (principalmente roxo/azul) e brilhos coloridos | Cor chapada; profundidade por superfície e sombra fina. (Krebs; Fountain) |
| Selo/etiqueta acima do título | Título direto; se precisa de contexto, uma linha de texto comum. (Krebs) |
| Cartões idênticos com ícone no topo | Lista ou linha com hierarquia; um item maior só onde há prioridade. (saasui; Krebs) |
| Cartão dentro de cartão | Espaço, proximidade e tipografia. (Fountain) |
| Emoji como ícone ou marcador | Conjunto de ícones único com traço e raio iguais. (Fountain; Krebs) |
| Barra colorida na borda do cartão, pontinhos de status sem estado | Cor só para estado real; texto quando precisa explicar. (Fountain) |
| Tudo com o mesmo peso | Um número ou ação em destaque por tela; o resto mais quieto. (saasui) |
| Espaçamento igual em tudo | Ritmo: junto o que é ligado, folga entre grupos. (saasui) |
| Caixa-alta em todos os rótulos | Caixa normal; caixa-alta só em um nível. (Krebs) |
| Tema escuro com texto cinza fraco | Conferir 4,5:1; cinza com temperatura. (Krebs; HN; Stripe) |
| Vidro (glassmorphism) | Superfície opaca com contorno de 1 px. (Krebs; Krehel) |
| Componente padrão da biblioteca sem mexer | Personalizar 3 ou 4 primitivos: botão, campo, sombra. (saasui; Krebs) |
| Onboarding de 3 passos com pontinhos, estado vazio com ilustração e texto vago | Texto que ensina o próximo passo, com o vocabulário do app. (Built In; saasui) |
| Animações de entrada em tudo | Movimento só onde explica mudança; o repetido fica quase parado. (Kowalski; NN/g) |
| Texto de exemplo e erros vagos | Rótulos reais ("Registrar série"), erro que explica e oferece saída. (saasui; daisyUI) |

Ressalva honesta: a discussão no Hacker News mostra que parte desses padrões já era comum antes da IA, e que um detector único é pouco confiável (modelos diferentes têm estilos diferentes). Trate como lista de revisão, não como prova.

## 5. O que não consegui abrir ou conferir

- X (Twitter): x.com devolveu HTTP 402. Não abri fios. Usei os blogs equivalentes (Kowalski, Krehel, Freiberg, Comeau, Taylor). Paco Coursey, Steve Schoger (fio), Adam Wathan, Jhey Tompkins, Mariana Castilho, Brian Lovin: não localizei páginas abertas verificáveis.
- Reddit: a ferramenta bloqueou reddit.com. A busca não trouxe nenhuma discussão do Reddit. Nenhuma afirmação deste arquivo vem do Reddit.
- Hacker News: li só um espelho (hn.nuxt.dev) de um fio; o espelho do artigo "Family Values" não tinha comentários.
- Apple Human Interface Guidelines (tipografia, movimento): páginas devolveram só o título; não usei os números.
- web.dev sobre movimento reduzido, Smashing (alvos de toque, tema escuro), uxdesign.cc (tema escuro), Material Design (durações), animations.dev, Design Week (Duolingo) e airbnb.design (Lottie, redirecionou): não abriram ou vieram vazias.
- Things, Arc, Airbnb (princípios de movimento), Duolingo (movimento), Apple Fitness, Cash App, Notion: nada aberto e verificável sobre o desenho dos apps de celular deles.
- Espaçamento entre letras em títulos grandes e razão de escala tipográfica para app de celular: sem fonte aberta com número; precisa de teste visual no próprio app.
- Tema escuro bem feito: só indícios (Linear, Stripe, Krehel); sem guia dedicado aberto.
- O levantamento de Krebs é de autor único e o próprio texto não dá porcentagens por sinal; o HN questionou o método. As porcentagens que apareceram em resumos de terceiros (gradientes 28%, shadcn 23,5%) vieram só do resumo da busca e não foram usadas.
- As seções "Fontes" dos agentes 4, 5 e 6 não tinham endereços extraíveis por busca simples: não pude garantir que não repeti algum.
- Os valores de Krehel (entrada de 800 ms etc.) são de páginas de efeito; não os adote como regra de app de uso rápido.

Total de referências abertas e úteis: 29 endereços distintos (blog, guia de equipe, artigo, documentação/norma, livro/prévia, página de produto, Hacker News via espelho).

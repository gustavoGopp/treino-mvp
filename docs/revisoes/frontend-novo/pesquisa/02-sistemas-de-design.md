# 02 - Sistemas de design públicos: números e regras para o acabamento

Pesquisa de 12/11/2026. Só páginas públicas, abertas de fato. Sistemas lidos: WCAG 2.2 (W3C), Apple HIG, Material 3 (documentação dos componentes no GitHub), Primer (GitHub), Atlassian, IBM Carbon, GOV.UK, Vercel Geist e Radix. Não repeti os endereços das pesquisas anteriores (agente-4 e agente-5); onde reaproveito uma página já usada, é para tirar números novos e está dito.

Como ler os selos: **robusta** = norma oficial ou vários sistemas independentes dizendo o mesmo; **moderada**; **um estudo**; **consenso** = prática corrente, sem estudo; **opinião** = minha.

Nota sobre a Apple: as páginas normais da HIG dependem de JavaScript e não trazem texto. Li a versão em JSON que a própria Apple publica (`developer.apple.com/tutorials/data/design/human-interface-guidelines/<página>.json`), que é o mesmo conteúdo da página `developer.apple.com/design/human-interface-guidelines/<página>`. Nas tabelas, "Apple" aponta para esse JSON. Nota sobre o Material: a página m3.material.io não carrega sem JavaScript; usei os arquivos de documentação dos componentes do `material-components-android` no GitHub (os números vêm em dp/sp, que no CSS equivalem a px).

## 1. Em 10 linhas

1. **A grade de 4/8 é o padrão do mercado.** Radix usa 4, 8, 12, 16, 24, 32, 40, 48, 64. Atlassian, Carbon e Primer têm escalas quase iguais, com alguns degraus extras (2, 6, 12, 20, 40). A escala 4, 8, 16, 24, 32, 48, 64 está dentro do que todos fazem.
2. **Toque mínimo de 44 é o valor "padrão" da Apple e o nível AAA da WCAG (2.5.5).** O nível AA (2.5.8) exige só 24 px, ou 24 px de respiro ao redor do alvo pequeno. A Apple aceita 28 pt como mínimo absoluto e pede cerca de 12 pt de respiro ao redor de botões com contorno. O Material pede 48 dp para ícones de campo.
3. **Texto de corpo no celular: 16 a 17.** A Apple usa 17 pt (mínimo 11 pt), o Material 16 sp (mínimo 11 sp), o GOV.UK 19 px. Só Atlassian e Carbon (produtos de computador) descem para 14. Texto abaixo de 12 não aparece como padrão em nenhum sistema.
4. **Letra que cresce:** Apple pede que o texto possa crescer pelo menos 200%. Atlassian e GOV.UK definem tudo em rem, que acompanha a escolha da pessoa no navegador. Altura de linha com folga (mais de 1,2).
5. **Uma ação principal por tela.** Carbon, Primer, GOV.UK e Apple dizem o mesmo. A Apple acrescenta: no iPhone, botão principal com largura total; dois botões lado a lado, com a mesma altura.
6. **Barra de baixo: 3 a 5 destinos, ícone e rótulo sempre visíveis**, nunca escondida ao trocar de seção (Apple, Material). Altura do Material: 80 dp (M3) ou 64 dp (versão expressiva).
7. **Folha de baixo para tarefa curta, diálogo para decisão que bloqueia.** Folha com alça se for redimensionável (Apple), com Cancelar sempre visível. Diálogo para confirmar ação destrutiva (Carbon), nunca só para informar (Apple).
8. **Tema escuro não é preto puro.** O Material diz que cinza escuro "aumenta a visibilidade das sombras e reduz o cansaço da vista para texto claro". Atlassian: superfícies mais altas ficam mais claras no escuro.
9. **Movimento curto:** micro-interações de 50 a 150 ms, trocas de tela de 150 a 400 ms (Atlassian, Carbon e Material concordam), saída mais rápida que entrada, e "movimento desligado e instantâneo" quando a pessoa pede redução (Atlassian).
10. **Campo numérico:** teclado numérico (`inputmode`), não `type="number"` (GOV.UK); rótulo sempre visível acima do campo; erro diz o que houve e como corrigir; não apagar o que a pessoa digitou. Stepper (mais e menos) não mostra o valor: ponha um campo ao lado (Apple).

## 2. Tabelas por assunto

### 2.1 Espaçamento

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://www.radix-ui.com/themes/docs/theme/spacing | Radix Themes | Escala de 9 passos: 4, 8, 12, 16, 24, 32, 40, 48, 64 px. | robusta (com os três abaixo) |
| https://atlassian.design/foundations/spacing | Atlassian | Base de 8 px. Tokens: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80. Pequeno (0 a 8) para ícone com texto, enchimento de campo e selo; médio (12 a 24) para botão, cartão e distância entre elementos do cartão; grande (32 a 80) para o espaço da página. "Agrupe itens parecidos com espaço consistente; coloque perto o que é relacionado; use espaço variado para mostrar hierarquia." | robusta |
| https://carbondesignsystem.com/elements/spacing/overview/ | Carbon | Escala: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160. Combina com a "grade 2x" (múltiplos de 2, 4 e 8). Sair da escala deve ser evitado. Os tokens não são responsivos; em telas maiores sobe-se um ou mais degraus. | robusta |
| https://primer.style/product/primitives/size/ | Primer | Escala base: 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128. Em ponteiro "grosso" (toque) o espaço entre controles empilhados vai a 1 rem (16 px) e em ponteiro "fino" (mouse) a 0,5 rem (8 px). | moderada |
| https://design-system.service.gov.uk/styles/spacing/ | GOV.UK | Escala própria de 5 px: 5, 10, 15, 20, 25, 30, 40, 50, 60. Em tela pequena os degraus 4 e 5 ficam em 15 px e os maiores encolhem (o degrau 9 vai de 60 a 40 px). | moderada |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json | Apple | Espaço entre controles é tão importante quanto o tamanho: cerca de 12 pt de respiro ao redor de elementos com contorno e cerca de 24 pt ao redor de elementos sem contorno. | consenso |

Margem lateral da tela no celular: **nenhum sistema aberto traz um número**. A página de Layout da Apple fala em margens e áreas seguras do sistema, mas só dá números para tvOS e visionOS (ex.: 80 pt nas laterais na TV). O 16 px de margem lateral, comum, não ficou conferido numa fonte oficial.

### 2.2 Tipografia

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json | Apple | iPhone: tamanho padrão 17 pt, mínimo 11 pt. Evitar pesos leves (ultrafino, fino, leve); preferir regular, médio, semibold, bold. Para três ou mais linhas, evitar entrelinha apertada. Usar os estilos do sistema garante suporte a Dynamic Type. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json | Apple | Dar a opção de ampliar o texto em pelo menos 200% (140% no relógio), por Dynamic Type ou interface própria. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Typography.md | Material 3 | 15 estilos: Display 57/45/36, Headline 32/28/24, Title 22 (regular) e 16/14 (médio), Body 16/14/12, Label 14/12/11 (médio). Existe versão "enfatizada" com um peso a mais. | consenso |
| https://atlassian.design/foundations/typography | Atlassian | Títulos em negrito: 32/36, 28/32, 24/28, 20/24, 16/20, 14/20, 12/16 (tamanho/altura de linha em px). Corpo: 16/24, 14/20 (padrão), 12/16, com espaço entre parágrafos de 16, 12 e 8. Existe um estilo "Metric" (número grande) em negrito: 28/32, 24/28, 16/20. Tudo em rem, para acompanhar a escolha da pessoa. Não há mínimo declarado; o menor é 12. | consenso |
| https://design-system.service.gov.uk/styles/type-scale/ | GOV.UK | Tela pequena (640 px ou menos): 53/55, 32/35, 27/30, 21/25, 19/25 (corpo padrão), 16/20 (corpo pequeno). Toda altura de linha é múltiplo de 5 px. CSS em rem/em para o texto acompanhar o zoom. Há opção de espaçamento tabular na mesma mistura de fonte. | consenso |
| https://carbondesignsystem.com/elements/typography/overview/ | Carbon | Escala de 12 a 92 px (12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48...). Pesos sugeridos: 300, 400 e 600; o semibold é bom para cabeçalhos mas não para texto longo. Estilos "produtivos" (produto) têm título de tamanho fixo; os "expressivos" mudam por tamanho de tela. A página não traz altura de linha, números tabulares nem tamanho mínimo. | consenso |
| https://vercel.com/geist/typography.md | Vercel Geist | Estilos por função: Heading (72 a 14), Button (16, 14, 12), Label (20 a 12) para uma linha, Copy (24 a 13) para várias linhas. "Tabular é usado quando se transmite números" (no Label 13). A página não dá os valores de px e nem altura de linha. | consenso |

### 2.3 Áreas de toque

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | WCAG 2.2, critério 2.5.8 (AA) | Alvo de pelo menos 24 x 24 px CSS. Alvo menor passa se um círculo de 24 px de diâmetro centrado nele não encosta em outro alvo (regra do espaçamento). Exceções: equivalente na página, em linha dentro de frase, controle do navegador, essencial. | robusta |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html | WCAG 2.2, critério 2.5.5 (AAA) | Alvo de pelo menos 44 x 44 px CSS, com as mesmas exceções (equivalente, em linha, navegador, essencial). É nível AAA, não obrigatório para AA. | robusta |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json | Apple | Tabela de tamanho de controle: iOS e iPadOS padrão 44 x 44 pt, mínimo 28 x 28 pt. Cerca de 12 pt de respiro ao redor de elementos com contorno e cerca de 24 pt ao redor dos sem contorno. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json | Apple | "Como regra geral, um botão precisa de uma região de toque de pelo menos 44 x 44 pt" (a região de toque pode ser maior que o desenho). O tamanho "regular" de botão tem 44 pt. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/TextField.md | Material 3 | Ícones no início e no fim do campo têm tamanho mínimo padrão de 48 dp. | consenso |
| https://primer.style/product/primitives/size/ | Primer | Alturas de controle: 24, 28, 32, 40, 48 px (XS a XL). A página não define tamanho de toque, só aumenta o espaço entre controles em ponteiro de toque. | moderada |
| https://carbondesignsystem.com/components/text-input/usage/ | Carbon | Campos de 24, 32, 40 (padrão) e 48 px de altura. | consenso |

### 2.4 Navegação de baixo (barra de abas)

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/tab-bars.json | Apple | Rótulo em cada aba, de preferência uma palavra. Não esconder nem desativar botões da barra, mesmo sem conteúdo. Esconder a barra faz a pessoa esquecer onde está; a exceção é uma tela modal cobrindo tudo. Quando faltar espaço, a última aba vira "Mais", o que dificulta achar o conteúdo. Selo (bolinha vermelha) só para informação crítica. Preferir ícones preenchidos. Altura de 68 pt só para tvOS (a do iPhone não está nesta página). | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BottomNavigation.md | Material 3 | De 3 a 5 destinos, cada um com ícone e rótulo. Indicador de aba ativa de 56 x 32 dp, com 4 dp entre indicador e rótulo. Altura: 80 dp no M3; a versão "expressiva" reduz para 64 dp, com indicador de 56 dp, rótulo sem negrito quando selecionado e enchimento de 6 dp em cima e embaixo. Sombra padrão de 3 dp. Em janelas de 600 dp ou mais o ícone passa para o lado do rótulo. | consenso |

### 2.5 Folhas de baixo e diálogos

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/sheets.json | Apple | Folha modal bloqueia a tela de trás; a não modal deixa mexer nela. Dois pontos de parada: "grande" (altura total) e "médio" (cerca de metade). Alça (grabber): aparece em folha redimensionável, serve também para VoiceOver e um toque nela alterna as alturas. Cancelar fica no canto de cima à esquerda e Concluído à direita; sempre oferecer uma saída além do Concluído; não mostrar Cancelar, Concluído e Voltar juntos. Evitar folha que cobre quase toda a janela. Se uma ação dentro da folha abre outra, fechar a primeira antes. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/alerts.json | Apple | Alerta tem título, texto opcional e no máximo três botões. Não usar para só informar, nem para ações comuns que podem ser desfeitas, nem ao abrir o app. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BottomSheet.md | Material 3 | Alça opcional. Largura máxima de 640 dp. Sombra de 1 dp. Folha modal pode ser arrastada para baixo para fechar. Altura de repouso ("peek") automática por padrão. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Dialog.md | Material 3 | "Diálogos são janelas modais que exigem interação." Dois tipos: básico e tela cheia. Margens padrão do fundo do diálogo: 24 dp nas laterais e 80 dp em cima e embaixo. | consenso |
| https://carbondesignsystem.com/components/modal/usage/ | Carbon | Modal só para: exigir resposta imediata, avisar de algo urgente, confirmar uma decisão. "Use com moderação": tarefa repetida deve ficar na página. Quatro tamanhos; se o conteúdo precisa de muita rolagem no maior, usar página inteira. Dois botões: Cancelar secundário à esquerda e ação principal à direita, cada um com 50% da largura. Ação destrutiva: modal de perigo, só para risco alto de perda de dados. Fecha com X, Esc ou clique fora (só quando for passivo). | consenso |

### 2.6 Raio de canto, cantos aninhados, elevação e sombra

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Shape.md | Material 3 | Escala de canto: 0, 4, 8, 12, 16, 20, 28, 32, 48 e "total" (50%). | consenso |
| https://atlassian.design/foundations/radius | Atlassian | Raios: 2, 4, 6, 8, 12, 16 e total. O anel de foco fica 2 px para fora e o raio do anel é o raio do elemento mais 2 px (elemento de 6 px, anel de 8 px). Não há regra explícita para cantos aninhados. | moderada |
| https://primer.style/product/primitives/size/ | Primer | Raios: 3 (pequeno), 6 (médio, padrão), 12 (grande) e total. | consenso |
| https://vercel.com/geist/materials.md | Vercel Geist | Raio de 6 px para base, pequeno e dica; 12 px para médio, grande, menu e modal; 16 px para tela cheia. Sombras de elementos flutuantes são translúcidas e em níveis de elevação crescente; sombra opaca deixa um "halo cinza". Sem números de sombra. | consenso |
| https://atlassian.design/foundations/elevation | Atlassian | Níveis: afundado, padrão, elevado e sobreposto (mais uma sombra de "rolagem" que indica conteúdo cortado). Sempre combinar a cor de superfície com a sombra do mesmo nível. Elevado só para um ponto focal; para agrupar, preferir borda ou espaço. No escuro, sombra enxerga-se pouco, então a superfície mais alta fica mais clara. Conferir o contraste de novo no escuro. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Dark.md | Material 3 | Superfícies mais altas ficam mais claras e mais coloridas no escuro. A técnica antiga (camadas translúcidas) foi trocada pelo sistema de superfícies tonais. | consenso |

Sobre cantos aninhados: nenhuma fonte aberta enuncia "raio interno = externo menos o respiro". A única relação em números é a do anel de foco da Atlassian (raio de fora = raio de dentro + distância). É geometria simples; trato como **opinião**: raio interno = raio externo menos o enchimento, com piso em 0.

### 2.7 Cor

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://atlassian.design/foundations/color | Atlassian | Papéis: neutro, marca, informação, sucesso, aviso, perigo, descoberta, destaque (sem significado), inverso, campo. Contraste mínimo de 3:1 para interface essencial e texto de 24 px ou mais; 4,5:1 para texto menor. Cor de destaque só onde a cor não carrega significado. Dois temas, cada token com valor próprio em cada um. | robusta |
| https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale | Radix | Escala de 12 passos por cor: 1 e 2 fundos; 3, 4, 5 fundo de componente (normal, passar o mouse, pressionado); 6, 7, 8 bordas (8 também anel de foco); 9 e 10 cor sólida; 11 texto suave; 12 texto forte. Passos 11 e 12 cumprem APCA Lc 60 e Lc 90 sobre o passo 2. | moderada |
| https://vercel.com/geist/colors.md | Vercel Geist | 10 degraus (100 a 1000): 100 fundo, 200 fundo ao passar, 300 fundo ativo, 400 a 600 bordas, 700 e 800 fundo de alto contraste, 900 texto secundário, 1000 texto principal. Dois fundos: Background 1 (quase sempre) e Background 2 (com parcimônia). Cinza por padrão. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/color.json | Apple | Usar cores semânticas que se adaptam ao tema. Cor só onde há ênfase (indicador de estado, ação principal); na ação principal, aplicar a cor ao fundo do botão, não ao texto. Cores precisam funcionar em claro, escuro e contraste aumentado. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json | Apple | Escuro tem fundos mais "dim" e primeiros planos mais brilhantes, e não é inversão pura. Contraste mínimo 4,5:1; para cores próprias, tentar 7:1, especialmente em texto pequeno. Evitar uma opção de tema própria do app (a pessoa já escolheu no sistema). Suavizar fundos brancos de imagens. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Color.md | Material 3 | Três grupos de destaque (primário, secundário, terciário), cada um com 4 a 5 papéis (ex.: primário, sobre-primário, contêiner primário, sobre-contêiner). Papéis de superfície à parte. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Dark.md | Material 3 | O fundo e a superfície do tema escuro padrão são "cinza escuro em vez de preto, o que aumenta a visibilidade das sombras e reduz o cansaço da vista para texto claro". | consenso |

### 2.8 Movimento

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://atlassian.design/foundations/motion | Atlassian | Interações (passar o mouse, pressionar): 50 a 150 ms. Transições (entrar, sair, mover): 150 a 400 ms (lista: 50 ms; menu: 150 ms; modal: 250 ms). Elemento maior, duração maior; saída mais rápida que entrada; interação frequente abaixo de 150 ms. Curvas: entrada `cubic-bezier(0, 0.4, 0, 1)`, entra e sai `(0.4, 0, 0, 1)`, saída `(0.6, 0, 0.8, 0.6)`. Perguntar se o movimento acrescenta sentido; se tirar não perde informação, tirar. Redução de movimento: "movimento desligado e instantâneo"; nunca piscar, oscilar rápido ou varrer grandes áreas; conferir que tudo funciona sem movimento. Obs.: a página avisa que os tokens estão em acesso antecipado. | consenso |
| https://carbondesignsystem.com/elements/motion/overview/ | Carbon | Durações: 70 e 110 ms (micro), 150 ms (pequenas mudanças), 240 ms (expandir, avisos), 400 ms (grandes mudanças), 700 ms (escurecer o fundo). Curva padrão "produtiva" `cubic-bezier(0.2, 0, 0.38, 0.9)`; entrada `(0, 0, 0.38, 0.9)`; saída `(0.2, 0, 1, 0.9)`. Movimento expressivo só para momentos importantes e raros. "Sempre oferecer alternativas para transições de estado"; a mesma mensagem tem de poder ser dada de forma estática. | consenso |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md | Material 3 | Durações de 50 a 1000 ms: curtas 50, 100, 150, 200; médias 250, 300, 350, 400; longas 450 a 600; extra longas 700 a 1000. Curva padrão para o que começa e termina na tela `(0.2, 0, 0, 1)`; entrar `(0, 0, 0, 1)`; sair `(0.3, 0, 1, 1)`. Regra geral: quanto maior a área percorrida, maior a duração. Também há molas (ex.: botões e chaves: amortecimento 0,9, rigidez 1400). | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/motion.json | Apple | Tornar o movimento opcional: não usá-lo como única forma de passar informação importante. Animação de retorno breve e precisa; em apps, geralmente evitar movimento em interações que acontecem com frequência. | consenso |

### 2.9 Estados: carregando, vazio, erro, sem rede

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://primer.style/product/ui-patterns/loading/ | Primer | Abaixo de 1 s: nada (um pisca-pisca faz o app parecer mais lento). De 1 a 3 s: indicador sem progresso. De 3 a 10 s: indicador com progresso, se possível. Acima de 10 s: com progresso e, se der, em segundo plano. Esqueleto para áreas grandes de conteúdo; spinner (roda) para o caso variável ou desconhecido; barra quando se sabe ou se estima o progresso. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/loading.json | Apple | Mostrar algo o quanto antes (um espaço reservado, em vez de tela em branco, que a pessoa lê como defeito); deixar fazer outras coisas enquanto carrega; avisar quanto tempo deve levar. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/progress-indicators.json | Apple | Quando possível, usar o indicador com progresso, porque ele deixa a pessoa decidir se espera, faz outra coisa ou recomeça. Indicadores são temporários. | consenso |
| https://primer.style/product/ui-patterns/empty-states/ | Primer | Título explica o propósito (acolhedor se nunca usado; de forma simples se vazio por natureza; resumo curto se algo deu errado). Texto de apoio opcional e curto, com o próximo passo. Uma ação principal, breve e descritiva; ação secundária só como link de texto. Em erro: sem termos técnicos nem códigos, ser específico ("O formulário não foi enviado. Alguns campos obrigatórios estavam vazios"), evitar "Houve um problema", não usar tom brincalhão, ícone de alerta por padrão. | consenso |
| https://design-system.service.gov.uk/components/error-message/ | GOV.UK | Mensagem de erro explica o que houve e como corrigir; linguagem simples e positiva; sem "por favor", "desculpe", "válido/inválido"; nada de "Ocorreu um erro" genérico; mesma frase no campo e no resumo; em vermelho, com borda vermelha ligando ao campo; não limpar os campos preenchidos. | consenso |
| https://primer.style/product/ui-patterns/forms/ | Primer | Se a validação pode levar mais de 1 s, mostrar indicador. Erro com "por que é inválido e como corrigir". | consenso |

"Sem rede": nenhuma das páginas abertas tem regra própria para estado offline (ver seção 5).

### 2.10 Formulários e campos numéricos

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/steppers.json | Apple | O stepper (mais e menos) não mostra valor: coloque-o ao lado de um campo que mostre o valor atual. Para mudanças pequenas e de poucos toques, o stepper sozinho serve; para valores que variam muito, combinar stepper e campo de texto. Em campos grandes, permitir salto de 10 vezes o passo (no Mac, Shift). | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/segmented-controls.json | Apple | Controle segmentado: uma escolha entre opções, segmentos de largura igual, no máximo cerca de 5 no iPhone (5 a 7 em telas largas); não misturar texto e ícone; conteúdo de tamanho parecido; não dar ações a segmentos de um controle que mostra seleção. | consenso |
| https://primer.style/product/components/segmented-control/ | Primer | Para "escolher uma entre poucas opções ligadas"; a seleção vale na hora (não é campo de formulário que espera envio); precisa de nome acessível; pode ocupar a largura toda; tamanhos pequeno e médio. | consenso |
| https://design-system.service.gov.uk/components/text-input/ | GOV.UK | Número inteiro: `inputmode="numeric"`; com casas decimais: `inputmode="decimal"`; se pode ter negativo, `type="text"` sem inputmode. Evitar `<input type="number">`: rolar a página pode mudar o valor sem querer e não há retorno claro se digitar algo que não é número. Rótulo visível acima do campo, curto, em minúsculas (frase), sem dois-pontos; placeholder não substitui rótulo. Mensagens de erro específicas (vazio, comprimento, "não é número", limites). Aceitar prefixo ou sufixo digitado (ex.: "kg") sem erro. | consenso |
| https://primer.style/product/ui-patterns/forms/ | Primer | Validar ao enviar por padrão; depois de uma falha pode validar ao sair do campo; campo já inválido pode ser validado enquanto digita, para o erro sumir logo ao corrigir. Evitar botão de envio desativado (não explica o que falta). Marcar visivelmente campo obrigatório. Rótulo de até cerca de 3 palavras; placeholder nunca substitui rótulo. Com 3 ou mais erros, resumo no topo; com menos, focar o primeiro campo inválido. | consenso |
| https://carbondesignsystem.com/components/text-input/usage/ | Carbon | Erro com borda vermelha, ícone e mensagem; ajuda fixa abaixo do campo, trocada pelo erro quando ele aparece. Validação em tempo real é recomendada (ao contrário do Primer, que prefere ao enviar). Rótulo obrigatório, sem dois-pontos. | consenso |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/text-fields.json | Apple | Mostrar o tipo de teclado adequado (numérico, URL etc.). O placeholder some ao digitar; use também um rótulo separado. Validar quando fizer sentido (dígitos só). | consenso |

### 2.11 Botões

| Endereço | Sistema | A regra ou o número | Selo |
|---|---|---|---|
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json | Apple | Estilo "proeminente" (com cor) para a ação mais provável da tela; no máximo um ou dois por tela. Para ações principais no app, preferir botão de largura total ("fica melhor e é mais fácil de tocar"); se dois dividem a linha, mesma altura. Botões do mesmo tamanho sugerem opções do mesmo peso. Ação destrutiva nunca recebe o papel principal. | consenso |
| https://carbondesignsystem.com/components/button/usage/ | Carbon | "Cada página deve ter só um botão principal." Cinco níveis: principal, secundário, terciário, fantasma, perigo. Grupo com 2 ou 3 botões, do mesmo tamanho; mais que isso, menu. Largura total só em diálogos, painéis laterais e cartões pequenos, com no máximo 320 px. Em diálogo e passo a passo, o principal fica à direita. | consenso |
| https://primer.style/product/components/button/ | Primer | Principal: "usar com parcimônia", nunca mais de um num grupo e raramente mais de um por página. Tamanho médio na maioria dos casos; grande só raramente. Propriedade para largura total existe, sem regra para celular. | consenso |
| https://design-system.service.gov.uk/components/button/ | GOV.UK | Um botão principal ("padrão") por página, alinhado à esquerda no formulário; secundário para ações secundárias. Texto em minúsculas (frase), descrevendo a ação. Aviso (vermelho) só para destrutivo, com passo de confirmação. Evitar botão desativado. Protegido contra clique duplo; dar retorno em conexão lenta. A página não traz altura nem espaço entre botões. | consenso |

Posição perto do polegar: nenhum sistema aberto dá número. A Apple recomenda largura total (acima). Minha leitura: com uma mão, o botão principal em largura total na parte de baixo, acima da barra e da área segura. **Opinião**; as pesquisas anteriores citam que "melhora o alcance do polegar" é um argumento fraco (NN/g, no agente-4).

## 3. Onde os sistemas concordam e onde discordam

### Concordam (viram regra forte)

| Assunto | O que todos dizem | Selo |
|---|---|---|
| Base de 4/8 | Radix, Atlassian, Carbon, Primer: múltiplos de 4 e 8, com poucos degraus extras. GOV.UK usa base 5 (exceção). | robusta |
| Uma ação principal | Carbon, Primer, GOV.UK, Apple: uma (Apple: "uma ou duas"). | robusta |
| Rótulo sempre visível | Apple (barra, campos), Material (barra), GOV.UK, Primer e Carbon (campos): placeholder nunca substitui rótulo. | robusta |
| Barra de baixo | Apple e Material: ícone mais rótulo; 3 a 5 destinos (Material), pouca coisa antes de "Mais" (Apple); não esconder ao trocar de seção. | moderada |
| Contraste | WCAG AA (4,5:1 texto, 3:1 componente e texto grande): Atlassian e Apple adotam explicitamente. Apple tenta 7:1 para texto pequeno com cores próprias. | robusta |
| Movimento | Frequente e pequeno: abaixo de 150 ms (Atlassian, Carbon 70 a 150 ms, Material 50 a 150). Grande ou raro: 240 a 400 ms. Saída mais rápida que entrada. Redução de movimento desliga ou simplifica. | robusta |
| Escuro | Não é só inverter; superfícies mais altas ficam mais claras (Atlassian, Material); conferir o contraste de novo no escuro (Atlassian, Apple). | moderada |
| Carregando | Abaixo de 1 s, nada (Primer, e Nielsen via NN/g nas pesquisas anteriores). Mostrar algo logo (Apple). Com progresso quando possível (Apple, Primer). | moderada |
| Erro de formulário | Dizer o que houve e como corrigir; sem "inválido" vago; não apagar o que foi digitado (GOV.UK, Primer, Carbon). | robusta |
| Campo numérico | Teclado numérico para número (Apple, GOV.UK); Apple junta stepper e campo para mudanças grandes. | moderada |

### Discordam (viram decisão)

| Assunto | Números lado a lado | Minha leitura (opinião) |
|---|---|---|
| Toque mínimo | WCAG AA 24 px (ou 24 px de espaço); Apple padrão 44 pt e mínimo 28 pt; WCAG AAA 44 px; Material 48 dp (ícone de campo). | 44 é o piso para tudo que se toca com a mão suada na academia; 48 para os controles de uso repetido. |
| Corpo de texto no celular | Apple 17, Material 16, GOV.UK 19, Atlassian 14 (padrão) com 16 "Body L", Carbon 14 a 16. | 16 no mínimo; 17 a 18 para o que se lê de longe, como a carga e o descanso. |
| Texto mínimo | Apple 11, Material 11, Atlassian 12, Carbon 12. | 12, só para rótulo secundário, e 13 ou mais para qualquer coisa que se leia no meio do treino. |
| Altura da barra de baixo | Material M3: 80 dp; Material expressivo: 64 dp; Apple: não conferido no iPhone. | 64 a 80, mais a área segura. |
| Raio de canto | Material 4 a 48 (cartões típicos 12 a 28); Atlassian 2 a 16; Primer 3, 6, 12; Geist 6, 12, 16. | Uma escala curta: 8, 12, 16, 24 e total. |
| Validação | Primer: ao enviar, depois ao sair do campo; Carbon: em tempo real. | Para carga e repetições, validar ao sair do campo, sem erro enquanto digita. |
| Largura total do botão | Apple: preferir no app (iPhone); Carbon: só em diálogo, painel e cartão, com 320 px no máximo; Primer: opção. | No celular, largura total. O limite de 320 px do Carbon vale para telas grandes. |
| Aplicativo ter seu próprio tema | Apple: evitar opção de tema só do app. | Seguir o sistema; decisão do dono se oferece troca manual. |
| Segmentado | Apple: no máximo 5 no iPhone; Primer: exemplos com 3. | 2 a 4 opções por controle. |
| Esqueleto ou spinner | Primer: ambos 1 a 3 s, esqueleto para áreas grandes, spinner para um bloco só. | Nada de esqueleto em tela local (os dados estão no aparelho). |

## 4. O que isso muda numa grade de 4, 8, 16, 24, 32, 48, 64 com toque de 44 px

**Confirmado pelos sistemas.** 4, 8, 16, 24, 32, 48, 64 estão todos nas escalas de Radix (4, 8, 12, 16, 24, 32, 40, 48, 64), Atlassian, Carbon e Primer. Radix tem só 9 degraus e é quase igual à sua escala mais 12 e 40. Alturas de 48 existem (Primer "XL", Carbon "lg", Material 48 dp para ícones de campo). O 64 aparece como altura da barra de baixo expressiva do Material.

**Casos que pedem valor fora da escala (cada um com a fonte):**

| Valor | Onde aparece | Fonte | Decisão sugerida (opinião) |
|---|---|---|---|
| **12** | Atlassian `space.150` ("botões, espaço entre avatar e conteúdo, entre elementos do cartão"); Radix passo 3; Carbon `spacing-04`; raio médio do Material (12 dp); Apple: cerca de 12 pt de respiro ao redor de botões com contorno. | Páginas de espaço da Atlassian, Radix, Carbon; Shape.md; Apple accessibility.json | O mais sólido dos extras: aceitar 12 como token. |
| **20** | Atlassian `space.250`; raio "grande aumentado" do Material (20 dp); margem de 20 dp no item expandido da barra. | Atlassian espaço; Shape.md; BottomNavigation.md | Só 3 fontes de peso fraco; dá para passar sem. |
| **40** | Radix passo 7; Carbon `spacing-08` e campo médio de 40; Primer controle grande de 40; Atlassian `space.500`. | Radix, Carbon, Primer, Atlassian | Útil para botões secundários compactos, mas está abaixo do toque de 44: só com área de toque ampliada. |
| **44** | Primer tem o degrau 44 na escala; WCAG 2.5.5 e Apple pedem 44 de toque. | Primer size; WCAG; Apple | 44 não precisa ser degrau da escala: é um piso de área de toque. O visual segue a escala (48) e a área de toque é no mínimo 44. |
| **28** | Apple: mínimo absoluto de 28 pt; Primer: controle "S" de 28; Material: raio extra grande 28 dp. | Apple accessibility.json; Primer size; Shape.md | Não usar para toque; como raio de folha de baixo é aceitável, mas 24 também serve. |
| **56** | Material: indicador da barra com 56 dp de largura. | BottomNavigation.md | Só como largura do indicador. Altura de campo de 56 do M3 não consegui conferir. |
| **2, 6** | Atlassian `space.025` e `space.075`; Carbon e Primer têm 2. Primer e Atlassian têm 6. | Atlassian, Carbon, Primer | 2 para fios e ajuste fino; 6 evitar. |
| **80** | Altura da barra de baixo do Material M3 (80 dp); Atlassian `space.1000`; Carbon `spacing-11`. | BottomNavigation.md; espaço Atlassian e Carbon | Útil como espaço entre blocos grandes, se a escala precisar subir. |

**Margem lateral de 16 px:** é o valor mais esperado (e cabe na escala), mas nenhuma página aberta o confirma como regra de celular (ver seção 5).

**Resumo (opinião):** manter 4, 8, 16, 24, 32, 48, 64 e acrescentar só o 12 (que quatro fontes pedem para ajuste de respiro e raio). Toque de 44 como piso; altura de botão e campo de 48, 56 ou 64 dentro do que os sistemas fazem (48 é o mais comum, 56 e 64 não aparecem como alturas de botão nas páginas abertas e ficam como escolha de projeto para o uso na academia).

## 5. O que não consegui abrir ou conferir

- **Páginas normais da Apple e do Material 3 (m3.material.io):** não trazem texto sem JavaScript. Resolvi com o JSON público da Apple e com a documentação dos componentes do Material no GitHub. Não tentei m3.material.io pelo navegador.
- **Apple:** altura da barra de abas do iPhone (49 pt) e margem lateral padrão do iPhone (16 pt) **não conferidos**; as páginas lidas não os trazem. A página de Layout só dá números para tvOS e visionOS. A tabela de Dynamic Type com tamanhos de cada estilo (xSmall a AX5) também não foi lida nesta rodada; só 17 pt de padrão e 11 pt de mínimo.
- **Shopify Polaris:** a documentação nova redireciona (301) para shopify.dev/docs/api/polaris, que não trouxe as páginas de espaço ou botão. **Não consegui** os números do Polaris; ele não entra na contagem.
- **Adobe Spectrum:** a página de áreas de toque deu 404. Não tentei outras.
- **Vercel Geist:** as páginas de cores, tipografia e materiais abrem em Markdown, mas sem números de tamanho, altura de linha, nem sombras. Só raios (6, 12, 16) e a estrutura dos 10 degraus de cor.
- **Primer:** abri tamanho, carregando, vazio, botão, segmentado e formulário. Não abri a página de diálogo e a de tipografia; a página de botão não dá altura em pixels.
- **GOV.UK:** a página de botão não traz altura nem distância entre botões.
- **Carbon:** a página de botão não dá altura em px (remete à aba "Specifications"); a de tipografia não tem altura de linha, números tabulares nem tamanho mínimo.
- **Linear:** não procurei; não achei sistema público a tempo.
- **Estado "sem rede/offline":** nenhuma das páginas abertas tem regra específica. Não confirmei nada além do que está em carregando e erro.
- **Margem lateral de celular, distância entre grupos e dentro de grupos como números:** só a Atlassian dá faixas (pequeno 0 a 8, médio 12 a 24, grande 32 a 80); nenhum sistema traz "margem lateral = 16".
- **Apple e Atlassian dependem da versão atual:** a Atlassian avisa que os tokens de movimento estão em acesso antecipado e que os valores de raio são "indicativos".
- **Não conferido em nenhuma fonte:** a regra "raio interno = raio externo menos respiro" (é geometria; marquei como opinião); a altura de campo de 56 do Material 3; se todo o texto de corpo "deve" ser 16 no celular (é prática, não norma).

## Lista de referências abertas e conferidas

Total: 53 endereços distintos (alguns aparecem em mais de uma tabela), de 9 sistemas: WCAG 2.2, Apple, Material 3, Primer, Atlassian, Carbon, GOV.UK, Vercel Geist e Radix. Todas abriram e foram lidas, salvo as listadas na seção 5.

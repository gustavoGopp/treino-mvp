# Redesign, agente 7: a tela de apresentação (06/11/2026)

Para o Gustavo. Pergunta: o que a pesquisa diz para deixar a 1ª tela do app (boas-vindas) mais convidativa, sem esconder o aviso de segurança, e o que mais vale mudar no cadastro e no primeiro uso.

Marcas: **[fonte: autor ano, nível]** com os selos do projeto (robusta, moderada, um estudo, consenso; guia de plataforma e norma entram como consenso), **[medido]** (contado neste clone) e **[opinião]**. "(resumo)" quer dizer que só li o resumo; "(secundária)" quer dizer que só vi o estudo citado por outra fonte.

## Resumo em 5 linhas

1. A tela de hoje abre sem imagem, e a coisa maior e mais colorida nela é a caixa laranja do aviso. A primeira impressão se forma em menos de meio segundo e pesa a complexidade visual mais do que a cor (Lindgaard 2006; Tuch 2012; Reinecke 2013).
2. Proposta: em cima, o Boneco fazendo um exercício (é o próprio produto, não uma foto de banco de imagens). Embaixo dele, uma promessa curta sem prometer resultado no corpo, uma linha do que o app faz e o aviso.
3. O aviso fica inteiro e antes do botão, na letra do corpo do texto, num fundo calmo, com um título curto. Nem caixa de alerta, que assusta e gasta o tom de alerta que o "Senti algo" precisa, nem letra miúda cinza, que some. As lojas exigem o aviso (Apple 1.4.1, Google Play) e o PAR-Q+ fala primeiro do benefício e depois do risco.
4. Prometa o tempo de verdade: "4 passos, uns 3 minutos", não "4 perguntas rápidas" nem "1 minuto". Prometer menos do que o real aumenta a desistência (Yan et al. 2007, citado em Conrad 2010). O botão tem um verbo, sem fofura ("Começar"), e a tela fica em cerca de 75 palavras, das quais 38 são do aviso.
5. Fora da apresentação: dizer que os dados ficam no aparelho no momento em que o dado de saúde é pedido, dar dicas no contexto do 1º treino em vez de um tutorial, revisar as ordens que não são de segurança, e ainda 3 pontos menores. Nada aqui foi testado com pessoas.

## 1. O que medi e o que olhei

- **A tela de hoje no protótipo** (`prototipo/index.html`, `tela('boas-vindas'`, versão do começo desta tarefa; captura `reports/design/redesign/depois/claro/boas-vindas-relance.png`): **106 palavras** [medido: contagem do texto do modelo]. Os blocos: título 8, apresentação 21, título do aviso 6, aviso 33, selo 1, privacidade 22, "4 perguntas rápidas..." 7, botão 3 e cabeçalho 5. Nenhuma imagem. A caixa laranja ocupa cerca de 22% da altura no Pixel 7 e é a única área de cor forte além do botão [medido na captura].
- **O app de hoje** (`src/features/onboarding/BoasVindas.tsx`): 180 palavras, botão fora da vista ao abrir (127% da altura no Pixel 7) [medido pelo agente 2] e "Leva cerca de 1 minuto" no texto.
- **"4 perguntas rápidas"** não bate com o protótipo: depois da boas-vindas vêm a saúde (1 pergunta), a experiência (3), a rotina (3: dias, minutos e prioridades) e o equipamento [medido no protótipo]. São **4 passos**, mas 7 perguntas mais o equipamento. O tempo estimado do caminho proposto, com a leitura, fica perto de 3 minutos para a Ana (de 167 a 212 s entre as personas, pela tabela G do agente 2 [estimativa KLM + leitura]), e é bem mais para quem marca o equipamento item por item (a Carla faz 87 toques) [medido pelo agente 2].
- **Rascunhos novos no protótipo.** Durante esta tarefa, o protótipo ganhou duas apresentações (às 17:52): **A, "o Boneco recebe"** e **B, "o seu lugar"** (`boas-vindas-relance.png` e `boas-vindas-b-relance.png`). Contei **78 palavras** na A [medido]. O aviso está inteiro, mas em `--t-apoio` (letra menor) e na cor `--texto-2` (cinza), como nota de rodapé. A linha "O app monta o programa e mostra como fazer" some em telas com menos de 800 px de altura (`@media (max-height:800px) .boas .lede{display:none}`) [medido no CSS]. Comento os dois rascunhos na seção 4.
- **Não medi com pessoas.** Nenhum número aqui vem de alguém real usando o app.

## 2. O que a pesquisa diz

| Afirmação | Selo | Fonte |
|---|---|---|
| O apelo visual de uma página é julgado em 50 ms, e o julgamento é muito parecido com o de 500 ms | um estudo (3 experimentos) | Lindgaard et al. 2006 (resumo) |
| A complexidade visual pesa já com 17 ms de exposição; páginas simples e "com cara do que são" (prototípicas) agradam mais | um estudo (2 experimentos) | Tuch et al. 2012 (resumo) |
| A complexidade alta derruba o apelo; a baixa agrada tanto quanto a média; a cor pesa "muito menos" que a complexidade; quem tem mais de 45 anos prefere ainda mais as páginas simples | um estudo (548 pessoas, 450 páginas) | Reinecke et al. 2013 (**texto completo lido**) |
| O que é bonito parece mais fácil de usar, antes e depois do uso | um estudo | Tractinsky, Katz e Ikar 2000 (resumo) |
| Contraponto: a beleza se liga mais ao lado "de prazer" que à facilidade; depois do uso, a facilidade real passa a pesar; a ligação beleza → usabilidade parece exagerada | um estudo cada | Hassenzahl 2004; Hassenzahl e Monk 2010 (resumo) |
| Tutorial de telas em sequência (o "baralho de cartas") não deixou ninguém mais rápido nem mais certeiro; quem leu achou a tarefa **mais difícil** (nota 4,92 contra 5,49) | um estudo (70 pessoas, 4 apps) | Kendrick 2020, NN/g (lido) |
| Evite onboarding sempre que der; não promova recursos na 1ª abertura; peça um dado só quando ele é necessário para começar e diga por quê; a instrução deve ser breve e opcional | consenso | Kendrick 2020, NN/g, "Mobile-app onboarding" (lido) |
| Onboarding rápido e opcional; ensinar fazendo; dicas no contexto em vez de um fluxo único; "evite mostrar licenças e avisos no onboarding... se precisar, integre de forma equilibrada, sem atrapalhar"; pedir permissões e compras depois que a pessoa usou | consenso | Apple HIG, "Onboarding" (lido, versão de 10/06/2024) |
| Botão com verbo; "Send" funciona melhor que "Let's do it!"; "Get Started" para começar um fluxo e "Continue" nos passos, com consistência; evitar "nós" | consenso | Apple HIG, "Writing" e "Buttons" (lidos) |
| A página de início diz o que o serviço faz, **quanto tempo leva** e o que a pessoa vai precisar; o botão diz a ação ("Start now"); uma ação secundária é um link, não um 2º botão | consenso | GOV.UK Design System, "Start using a service" (lido) |
| Pedir dados antes de dar algo vai contra a reciprocidade: "dê algo antes de pedir"; quem recebeu o conteúdo antes revelou mais dados no formulário | consenso; o experimento é um estudo | Budiu 2014, NN/g (lido); Gamberini et al. 2007 (secundária, sem números) |
| Linguagem não controladora e informativa: "pode" e "dá para" no lugar de "deve" e "tem de"; oferecer escolha; dar uma razão com sentido para a pessoa | consenso (21 técnicas, 18 especialistas) | Teixeira et al. 2020, *Motivation Science* (**texto lido**, técnicas 3, 5 e 6) |
| A motivação autônoma se associa a fazer exercício e a manter | moderada | Teixeira et al. 2012 (já no projeto); Ntoumanis et al. 2021 (via agente 1) |
| Linguagem controladora ("você precisa") se associou a desfechos piores numa mensagem de saúde | um estudo | Miller et al. 2007 (resumo) |
| Contraponto: num experimento com 521 pessoas, trocar "você precisa" por uma frase de apoio não mudou nada (os autores acham que a diferença foi fraca demais) | um estudo | Altendorf et al. 2019, *Digital Health* (lido) |
| Quanto maior a duração anunciada (10, 20 ou 30 min), menos gente começa e termina | um estudo | Galesic e Bosnjak 2009 (resumo) |
| Prometer pouco tempo e passar dele aumenta a desistência; quem começa sabendo que é longo tolera melhor | um estudo | Yan, Conrad, Tourangeau e Couper 2007 (secundária, em Conrad et al. 2010, lido) |
| No celular, dizer a duração no convite não mudou a desistência (14 estudos, 39 amostras) | moderada (meta-análise) | Mavletova e Couper 2015 (resumo) |
| App de saúde "deve lembrar a pessoa de consultar um médico além de usar o app" | consenso (regra de loja) | Apple, App Review Guidelines 1.4.1 (lido) |
| App de saúde que não é dispositivo médico põe na descrição da loja que "não diagnostica, não trata, não cura nem previne" | consenso (regra de loja) | Google Play, "Health Content and Services" (lido) |
| O PAR-Q+ abre dizendo que a atividade física é "muito segura para a MAIORIA das pessoas" e só depois faz as perguntas | consenso (ferramenta de triagem) | PAR-Q+ 2025 (formulário lido, cópia pública) |
| Mensagens que falam do ganho convencem um pouco mais que as que falam da perda, em comportamentos de prevenção como a atividade física (efeito pequeno, r = 0,083) | moderada (meta-análise de 94 estudos) | Gallagher e Updegraff 2012 (resumo); Latimer et al. 2010, revisão sistemática (resumo, "promissor, sem evidência para regra definitiva") |
| As pessoas se habituam a avisos que sempre têm a mesma cara: a atenção cai a cada exposição | um estudo (fMRI + campo, n = 80) | Anderson et al. 2015, CHI (resumo) |
| 74% pularam a política de privacidade de uma rede social fictícia e 98% não viram uma cláusula absurda | um estudo (543 pessoas) | Obar e Oeldorf-Hirsch 2020 (secundária: imprensa) |
| Dado sensível (de saúde, por exemplo) pede um aviso curto "na hora", logo antes de ser coletado | consenso (recomendação de órgão regulador) | FTC 2013, "Mobile Privacy Disclosures" (resumos de terceiros; o PDF não abriu) |
| Imagens com informação prendem o olhar; imagens "de enfeite" são ignoradas | um estudo (rastreamento do olhar) | Nielsen 2010, NN/g (secundária) |
| Leitura silenciosa: cerca de 238 palavras por minuto | robusta | Brysbaert 2019 (via agente 2) |

**Apps de referência** (só o princípio; nenhum visual copiado). Fontes: as capturas e descrições da ScreensDesign e as centrais de ajuda; **não instalei nenhum app**.

| App | 1ª tela | O que pede antes de mostrar valor | Fonte |
|---|---|---|---|
| Hevy | Logo; depois, telas com o app em uso (o registro do treino) | Conta (Apple, Google ou e-mail) já na 2ª tela; depois unidades e permissões | ScreensDesign (capturas descritas) |
| Ladder | Logo; "Entrar com a Apple" sobre uma foto de academia; depois, um vídeo de tela inteira | Conta e permissão de rastreamento antes de tudo; depois, um questionário ("ache o seu time"), o treinador, o teste grátis e as notificações | ScreensDesign (capítulos do vídeo) |
| Fitbod | — | Experiência, objetivos e equipamento antes do 1º treino (cerca de 14 passos) | Central de ajuda do Fitbod e Lazyweb (por busca) |
| Freeletics | — | Dias de treino, equipamento e corrida antes do 1º treino; pagamento antes do plano (não conferido) | Central de ajuda do Freeletics (por busca); estudo de caso não conferido |
| Nike Training Club, Strong | não achei descrição verificável | NTC usa a conta Nike (página da Nike) | — |
| Smart Fit (Brasil) | não achei o fluxo do 1º acesso | A loja diz que quem não é aluno pode usar os vídeos grátis | App Store BR (por busca) |

Os princípios que se repetem [opinião, a partir da tabela]: (1) a 1ª tela mostra **o produto em uso** (o registro, um vídeo do treino) com uma frase e um botão; (2) quase todos pedem **conta** logo no começo. O treino-mvp não pede, e isso vale ser dito em 2 palavras ("Sem login"); (3) perguntar experiência, objetivo e equipamento antes do 1º treino é o normal da categoria. O cadastro em si não é um defeito, mas precisa ser curto e dizer o tamanho; (4) teste grátis, rastreamento e notificação no meio do onboarding são o que **não** copiar (fora do escopo, e contra a Apple HIG).

## 3. Achados e propostas

### A. A 1ª coisa que se vê é o aviso, e não o que o app oferece
- **Problema:** na tela de hoje do protótipo, a área de cor forte é a caixa laranja do "O que o app não faz" (cerca de 22% da altura) e não há imagem [medido na captura]. Num olhar rápido, a tela parece um termo de risco [opinião].
- **Evidência:** a 1ª impressão de apelo se forma em 50 a 500 ms [fonte: Lindgaard 2006, um estudo (resumo)], e o que a decide primeiro é a complexidade, depois a cara de "isto é um app de treino" [fonte: Tuch 2012, um estudo (resumo)]. A cor pesa pouco no apelo [fonte: Reinecke 2013, um estudo], mas a cor de alerta diz "perigo" [opinião]. O próprio PAR-Q+ abre com o benefício e a segurança para a maioria, e só depois pergunta [fonte: PAR-Q+ 2025, consenso]. Mensagens de ganho convencem um pouco mais para a atividade física [fonte: Gallagher e Updegraff 2012, moderada (resumo), efeito pequeno].
- **Proposta:** a ordem da tela vira: imagem do produto → promessa → o que faz → aviso → botão. O aviso perde a caixa laranja (ver o achado C).
- **Efeito esperado:** o olhar de relance pega primeiro o treino e depois o aviso, que continua lido antes do botão [opinião; a conferir com a medida de palavras à vista].

### B. Nada na tela mostra o produto
- **Problema:** nenhuma imagem; o diferencial do app (o guia animado) só aparece depois do cadastro [medido].
- **Evidência:** imagens que carregam informação prendem o olhar, e as de enfeite são ignoradas [fonte: Nielsen 2010, um estudo (secundária)]. "Dê algo antes de pedir" [fonte: Budiu 2014, consenso]. Os apps da categoria mostram o produto em uso na 1ª tela [fonte: ScreensDesign, observação]. Uma tela simples com cara de app de treino agrada mais [fonte: Tuch 2012].
- **Proposta:** o **Boneco** em cima, num palco de 25 a 30% da altura (cerca de 18% em telas baixas), fazendo em laço lento um exercício com **animação aprovada** (a escolha do exercício é do Gustavo; prefira um movimento que se reconheça de relance [opinião]). Com `prefers-reduced-motion`, ele fica parado no meio do movimento (o rascunho A já faz isso). O desenho e o motor não mudam: muda só o tamanho e a moldura do palco. Para o leitor de tela, uma frase ("O boneco do guia fazendo um agachamento búlgaro"). **Desempenho:** a 1ª pintura mostra um quadro parado (SVG pronto) e a animação começa depois que a página carrega, para não piorar o Lighthouse, que já está entre 59 e 73 [medido em `medidas.md`; a ordem de carga é opinião].
- **Efeito esperado:** a pessoa vê, antes de responder qualquer coisa, o que vai receber no treino [opinião]. Nenhuma promessa sobre o corpo.

### C. O aviso precisa ficar à vista sem assustar e sem sumir
- **Problema:** a tela de hoje usa uma caixa de alerta laranja para um aviso fixo. No rascunho A, o texto inteiro está lá, mas em letra menor e cinza, depois de uma linha divisória: parece letra miúda [medido no CSS: `.nota-aviso` em `--t-apoio` e `--texto-2`].
- **Evidência:** as lojas pedem o lembrete de consultar um médico [fonte: Apple 1.4.1, consenso; Google Play, consenso], e o plano do MVP pede o "o que não faz" na boas-vindas. A Apple HIG pede avisos "integrados de forma equilibrada, sem atrapalhar" [fonte: Apple HIG, consenso]. O que parece texto jurídico é pulado [fonte: Obar e Oeldorf-Hirsch 2020, um estudo (secundária)]. Um aviso que sempre tem a cara de alerta perde a atenção a cada exposição [fonte: Anderson et al. 2015, um estudo (resumo)]: o tom de alerta deve ficar para o que é alerta de verdade (o "Senti algo" e o "sim" da triagem) [opinião, alinhada à decisão 8 da proposta].
- **Proposta:** o bloco "O que o app não faz" fica com o **texto intacto** (`seguranca.sem-diagnostico`, com o selo), na **letra e na cor do corpo do texto** (`--t-corpo`, `--texto`). O título curto vai em negrito e um ícone "i" (informação, não triângulo) fica à esquerda, num fundo de superfície neutra, sem borda lateral colorida. Ele fica **entre a promessa e o botão**, e o botão vem depois dele na ordem de leitura e de foco (como no rascunho A: em tela pequena ou com zoom, a pessoa passa pelo aviso antes de chegar ao botão). Ele nunca vai para um link, um "Termos" ou uma folha.
- **Efeito esperado:** o aviso continua lido antes de começar e na mesma letra do resto, e a tela deixa de parecer um termo de risco. Ele se distingue pela forma (título, ícone, fundo), não só pela cor.

### D. Texto demais para uma 1ª tela
- **Problema:** 106 palavras no protótipo de hoje e 180 no app [medido]. O Gustavo pediu menos texto (proposta §15).
- **Evidência:** "se dá para usar menos palavras, use"; uma ideia por tela [fonte: Apple HIG "Writing", consenso]. A 238 palavras por minuto, 106 palavras levam cerca de 27 s [fonte: Brysbaert 2019, robusta (resumo); conta minha].
- **Proposta:** **cerca de 75 palavras no total, das quais 38 são do aviso (título, texto e selo), e até 40 fora dele.** Sai a lista de 3 recursos, que repete o título ("Só com o equipamento que você tem"), e a frase do que o app faz cabe numa linha só. A linha do que o app faz **não some** em tela baixa (no rascunho A ela some abaixo de 800 px de altura, e é justamente o "o que o app faz" que o plano pede).
- **Efeito esperado:** de cerca de 27 s para cerca de 19 s de leitura [conta]; o botão à vista sem rolar a 412 × 915 (a meta para 360 × 740 é a mesma, a medir).

### E. A promessa de tempo não bate com o cadastro
- **Problema:** "4 perguntas rápidas" (protótipo) e "Leva cerca de 1 minuto" (app). São 4 passos e 7 perguntas mais o equipamento, e quase 3 minutos com a leitura [medido; estimativa do agente 2].
- **Evidência:** a página de início deve dizer quanto tempo leva [fonte: GOV.UK, consenso]. Prometer pouco e passar dele aumenta a desistência [fonte: Yan et al. 2007, um estudo (secundária)]. Anunciar muito tempo reduz quem começa [fonte: Galesic e Bosnjak 2009, um estudo (resumo)]. Só anunciar a duração não muda a desistência no celular [fonte: Mavletova e Couper 2015, moderada (resumo)]. Conclusão [opinião]: dizer a verdade, curta, sem enfeitar.
- **Proposta:** embaixo do botão, **"4 passos, uns 3 minutos"**. Na tela de equipamento, se a pessoa abrir "Item por item", uma linha: "Leva mais; a foto ou o lugar são mais rápidos".
- **Efeito esperado:** ninguém se sente enganado no meio do caminho [opinião]. O número de passos bate com o "1 de 4" do cabeçalho.

### F. O botão e o título
- **Problema:** "Entendi, vamos começar" junta o aceite e um "vamos" (nós) [medido]. O título de hoje ocupa 3 linhas [medido pelo agente 4].
- **Evidência:** botão com verbo e sem fofura; "Get Started" para começar um fluxo; evitar "nós" [fonte: Apple HIG, consenso]. O botão diz a ação [fonte: GOV.UK, consenso]. Linguagem informativa, que não pressiona [fonte: Teixeira et al. 2020, consenso]. O efeito da troca de palavras sozinha é incerto [fonte: Altendorf 2019, um estudo, nulo; Miller 2007, um estudo (resumo)].
- **Proposta:** botão **"Começar"**. O toque continua gravando `avisoAceitoEm`, e o aviso fica logo acima do botão. Se o Gustavo quiser o aceite escrito, **"Entendi, começar"** (ver o conflito 1). Título com **até 8 palavras**, que diga o que a pessoa recebe e não o que vai acontecer com o corpo dela: "Treino de força feito para o que você tem" (8 palavras, rascunho A) ou "Seu treino, com o que você tem" (6). Ambos são verdadeiros desde a pergunta de objetivo (força, não só hipertrofia).
- **Efeito esperado:** 1 a 3 palavras a menos no botão e o título em 2 linhas a 360 px [a medir].

### G. A privacidade dita cedo demais e longa demais
- **Problema:** a boas-vindas explica a foto do equipamento (22 palavras) antes de a pessoa decidir se vai usar foto [medido].
- **Evidência:** aviso curto "na hora", logo antes de coletar um dado sensível [fonte: FTC 2013, consenso (resumos)]. Pedir e explicar o dado quando ele é necessário [fonte: Kendrick 2020, NN/g, consenso]. A tela da foto do protótipo já diz que a foto perde a localização e não fica no servidor [medido: `prototipo/index.html`, tela da foto].
- **Proposta:** na boas-vindas, uma linha com cadeado: **"Seus dados ficam só neste celular. Sem login."** A 1ª frase é o link que abre a folha atual de privacidade, com o texto inteiro, sem mudança. O detalhe da foto fica na tela da foto (já está lá) e na folha.
- **Efeito esperado:** 22 → 8 palavras; "Sem login" diz em 2 palavras o que separa o app dos outros da categoria [opinião, a partir da tabela de apps]. Nenhuma informação some: muda de lugar.

## 4. Recomendação para a tela

### A recomendada: "o Boneco recebe" (o rascunho A, com 5 ajustes)

De cima para baixo, numa tela só, sem barra de progresso (a boas-vindas não é uma pergunta; o "1 de 4" começa na saúde):

1. **Topo:** nome do app pequeno à esquerda; à direita, um link pequeno "Meus dados" (hoje ele serve para importar um backup num celular novo: manter).
2. **Imagem:** o Boneco num palco de 25 a 30% da altura, em laço lento; parado com movimento reduzido; um quadro pronto na 1ª pintura.
3. **Título (até 8 palavras):** "Treino de força feito para o que você tem".
4. **Uma linha do que faz (até 10 palavras), que não some em tela baixa:** "Monta o programa, mostra cada exercício e diz o porquê."
5. **O aviso, intacto:** título em negrito "O que o app não faz", ícone "i", o texto de `seguranca.sem-diagnostico` com o selo, na letra do corpo do texto e num fundo neutro.
6. **Privacidade, 1 linha:** cadeado + "Seus dados ficam só neste celular. Sem login." (o link abre a folha).
7. **Botão:** "Começar". Embaixo, em letra de apoio: "4 passos, uns 3 minutos".

**Palavras-alvo:** cerca de 75 no total (contei 76 com o "Meus dados"), das quais 38 são do aviso e **até 40 fora dele** [medido na contagem do texto proposto]. O rascunho A tem 78; os ajustes trocam a lista de recursos pela linha única e pela privacidade.

**Os 5 ajustes ao rascunho A:** (1) o aviso volta para a letra e a cor do corpo do texto, com título; (2) a linha do que o app faz não some abaixo de 800 px; (3) a lista de 3 recursos vira a linha única mais a privacidade (o "porquê com a fonte" entra na linha); (4) "4 passos curtos" vira "4 passos, uns 3 minutos"; (5) a animação começa depois da 1ª pintura.

### Variação 1: "o seu lugar" (o rascunho B), com uma condição
Os 4 desenhos de lugar em cima, no lugar do Boneco. A promessa "Treine onde estiver, com o que tiver" fica, e o resto é igual à recomendada. Vantagens: é mais leve para carregar, e o desenho diz o diferencial do equipamento de relance [opinião]. **Condição:** o desenho do "Corpo livre" **não está aprovado** (adendo da Fase 3). Esta variação só vale depois que o Gustavo aprovar um dos 5 desenhos novos, porque seria o 1º desenho que todo mundo vê. Risco: mostra o equipamento, mas não o guia, que é o que nenhum concorrente da tabela tem [opinião].

### Variação 2: duas telas, convite e depois aviso
Tela 1: o Boneco, o título, a linha do que faz e o botão "Começar" (cerca de 20 palavras). Tela 2, "Antes de começar": o aviso intacto, a privacidade e o botão "Entendi" (cerca de 50 palavras). Vantagens: a 1ª tela fica só convite, e o aviso ganha uma tela inteira sem competir com nada. Custo: **+1 toque e +1 tela para todos** (Ana de 11 para 12 toques no caminho proposto pelo agente 2, ainda dentro do teste de até 13) e o risco de a 2ª tela parecer um termo que se aceita sem ler [fonte: Obar e Oeldorf-Hirsch 2020 (secundária)]. Eu fico com a recomendada; esta é a que faz sentido se o Gustavo achar que, mesmo calmo, o aviso ainda pesa na 1ª tela [opinião].

## 5. Outros pontos do cadastro e do primeiro uso (6)

1. **A privacidade dita na hora do dado de saúde.** Na triagem, uma linha curta embaixo do título: "Fica só neste celular." Evidência: dado sensível pede aviso "na hora" [fonte: FTC 2013, consenso (resumos)]; na LGPD, dado de saúde é sensível (princípio do projeto). **Pequeno** (1 linha em `Triagem.tsx`).
2. **A triagem abre como o PAR-Q+: o benefício antes das condições.** Uma linha antes da lista, traduzida do PAR-Q+: "Treinar é seguro para a maioria das pessoas. Esta pergunta vê se vale falar com um profissional antes." Evidência: é a abertura do próprio PAR-Q+ 2025 [fonte: consenso]; mensagens de ganho [fonte: Gallagher e Updegraff 2012, moderada (resumo)]. **Pequeno**, mas **é texto de segurança novo: decisão do Gustavo** (conflito 2).
3. **Dicas no contexto do 1º treino, nunca um tutorial em sequência.** Na 1ª vez em que aparece a reserva (RIR), o descanso e o "Senti algo", uma dica de 1 linha perto do próprio botão, que some depois de usada e que pode ser revista no "por quê?". Evidência: o tutorial em sequência não ajudou e fez a tarefa parecer mais difícil [fonte: Kendrick 2020, um estudo]; dicas no contexto e ensinar fazendo [fonte: Apple HIG, consenso]. **Pequeno** a médio (`Treino.tsx`; 1 marca no estado, a combinar com o agente 3).
4. **Uma revisão das ordens que não são de segurança.** Trocar "você deve" e "tem de" por "dá para" e "pode" nos textos de ajuda e nos botões; tirar o "nós" ("Montamos", "Supomos halteres de 2 a 40 kg" → "O app supõe..."); botões consistentes: "Começar" → "Continuar" → "Gerar meu programa" → "Começar o treino". Evidência: linguagem informativa [fonte: Teixeira et al. 2020, consenso]; verbos e consistência, sem "nós" [fonte: Apple HIG, consenso]; o efeito sozinho é incerto [fonte: Altendorf 2019, um estudo, nulo]. **Ficam de fora** os textos com selo e os de segurança ("pare e procure avaliação" é ordem de propósito: a Apple pede o tom direto quando o assunto é sério). **Pequeno** (textos).
5. **Dizer que dá para mudar depois, onde a pessoa hesita.** Uma linha na rotina e no equipamento: "Dá para mudar depois, em Meus dados." Evidência: oferecer escolha, inclusive a de adiar [fonte: Teixeira et al. 2020, técnica 6, consenso]; o erro aqui é barato, porque tudo se muda em "Meus dados" [fonte: agente 2, achado A]. **Pequeno.**
6. **Mostrar o guia antes de pedir dados, a um toque.** O palco do Boneco na boas-vindas abre o guia daquele exercício (o app de hoje tem o link "Ver o guia de execução", que o protótipo tirou), com "‹ Voltar" para a boas-vindas e sem palavra a mais na tela (o rótulo do link vai só para o leitor de tela). Evidência: dar antes de pedir [fonte: Budiu 2014, consenso; Gamberini 2007, um estudo (secundária)]; uma ação secundária é um link, não um 2º botão [fonte: GOV.UK, consenso]. **Pequeno** (o guia já existe fora do treino). Cuidado: o palco abre o guia, e o "Começar" continua sendo o único botão.

## 6. O que não fazer

- **Carrossel de 3 ou 4 telas de apresentação antes do cadastro.** Não ajuda e fez a tarefa parecer mais difícil [fonte: Kendrick 2020, um estudo]; a NN/g e a Apple pedem para evitar [consenso].
- **Foto de banco de imagens, corpo "ideal" ou antes e depois.** Imagem de enfeite é ignorada [fonte: Nielsen 2010 (secundária)], e corpo como promessa fere "sem promessa de resultado" (princípio do projeto).
- **Prova social ou números inventados** ("milhares já treinam", "4,9 estrelas"). Fere "motivação sem manipulação", e o app não tem esses dados.
- **Esconder o aviso** num link, em "Termos", numa folha ou em letra miúda cinza. As lojas e o plano pedem o aviso à vista [fonte: Apple 1.4.1; Google Play; PLANO-MVP], e o texto com cara de jurídico é pulado [fonte: Obar e Oeldorf-Hirsch 2020 (secundária)].
- **Caixa de alerta (laranja, vinho ou com triângulo) para o aviso fixo.** Ela gasta o tom de alerta que o "Senti algo" e o "sim" da triagem precisam [fonte: Anderson et al. 2015, um estudo (resumo); opinião].
- **Caixa "Li e aceito" obrigatória.** É 1 toque a mais e não faz ninguém ler [fonte: Obar e Oeldorf-Hirsch 2020 (secundária); opinião]; o toque no botão logo abaixo do aviso já grava o aceite.
- **Prometer menos tempo do que o real** ("1 minuto", "rapidinho"). Quem passa do tempo prometido desiste mais [fonte: Yan et al. 2007 (secundária)].
- **Pedir login, e-mail, nome, notificação ou câmera na abertura.** Fora do escopo (sem login), contra a reciprocidade [fonte: Budiu 2014] e contra a Apple HIG (permissão no contexto) [consenso].
- **Botão "fofo"** ("Bora!", "Partiu!", "Vamos nessa"). A Apple prefere o verbo claro [consenso]; em português, "Bora" envelhece e não diz a ação [opinião].
- **Splash animado ou esperar o Boneco carregar para mostrar a tela.** A Apple pede splash só se necessário e breve [consenso]; o desempenho já está abaixo da meta [medido].
- **Urgência ou culpa** ("comece hoje ou...", contagem regressiva). Fere o princípio do projeto.
- **Usar na 1ª tela um desenho não aprovado** (o "Corpo livre" da variação 1, ou uma animação improvisada). Fere "qualidade do guia" e o adendo da Fase 3.

## 7. Conflitos com "o que não muda" (para o Gustavo decidir)

1. **O botão sem "Entendi".** Hoje, o toque em "Entendi, vamos começar" grava `avisoAceitoEm`. Com "Começar", o aceite continua gravado e o aviso fica logo acima, mas o botão deixa de dizer "entendi". Se o Gustavo preferir o aceite escrito, use "Entendi, começar". O texto do aviso não muda em nenhum dos casos.
2. **A frase do PAR-Q+ na triagem (outro ponto 2)** é texto de segurança novo, tirado do PAR-Q+, que o projeto já segue. Não muda nada no bloqueio, na liberação nem nas 9 perguntas.
3. **Variação 1** depende de aprovar um desenho de "Corpo livre".

Pedidos ao domínio: nenhum. Tudo fica em `src/features/onboarding/`, nos textos e no CSS.

## 8. Fontes (com o que foi lido)

- Lindgaard G, Fernandes G, Dudek C, Brown J (2006). Attention web designers: You have 50 milliseconds to make a good first impression! *Behaviour & Information Technology* 25(2):115-126, doi 10.1080/01449290500330448. **Resumo** e notícias da época. https://doi.org/10.1080/01449290500330448
- Tuch AN, Presslaber EE, Stöcklin M, Opwis K, Bargas-Avila JA (2012). The role of visual complexity and prototypicality regarding first impression of websites. *Int J Human-Computer Studies* 70(11):794-811. **Resumo** (Google Research). https://research.google/pubs/pub38315/
- Reinecke K, Yeh T, Miratrix L, Mardiko R, Zhao Y, Liu J, Gajos KZ (2013). Predicting users' first impressions of website aesthetics with a quantification of perceived visual complexity and colorfulness. CHI '13, p. 2049-2058. **Texto completo lido** (resultados e discussão). https://wildlab.cs.washington.edu/Publications_files/Reinecke_CHI2013.pdf
- Tractinsky N, Katz AS, Ikar D (2000). What is beautiful is usable. *Interacting with Computers* 13(2):127-145. **Resumo**. https://academic.oup.com/iwc/article/13/2/127/898608
- Hassenzahl M (2004). The interplay of beauty, goodness, and usability in interactive products. *Human-Computer Interaction* 19:319-349; Hassenzahl M, Monk A (2010), *HCI* 25(3). **Resumo e fontes secundárias**. https://edutechwiki.unige.ch/en/Aesthetics_and_usability
- Kendrick A (2020). Mobile tutorials: wasted effort or efficiency boost? NN/g, 08/03/2020. **Lido** (70 pessoas, 4 apps, números de sucesso, facilidade e tempo). https://www.nngroup.com/articles/mobile-tutorials/
- Kendrick A (2020). Mobile-app onboarding: an analysis of components and techniques. NN/g, 21/06/2020. **Lido**. https://www.nngroup.com/articles/mobile-app-onboarding/
- Budiu R (2014). Login walls stop users in their tracks. NN/g, 02/03/2014; e The reciprocity principle: give before you take in web design, NN/g, 16/02/2014. **Lidos**. O experimento de Gamberini et al. 2007 (Universidade de Pádua) foi visto só pela descrição da NN/g, sem números. https://www.nngroup.com/articles/login-walls/ · https://www.nngroup.com/articles/reciprocity-principle/
- Nielsen J (2010). Photos as web content. NN/g. **Só fontes secundárias** (índice da NN/g e resumo de terceiros). https://www.nngroup.com/topic/eyetracking/?page=2
- Apple. Human Interface Guidelines: "Onboarding" (registro de mudanças de 10/06/2024), "Writing" (16/12/2025) e "Buttons". **Lidos** (pela versão em JSON da própria página). https://developer.apple.com/design/human-interface-guidelines/onboarding · https://developer.apple.com/design/human-interface-guidelines/writing
- Apple. App Review Guidelines, 1.4.1. **Lido** (texto da regra). https://developer.apple.com/app-store/review/guidelines/
- Google Play Console Help. Health Content and Services. **Lido** (o aviso vai na descrição do app). https://support.google.com/googleplay/android-developer/answer/16679511
- GOV.UK Design System. Start using a service. **Lido**. https://design-system.service.gov.uk/patterns/start-using-a-service/
- Teixeira PJ, Marques MM, Silva MN et al. (2020). A classification of motivation and behavior change techniques used in self-determination theory-based interventions in health contexts. *Motivation Science* 6(4):438-455, doi 10.1037/mot0000172. **Versão aceita lida** (tabela 3, técnicas 3, 5 e 6). https://discovery.ucl.ac.uk/id/eprint/10107097/
- Teixeira PJ et al. (2012), *IJBNPA* 9:78; Ntoumanis N et al. (2021), *Health Psychol Rev* 15(2):214-244. Já no projeto (`design-v2.md`, agente 1); não reabertos.
- Miller CH, Lane LT, Deatrick LM, Young AM, Potts KA (2007). Psychological reactance and promotional health messages. *Human Communication Research* 33(2):219-240, doi 10.1111/j.1468-2958.2007.00297.x. **Resumo** (por busca).
- Altendorf MB, van Weert JCM, Hoving C, Smit ES (2019). Should or could? Testing the use of autonomy-supportive language and the provision of choice in online computer-tailored alcohol reduction communication. *Digital Health*. **Lido** (desenho, n = 521, resultados nulos, exemplos de frase). https://pmc.ncbi.nlm.nih.gov/articles/PMC6393822/
- Galesic M, Bosnjak M (2009). Effects of questionnaire length on participation and indicators of response quality in a web survey. *Public Opinion Quarterly* 73(2):349-360, doi 10.1093/poq/nfp031. **Resumo** (o PDF deu 403).
- Conrad FG, Couper MP, Tourangeau R, Peytchev A (2010). The impact of progress indicators on task completion. *Interacting with Computers* 22(5):417-427. **Lido** (inclui a descrição de Yan et al. 2007 e de Crawford et al. 2001). https://pmc.ncbi.nlm.nih.gov/articles/PMC2910434/
- Yan T, Conrad F, Tourangeau R, Couper M (2007, AAPOR; publicado em 2011 no *Int J Public Opinion Research* 23:131-147). **Só a descrição em Conrad et al. 2010**.
- Mavletova A, Couper MP (2015). A meta-analysis of breakoff rates in mobile web surveys. Em *Mobile Research Methods*, Ubiquity Press, doi 10.5334/bar.f. **Resumo**. https://www.ubiquitypress.com/site/chapters/10.5334/bar.f
- PAR-Q+ Collaboration (2025). PAR-Q+: The Physical Activity Readiness Questionnaire for Everyone. **Formulário lido** (abertura e instruções), numa cópia pública hospedada por um município canadense. https://southlake.ca/wp-content/uploads/2025/02/PARQPlus2025-Form-fillable.pdf
- Gallagher KM, Updegraff JA (2012). Health message framing effects on attitudes, intentions, and behavior: a meta-analytic review. *Ann Behav Med* 43:101-116, doi 10.1007/s12160-011-9308-7. **Resumo**.
- Latimer AE, Brawley LR, Bassett RL (2010). A systematic review of three approaches for constructing physical activity messages. *IJBNPA* 7:36. **Resumo**. https://pmc.ncbi.nlm.nih.gov/articles/PMC2885311/
- Anderson BB, Kirwan CB, Jenkins JL, Eargle D, Howard S, Vance A (2015). How polymorphic warnings reduce habituation in the brain: insights from an fMRI study. CHI '15, p. 2883-2892. **Resumo**.
- Obar JA, Oeldorf-Hirsch A (2020). The biggest lie on the internet: ignoring the privacy policies and terms of service policies of social networking services. *Information, Communication & Society* 23(1). **Só fontes secundárias** (imprensa: 543 pessoas, 74%, 98%).
- Federal Trade Commission (2013). Mobile Privacy Disclosures: Building Trust Through Transparency. **Resumos de escritórios de advocacia**; o PDF não abriu. https://www.ftc.gov/sites/default/files/documents/reports/mobile-privacy-disclosures-building-trust-through-transparency-federal-trade-commission-staff-report/130201mobileprivacyreport.pdf
- Brysbaert M (2019). *J Memory and Language* 109:104047. Via agente 2 (resumo).
- Apps: ScreensDesign, capturas descritas de Hevy e Ladder (https://screensdesign.com/apps/hevy-workout-tracker-gym-log/ · https://screensdesign.com/apps/ladder-strength-training-plans/); central de ajuda do Fitbod (https://help.fitbod.me/hc/en-us/sections/360001927994-Getting-Started) e do Freeletics (https://help.freeletics.com/hc/en-us/articles/115004675229), **por busca**; Lazyweb (contagem de passos do Fitbod, por busca); página de membros da Nike (https://nike.com/membership/sport-wellness-apps); App Store BR do Smart Fit (por busca). Nenhum app foi instalado; os rótulos "Unlock Pro" das capturas são da ScreensDesign, não dos apps.
- No projeto: `agente-2-cadastro.md` (seções 2, 4D e 4G), `proposta.md` (§§ 3, 12 e 15), `prototipo/index.html` (boas-vindas antiga e rascunhos A e B), `src/features/onboarding/BoasVindas.tsx`, `docs/PLANO-MVP.md` (jornada).

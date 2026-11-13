# A decisão: o desenho do Boneco

Decidido pelo Gustavo em 13/11/2026, ao fim da rodada 4 (`rodadas.md`): "pode ser 1.1 e 10.1. Vamos deixar esses 2 como opções para a pessoa escolher na configuração e o cinza como default".

São **dois desenhos do mesmo corpo**:

| | Desenho | Papel | Prancha final |
|---|---|---|---|
| **Cinza** | cinza, traço fino escuro, sem roupa, com as linhas do corpo | **padrão** | `final/prancha-cinza.png` |
| **Cor de pele** | cor de pele, contorno suave, de short e tênis, com cabelo e as linhas do corpo | **opção**, à escolha da pessoa na configuração | `final/prancha-pele.png` |

As pranchas mostram, ao lado do boneco de hoje: em pé de frente, de lado e de costas; braços acima da cabeça; agachamento; flexão; supino no banco; ajoelhado puxando o cabo; a mão segurando o halter e o pé apoiado em tamanho grande; tema claro e tema escuro; palco e miniatura de 96 px. Geram-se de novo com `node scripts/boneco-desenho/final.mjs`. As fichas dos dois estilos, com todos os números, estão em `scripts/boneco-desenho/estilos-finais.mjs`.

Selos usados abaixo: **decisão** (o Gustavo escolheu olhando), **herdada** (decisão dele anterior a esta sessão, que continua valendo), **desenho** (escolha minha, que ele viu e aprovou no conjunto, mas não discutiu em separado), **medido** (número medido nesta sessão) e **em aberto** (ninguém decidiu).

## A ficha

### Proporções

- As reais da tabela do corpo da sessão da animação nova (`src/engine/novo/dados/corpo-homem.json`, ANSUR II): estatura de 175,8 cm, cabeça de 22,85 cm, cerca de 7,7 cabeças de altura. Sem estilização. **decisão** (pergunta 5 do gosto: proporção real; e os conceitos de proporção estilizada saíram na rodada 1)
- A largura de cada parte do corpo, de frente e de lado, foi desenhada à mão a partir das larguras medidas no corpo de referência, com poucas estações por parte (coxa mais cheia em cima, panturrilha atrás, antebraço que afina). Estão nas tabelas de `scripts/boneco-desenho/boneco-prova.mjs`. **desenho**

### Cabeça, rosto e cabelo

- Cabeça em forma de ovo, com queixo, sem rosto. **decisão** (pergunta 2: sem rosto)
- Cinza: sem cabelo. Cor de pele: cabelo curto e escuro, que mostra para onde a cabeça olha; de costas, o cabelo cobre a nuca. **decisão** (ele preferiu o 1.1 ao 1.2, que tinha cabelo; e o 10.1 tem cabelo)

### Mãos e pés

- Mão em luva com polegar. Fechada em volta do cabo quando segura, com as linhas dos dedos; espalmada quando apoia no chão; solta, com o polegar, quando o braço pende. **decisão** (variação C da rodada 2)
- Cinza: pé descalço de forma simples, sem dedos (no desenho grande, uma linha marca o dedão e outra o tornozelo). Cor de pele: tênis escuro com sola. **decisão** pelo conjunto; a forma do pé e do tênis é **desenho**.

### Tronco e articulações

- De lado, o tronco acompanha a curva da coluna e a bacia é uma forma própria; a coxa sai do quadril sem emenda. Joelho e cotovelo são a união arredondada das duas partes, sem bolinha. **desenho**
- **As linhas do corpo:** os grupos musculares (peitoral, abdômen, oblíquos, dorsal, trapézio, deltoide, bíceps, tríceps, antebraço, glúteo, quadríceps, posteriores, adutores, panturrilha, tibial) e a rótula ficam sempre desenhados em linha fina, sem preenchimento. É o que dá referência para ler a inclinação do tronco e a posição do joelho. **decisão** (o que separa o 1.1 do 1, que ele achou "muito simples", e o 10.1 do 10)
- A bolinha verde na junta-chave, que o boneco de hoje tem, não entrou no desenho novo. **em aberto**

### Roupa

- Cinza: nenhuma. **decisão**
- Cor de pele: short escuro e tênis. O short é opaco. Ele só fica claro, deixando ver o músculo, quando o músculo que trabalha está debaixo dele (glúteo, quadríceps, adutores, posteriores). **decisão** (pergunta 8c: o músculo por baixo da roupa; rodada 3: "essa bunda tá muito marcada", "sem o short")

### Traço

| | Palco | Miniatura (96 px) | Cor |
|---|---|---|---|
| Contorno de fora | 1,25 px | 1 px | cinza: escuro (`#1d2a36` no tema claro, `#e7eef2` no escuro); cor de pele: um tom 42% mais escuro da própria cor de cada parte |
| Linhas de dentro (grupos musculares, divisões, dedos) | 0,8 px | não aparecem | cinza: `#9fabb5` / `#43515b`; cor de pele: `#c08b64` / `#a67750` |

- O traço fino é **decisão** (variação D da rodada 2). As espessuras em pixels são **desenho**: nas rodadas o traço estava em centímetros do corpo (0,6 cm), o que dava cerca de 1 px no palco das pranchas e menos de meio pixel na miniatura. Na ficha ele passa a ser fixo em pixels, qualquer que seja o zoom, e as pranchas finais já saem assim.

### Cores e contraste

Contraste calculado pela fórmula da WCAG (**medido**; os números estão em `final/medidas.json`). A referência é 3:1 para partes de um gráfico.

**Cinza (padrão)**

| Par | Tema claro | Tema escuro |
|---|---|---|
| Corpo (`#d5dde3` / `#5e6e7a`) × fundo do palco (`#f7f9fa` / `#10171b`) | 1,3 | 3,4 |
| Traço × fundo | 13,8 | 15,4 |
| Traço × corpo | 10,6 | 4,5 |
| Linhas do corpo × corpo | 1,7 | 1,6 |
| Músculo principal (`#d62e26` / `#f45248`) × corpo | 3,6 | **1,5** |
| Músculo secundário (`#ec961c` / `#f5aa3c`) × corpo | **1,7** | 2,7 |
| Principal × secundário | 2,1 | 1,7 |
| Borda escura do músculo × corpo | 10,6 | 3,4 |

Leitura: o corpo claro quase não contrasta com o fundo claro, e quem desenha a figura é o traço, que passa com folga. As linhas do corpo são fracas de propósito (são referência, não informação). O vermelho sobre o cinza do tema escuro e o laranja sobre o cinza do tema claro ficam abaixo de 3:1; nos dois casos é a borda escura do músculo que segura a forma. É o mesmo limite já registrado para o boneco de hoje (`docs/revisoes/design.md`, seção 3).

**Cor de pele (opção)**

| Par | Tema claro | Tema escuro |
|---|---|---|
| Corpo (`#d9a47c` / `#cf9a72`) × fundo | 2,1 | 7,3 |
| Traço (`#876d5a` / `#816754`) × fundo | 4,6 | 3,5 |
| Traço × corpo | 2,2 | 2,1 |
| Linhas do corpo × corpo | 1,3 | 1,6 |
| Músculo principal (`#cb5747`) × corpo | **1,9** | **1,7** |
| Músculo secundário (`#eaa594`) × corpo | **1,1** | **1,2** |
| Principal × secundário | 2,1 | 2,1 |
| Borda do principal (`#a43d2d`) × corpo | 2,9 | 2,6 |
| Borda do secundário (`#c77f6c`) × corpo | **1,4** | **1,3** |
| Short (`#2c3d50` / `#a9b8c6`) × fundo | 10,5 | 8,9 |
| Short × corpo | 5,1 | **1,2** |
| Cabelo × fundo | 14,5 | 3,9 |

Leitura: este desenho depende mais do tom do que da claridade. **O músculo secundário é o ponto fraco:** o tom claro sobre a pele tem 1,1:1 e a borda dele 1,4:1, então quem não distingue bem as cores pode não vê-lo. Proposta minha, que não foi mostrada ao Gustavo: dar ao secundário a borda do principal (`#a43d2d`, 2,9:1 sobre a pele). No tema escuro, o short claro quase se confunde com a pele (1,2:1); proposta: um short mais escuro ou mais frio nesse tema. **em aberto**

### Como o músculo aparece

- Direto no corpo, em cor sólida, sem transparência. **herdada**
- Três níveis, que não dependem só da cor: **principal** em cor cheia, com borda e as divisões por dentro; **também trabalha** em cor mais clara, com borda e sem divisões; **só ajuda a firmar** listrado, com a borda tracejada. **herdada** (os três níveis e as listras) e **desenho** (as divisões e a borda tracejada)
- Com forma de músculo, e não mancha. **decisão** (pergunta 8b: "o formato do músculo" incomodava)
- Cinza: vermelho no principal e laranja no secundário, com borda escura. **herdada**
- Cor de pele: o principal num vermelho mais suave (`#cb5747`) e o secundário num tom claro dele (`#eaa594`), porque o laranja some sobre a pele. Isso muda, só nesta opção, a regra antiga "laranja no secundário": ele escolheu as versões que já vinham assim, mas a troca foi um teste meu e não foi discutida em separado. **em aberto** (reconfirmar)
- Na opção cor de pele, o músculo nunca fica por cima da roupa: aparece por baixo do short, que fica claro. **decisão** (pergunta 8c)

### O lado de longe

- Quando o braço ou a perna do outro lado não coincide com o de perto, ele é desenhado antes, num tom próprio: no cinza, um tom em direção ao fundo (mais claro no tema claro, `#e6ebef`; mais escuro no tema escuro, `#3f4d58`), como no boneco de hoje; na cor de pele, um tom mais escuro (`#c28e68`). **herdada** (o lado de longe mais claro no cinza) e **desenho** (o tom na cor de pele)
- Nas pranchas só há um caso (o braço que não puxa, no cabo). O tom de longe do cinza claro tem 1,1:1 contra o fundo: quem o segura é o traço. **medido**

### Sombra

- Nenhuma: cada parte de uma cor só, sem sombra própria e sem sombra no chão. **decisão** (pergunta 4: chapado; e os conceitos com sombra saíram na rodada 1)

### O que some na miniatura

- Somem: as linhas do corpo, as divisões do músculo principal, o polegar e as linhas dos dedos.
- Ficam: a silhueta, o traço de fora (1 px), o short, o tênis e o cabelo (na cor de pele) e o músculo que trabalha, com a borda. **desenho**, conferido a olho nas pranchas finais.

### A régua de realismo

Na régua de 1 (pictograma de placa) a 7 (foto) de `referencias.md`: o boneco de hoje está na nota 2; o **cinza** novo fica entre 3 e 4 (proporção real, pouco detalhe, com as linhas dos grupos musculares); o **cor de pele** fica na nota 4, encostando na 5 por causa das linhas dos músculos. As tentativas recusadas antes desta sessão estavam na 2 (formas de fórmula) e nas 5 e 6 (malha 3D).

## Onde a pessoa escolhe

- Na configuração: hoje, "Meus dados" → "Estilo do boneco". Duas opções, com o **cinza como padrão**. **decisão**
- O que acontece com o estilo "Silhueta", que hoje também está nessa tela, não foi discutido. **em aberto**

## O que ficou em aberto

Nada disto foi decidido pelo Gustavo; cada item é uma pergunta para ele.

1. **Contraste do músculo secundário na cor de pele** (1,1:1): aceitar a borda mais escura que proponho?
2. **Secundário laranja (cinza) ou tom claro do principal (cor de pele):** duas regras, uma por opção, ou uma só?
3. **Short claro no tema escuro**, que se confunde com a pele (1,2:1): trocar por um short mais escuro?
4. **Tom de pele:** foi desenhado um tom médio. Um tom só, ou a pessoa escolhe entre três ou quatro? (Há tabelas prontas para clara, morena e escura em `scripts/boneco-desenho/figura.mjs`, não mostradas a ele como decisão.)
5. **Um corpo só (homem):** nas avaliações lidas na pesquisa, figura de um só gênero gera queixa em todas as faixas de estilo (`pesquisa/d-critica-e-gosto.md`). Uma segunda pessoa não foi desenhada.
6. **A junta-chave marcada** (a bolinha verde do boneco de hoje): entra no desenho novo?
7. **O estilo "Silhueta"** continua como terceira opção?

## O que não foi desenhado

- Vistas: de frente e de costas só existem na pose em pé; a vista de cima e a de três quartos não foram desenhadas. As poses de lado vieram das quatro animações da sessão da animação nova (goblet, flexão, supino, puxada) e de uma pose de braços para cima montada para a prancha.
- Rótulos de técnica, linhas-guia, modo Erros e modo Trajetória: fora do escopo desta sessão.
- Peças de cena: o halter, o banco, o cabo, o pegador, a anilha e o tapete das pranchas são desenhos simples, só para situar a pose.
- Animação: nada se mexe aqui.

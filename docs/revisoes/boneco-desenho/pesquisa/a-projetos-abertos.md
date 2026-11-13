# A - Projetos abertos e GitHub: referências visuais para o desenho do Boneco

Data: 13/11/2026.

**O que foi buscado:** bibliotecas abertas de ilustração de pessoas (Open Peeps, Humaaans, unDraw), personagens CC0 2D e 3D (Kenney, Quaternius), bases abertas de exercício com imagem (free-exercise-db, wger, exercemus, everkinetic), mapas de músculo em SVG (react-body-highlighter, body-highlighter, MuscleMap), manequim e figura por código (mannequin.js, Zdog, MakeHuman, VRM) e pictogramas e ícones abertos (Tabler, Phosphor, Material Symbols, Font Awesome Free, Health Icons, Twemoji, OpenMoji).

**Contagem:** 19 referências com imagem vista (A01 a A19). Mais 8 itens que tentei e não consegui ver ou conferir (seção final). Todas as 19 imagens foram baixadas para `/tmp/claude-0/-home-user-treino-mvp/51d388b4-ccb1-5342-b809-7abe31130df0/scratchpad/refs/a/` e abertas. SVGs foram renderizados no Chromium. Nada de terceiros foi gravado dentro do repositório.

**Limites que vale saber:**
- "Licença lida" quer dizer que abri o arquivo LICENSE ou a página de licença do próprio projeto. Quando só vi um selo ou um resumo, escrevi isso.
- Notas de realismo seguem a escala pedida (1 = placa, 7 = foto).
- "Serve?" no campo de licença: MIT, Apache, BSD, ISC, CC0, Unlicense e CC BY servem. CC BY-SA, GPL e AGPL ficam como "só como referência de princípio".
- Fato = o que vi ou li. Opinião = julgamento meu, marcado como tal.

## Tabela-resumo

| Cód. | Nome | Família | Realismo | Licença | Serve para o app? |
|---|---|---|---|---|---|
| A01 | free-exercise-db | foto | 7 | Unlicense (declarada), origem das fotos NÃO VERIFICADA | só como referência |
| A02 | wger (imagens estilo Everkinetic) | traço de tinta | 4 | CC BY-SA 3 (por imagem) | só como referência |
| A03 | react-body-highlighter | mapa de músculo | 3 | MIT | sim |
| A04 | MuscleMap, modo vetor | mapa de músculo | 4 | MIT | sim (código e caminhos SVG) |
| A05 | MuscleMap, modo híbrido com foto | 3D realista + mapa | 6 | MIT (fotos geradas por IA, MIT) | só como contra-exemplo |
| A06 | mannequin.js | manequim 3D | 5 | GPL-3.0 | só como referência |
| A07 | Open Peeps | traço / chapado | 4 | CC0 | sim |
| A08 | Humaaans | chapado vetorial | 3 | CONFLITO: CC0 na página, CC BY 4.0 no espelho do GitHub | CC BY 4.0 serve com crédito; confirmar |
| A09 | Kenney, Animated Characters | 3D estilizado | 3 | CC0 | sim |
| A10 | Kenney, Toon Characters | chapado 2D (sprites) | 3 | CC0 | sim |
| A11 | Quaternius, Modular Women | low-poly | 5 | CC0 | sim |
| A12 | Zdog (demos) | chapado com volume por código | 3 | código MIT; imagens NÃO VERIFICADO | código sim |
| A13 | Tabler Icons | pictograma de traço | 2 | MIT | sim |
| A14 | Phosphor Icons | pictograma, 3 pesos | 2 | MIT | sim |
| A15 | Material Symbols | pictograma chapado | 2 | Apache 2.0 | sim |
| A16 | Font Awesome Free | pictograma chapado | 2 | ícones CC BY 4.0 | sim, com crédito |
| A17 | Twemoji | chapado vetorial | 3 | gráficos CC BY 4.0 | sim, com crédito |
| A18 | Health Icons | pictograma de traço | 2 | CC0 | sim |
| A19 | OpenMoji | chapado com contorno | 3 | CC BY-SA 4.0 | só como referência |

## Fichas

### A01 - free-exercise-db (fotos de exercício)
- Página: https://github.com/yuhonas/free-exercise-db (abri o README em raw.githubusercontent.com)
- Imagem aberta: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg
- Autor: yuhonas (o repositório). As fotos vêm de outro projeto (exercises.json), segundo o README.
- Licença: Unlicense (domínio público), lida no `LICENSE.md` e no selo do README. A origem das fotos e o direito de uso delas: NÃO VERIFICADO. Domínio público declarado no repositório não prova que o fotógrafo original abriu mão. Tratei como risco.
- Família: foto. Realismo 7. Imagem vista: sim.
- **O que se vê (fato):** homem real de regata e bermuda pretas, em academia com piso de madeira e parede vermelha, agachamento com barra. Foto 850x567 nítida, com cenário inteiro, rack, anilhas, espelho.
- **Bom:** é o padrão de "o que o aluno vai fazer de verdade". Mostra pegada, posição do pé e da barra sem precisar de legenda.
- **Ruim:** o cenário come a atenção; em 96 px o corpo vira mancha escura. Corpo e rosto de uma pessoa só. Duas fotos por exercício (0 e 1), sem movimento contínuo.
- **Princípio (opinião):** duas poses-chave (início e fim) bastam para mostrar a amplitude. O Boneco pode copiar o enquadramento (lado, corpo inteiro, barra legível), não a foto.

### A02 - wger e imagens no estilo Everkinetic (traço de tinta)
- Página: https://github.com/wger-project/wger (lida a página via WebFetch) e API pública https://wger.de/api/v2/exerciseimage/
- Imagens abertas: https://wger.de/media/exercise-images/91/Crunches-1.png e https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png
- Autor: contribuidores do wger (o campo de autor veio vazio nessas duas). Não confirmei o autor original do desenho.
- Licença: lida na API do wger (`/api/v2/license/1/`): "CC-BY-SA 3". O código é AGPL-3.0, lido na página do repositório. **Não serve** para o app. Só como referência de princípio.
- Família: traço de tinta. Realismo 4. Imagem vista: sim.
- **O que se vê (fato):** contorno preto grosso sobre branco, sem cor. Pessoa careca de cabeça lisa, sem rosto. Roupa só de bermuda. Músculo sugerido por riscos finos no antebraço e no tronco. Barra, anilha e banco desenhados com o mesmo traço. O abdominal (Crunches) é bem mais tosco que o supino.
- **Bom:** lê muito bem em branco e preto; mostra o equipamento junto; pouco detalhe de rosto.
- **Ruim:** é estático, sem cor para o músculo; o traço fino de dentro some em miniatura; as imagens variam de qualidade e de mão (a primeira é bem inferior).
- **Princípio (opinião):** contorno forte e cabeça sem rosto funcionam. O equipamento tem de ter o mesmo peso de traço do corpo.

### A03 - react-body-highlighter (mapa de músculo em polígonos)
- Página: https://github.com/giavinh79/react-body-highlighter
- Imagem aberta: https://raw.githubusercontent.com/giavinh79/react-body-highlighter/master/image/anterior-example.png
- Autor: GV79 (giavinh79); os polígonos vêm do react-native-body-highlighter, segundo o README.
- Licença: MIT, lida no arquivo `LICENSE` do repositório (Copyright 2020 GV79). Serve.
- Família: mapa de músculo. Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** corpo de frente em cinza-azulado, cada músculo é um polígono facetado separado por uma linha branca. Cabeça é uma forma sem rosto. Peitoral e ombro em azul claro, tríceps em azul escuro (dois níveis de destaque). Mãos e pés pontudos e cortados.
- **Bom:** destaque em duas intensidades já existe (parecido com vermelho e laranja do app). Os polígonos dão para pintar um por um. Leve e simples.
- **Ruim:** a figura é parada, em "X", e só de frente ou de costas. Mãos e pés são rudes. Não mostra pose do exercício.
- **Princípio (opinião):** o mapa pode ficar ao lado da figura da pose e carregar sozinho a informação de "quem trabalha". Aí a figura da pose pode ser mais simples.

### A04 - MuscleMap, modo vetor chapado
- Página: https://github.com/Jsplice/MuscleMap (README lido)
- Imagem aberta: https://raw.githubusercontent.com/Jsplice/MuscleMap/main/docs/media/vector-front.png
- Autor: Jsplice e colaboradores.
- Licença: MIT, lida no `LICENSE` (Copyright 2026). Serve. Os caminhos SVG por músculo ficam no pacote `@musclemap/assets`.
- Família: mapa de músculo. Realismo 4. Imagem vista: sim.
- **O que se vê (fato):** silhueta azul-marinho de corpo atlético em pé, com mãos e pés desenhados, sem rosto. Cada músculo é uma forma separada e colorida (laranja, verde, amarelo, azul-claro) com brilho leve. Cabeça lisa. Fundo escuro.
- **Bom:** é o melhor exemplo que achei de "silhueta chapada com músculo colorido por dentro": lê rápido, tem anatomia suficiente para o aluno entender onde fica o músculo, e não tem pele nem textura. Funciona no escuro.
- **Ruim:** a paleta é de mapa de calor (muitas cores), não de dois níveis. Pose estática de frente. O corpo é de fisiculturista (um só tipo de corpo). Sem roupa.
- **Princípio (opinião):** silhueta única de uma cor, com o músculo em forma própria dentro. Com 2 cores (vermelho e laranja) em vez de arco-íris, vira o destaque do app.

### A05 - MuscleMap, modo híbrido com foto (contra-exemplo)
- Página: https://github.com/Jsplice/MuscleMap
- Imagem aberta: https://raw.githubusercontent.com/Jsplice/MuscleMap/main/docs/media/hero-front.png
- Autor/licença: igual à A04. O README diz que as fotos de corpo são geradas por IA e também MIT (lido).
- Família: 3D realista com mapa por cima. Realismo 6. Imagem vista: sim.
- **O que se vê (fato):** o mesmo mapa colorido da A04 sobre um corpo cinza de aparência 3D realista, nu, com rosto neutro e pele de manequim.
- **Bom:** mostra por que o dono recusou essa direção: é parecido com a rejeitada (2).
- **Ruim (opinião):** a cabeça realista com corpo metálico é o caso de "elementos com realismo diferente na mesma figura" que a pesquisa anterior apontou. Pesa em tela pequena.
- **Princípio:** a comparação lado a lado A04 x A05 é útil para mostrar ao dono. O mesmo mapa fica melhor na versão chapada.

### A06 - mannequin.js (manequim articulado em 3D)
- Página: https://github.com/boytchev/mannequin.js e https://boytchev.github.io/mannequin.js/index.html
- Imagens abertas: https://boytchev.github.io/mannequin.js/docs/snapshots/example-posture.jpg e https://boytchev.github.io/mannequin.js/docs/snapshots/example-figure-types.jpg
- Autor: boytchev.
- Licença: GPL-3.0, lida no README. **Não serve.** Só como referência de princípio.
- Família: manequim de madeira 3D. Realismo 5. Imagem vista: sim.
- **O que se vê (fato):** manequim de ateliê, cor de madeira clara, juntas em bolas marrons mais escuras, cabeça com listras como se fosse torneada, mãos com dedos, sapatos cinza, sombra projetada no chão. Há variantes de mulher, criança e homem, com proporções diferentes.
- **Bom:** as juntas em bola marcam muito bem onde dobra; a mão e o pé aparecem; o tom "madeira" é mais quente que o cinza que o dono já recusou.
- **Ruim:** olhos e rosto esculpidos na criança (estranho); sombra e iluminação pedem render 3D; é o conceito "manequim" que o dono já viu.
- **Princípio (opinião):** cor de material quente (madeira, argila) no lugar de cinza, e junta como ponto de cor. Isso muda a percepção sem mudar a estrutura.

### A07 - Open Peeps (Pablo Stanley)
- Página: https://openpeeps.com
- Imagens abertas: https://cdn.prod.website-files.com/5e51b3b0337309d672efd94c/5e51c36e16879c45e6c0fb6f_sit-stand-walk.svg e a variante em busto https://api.dicebear.com/9.x/open-peeps/svg?seed=treino
- Autor: Pablo Stanley.
- Licença: CC0, lida na página oficial ("The library is in the public domain under the CC0 License"). Serve. O DiceBear é um remix CC0 com código MIT, segundo a busca (não abri a página).
- Família: traço / chapado. Realismo 4. Imagem vista: sim.
- **O que se vê (fato):** três pessoas de corpo inteiro com contorno preto de espessura constante, roupa em preto, branco ou estampa, rosto com olhos e boca simples, cabelo grande e expressivo, pés com tênis desenhados, mãos reduzidas a dedos simples. Quase sem cor.
- **Bom:** é o traço de pessoa mais "humano" que achei com licença livre; roupas dão leitura de pessoa comum; funciona bem em tema claro.
- **Ruim:** tem rosto e personalidade (o dono quer cabeça sem rosto); só preto e branco, então no tema escuro precisa inverter; proporção casual, não atlética.
- **Princípio (opinião):** contorno único e grosso, preenchimento só de branco e preto, e a única cor forte fica reservada para o destaque. O músculo em vermelho saltaria muito.

### A08 - Humaaans (Pablo Stanley)
- Página: https://www.humaaans.com
- Imagem aberta: https://cdn.prod.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg
- Autor: Pablo Stanley.
- Licença: **conflito.** A página oficial diz "CC0 Public Domain" (lida). O espelho https://github.com/calinou/humaaans diz "CC BY 4.0" (README lido). Antes de usar, confirmar. CC BY 4.0 serve com crédito; CC0 serve sem.
- Família: chapado vetorial (estilo "Corporate Memphis"). Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** fila de pessoas andando, corpo inteiro, cores sólidas (azul, laranja, vermelho, verde-água), sem contorno, cabeça pequena, pernas e braços longos, rosto mínimo, mãos e pés reduzidos a formas.
- **Bom:** cor chapada sem contorno é limpa e leve; a figura de cabeça pequena e membros longos lê a pose de longe.
- **Ruim:** a proporção distorcida (membro comprido) atrapalha a leitura de ângulo de joelho e cotovelo; a pesquisa anterior já o classifica como "imagem corporativa genérica"; é fino demais para a musculação.
- **Princípio (opinião):** roupa em cor sólida de duas ou três cores dá vida sem textura. Evitar a distorção dos membros.

### A09 - Kenney, Animated Characters (3D estilizado)
- Página: https://kenney.nl/assets/animated-characters-1
- Imagem aberta: https://kenney.nl/media/pages/assets/animated-characters-protagonists/98921ae406-1674931821/preview.png
- Autor: Kenney.
- Licença: CC0, lida na página (selo "CC0 1.0 ... free to use in personal, educational and commercial projects"). Serve.
- Família: 3D estilizado. Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** quatro personagens 3D com cabeça grande, rosto com olhos e sobrancelhas, cabelo volumoso, mãos e pés simples, roupa colorida de cores sólidas, sombra suave. Proporção de "boneco de jogo".
- **Bom:** mostra que dá volume e sombra leve sem cair em realismo; roupa lê bem; rigado e animado.
- **Ruim:** cabeça grande e rosto marcado dão cara de jogo infantil; o dono pediu cabeça sem rosto.
- **Princípio (opinião):** 3D com cores chapadas e sombra suave resolve o "quase humano". Para o Boneco, o aproveitável é o tratamento de superfície, não a proporção.

### A10 - Kenney, Toon Characters (sprites 2D)
- Página: https://kenney.nl/assets/toon-characters-1
- Imagem aberta: https://kenney.nl/media/pages/assets/toon-characters/90a61601f7-1677693113/preview.png
- Autor: Kenney. Licença: CC0, lida na página. Serve.
- Família: chapado 2D. Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** seis personagens de pé, corpo curto e largo, cabeça grande com rosto, cores sólidas e sombra por faixa mais escura, sem contorno forte. Folha de 45 poses por personagem em miniatura.
- **Bom:** a folha de poses mostra que um personagem 2D com poucas peças serve para dezenas de posições; cor lisa e sombreamento em um só tom.
- **Ruim:** corpo "chibi" (cabeça grande, pernas curtas), ruim para ensinar técnica; o rosto está presente.
- **Princípio (opinião):** sombra por um tom mais escuro (sem gradiente) dá volume barato e lê em miniatura.

### A11 - Quaternius, Modular Women (low-poly)
- Página: https://quaternius.com/packs/ultimatemodularwomen.html
- Imagem aberta: https://quaternius.com/assets/images/fullres/modularwomen.jpg
- Autor: Quaternius. Licença: CC0, lida na página. Serve.
- Família: low-poly. Realismo 5. Imagem vista: sim.
- **O que se vê (fato):** dez personagens de corpo inteiro, malha facetada, proporção de adulto, rosto com olhos pretos pequenos e boca discreta, mãos e pés simples, cabelo e roupa de cores sólidas. Pele em um único tom, facetas visíveis em sombras.
- **Bom:** proporção humana real com faceta; roupa clara (camisa branca e calça laranja) deixa o corpo legível; sombra dá volume sem textura.
- **Ruim:** rosto com olhos pretos fica estranho (ficam "vazios"); a faceta chama atenção em tela grande; exigiria um render 3D no app.
- **Princípio (opinião):** facetas dão volume sem textura. A cabeça lisa sem rosto de nosso caso evita o ponto fraco desses modelos.

### A12 - Zdog (figuras 3D chapadas desenhadas por código)
- Página: https://zzz.dog e https://github.com/metafizzy/zdog
- Imagens abertas: https://zzz.dog/img/davey-nippu.png e https://zzz.dog/img/madeline.png
- Autor: Metafizzy (código) e os autores das demos (não confirmei quem).
- Licença: código MIT, lido no README ("Licensed MIT"). Licença das imagens das demos: NÃO VERIFICADO.
- Família: chapado com volume feito por código (canvas/SVG). Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** personagens feitos de cilindros e esferas de cor lisa: braços e pernas como tubos arredondados, mãos e pés em formas simples, cabeça com rosto pequeno, roupa em blocos, sombra em tom mais escuro. Um personagem andando e um voando.
- **Bom:** é o que mais se aproxima do "boneco de cápsulas" do dono, mas com acabamento de ilustração e roupa. Roda por código em SVG ou canvas, leve para celular.
- **Ruim:** a imagem das demos é de estilo "ilustração", com rosto; o Zdog é 3D de verdade (precisa de câmera e de recalcular o desenho).
- **Princípio (opinião):** cápsulas funcionam quando têm roupa em blocos de cor e sombra por tom, não quando são cinza com contorno. Esse é o salto da versão atual.

### A13 - Tabler Icons (pictograma de traço)
- Página: https://tabler.io/icons
- Imagens abertas (SVG): https://raw.githubusercontent.com/tabler/tabler-icons/main/icons/outline/stretching.svg, `yoga.svg`, `karate.svg`, `run.svg`, `man.svg`, `barbell.svg` (mesma pasta)
- Autor: Paweł Kuna. Licença: MIT, lida no `LICENSE` do repositório (Copyright 2020-2026). Serve.
- Família: pictograma de traço. Realismo 2. Imagem vista: sim.
- **O que se vê (fato):** cabeça redonda vazada, tronco e membros como linhas grossas de ponta redonda, sem mão nem pé. O "man" é um corpo de frente reto com braços abertos. Funciona só pela pose.
- **Bom:** legibilidade muito alta em 24 px; cabeça sem rosto; já na linguagem visual que o dono conhece. As poses de alongamento e yoga mostram como inclinar a linha do tronco diz muito.
- **Ruim:** corpo fino de palito, sem volume nem músculo; sem equipamento. A figura "man" fica rígida.
- **Princípio (opinião):** a pose carrega 80% da leitura. Todo o resto (volume, roupa) deve apoiar a pose, nunca competir.

### A14 - Phosphor Icons (pictograma em três pesos)
- Página: https://phosphoricons.com
- Imagens abertas: https://raw.githubusercontent.com/phosphor-icons/core/main/assets/duotone/person-simple-run-duotone.svg, `person-arms-spread-duotone.svg`, `person-simple-tai-chi-fill.svg` e outros da pasta `assets/` (fill e duotone)
- Autor: Phosphor Icons. Licença: MIT, lida no `LICENSE` do repo core (Copyright 2023). Serve.
- Família: pictograma. Realismo 2. Imagem vista: sim.
- **O que se vê (fato):** a mesma pose em três pesos (traço, duotone, cheio). O "arms-spread" cheio tem o tronco como uma forma só em estrela e cabeça separada. No duotone, o tom claro preenche cabeça e tronco.
- **Bom:** a versão duotone mostra que dá para ter uma cor de base e uma de destaque numa figura de 2 peças. A versão cheia lê melhor em miniatura.
- **Ruim:** sem mão, pé nem equipamento; a pose de corrida/hike não é de musculação.
- **Princípio (opinião):** um preenchimento claro por dentro do contorno (duotone) já é um "chapado com contorno" simples e barato de pintar por região.

### A15 - Material Symbols (Google)
- Página: https://github.com/google/material-design-icons
- Imagens abertas: https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/sports_gymnastics/materialsymbolsrounded/sports_gymnastics_48px.svg, `sports_martial_arts`, `self_improvement`, `accessibility_new`, `directions_run`, `sports_kabaddi` (mesma estrutura)
- Autor: Google. Licença: Apache 2.0, lida no `LICENSE` do repo. Serve.
- Família: pictograma chapado. Realismo 2. Imagem vista: sim.
- **O que se vê (fato):** figura cheia e arredondada, cabeça circular separada do corpo por um respiro, membros em barras de largura constante, sem mão nem pé. As figuras de ginástica e artes marciais têm pose bem dinâmica, em 2 ou 3 traços.
- **Bom:** o respiro entre cabeça e tronco ajuda a ler em 24 px; as poses de ginástica mostram bem a linha do corpo; muito parecido com o "boneco de cápsulas" atual, só que mais refinado.
- **Ruim:** sem mão, pé, equipamento ou músculo; tem uma só cor.
- **Princípio (opinião):** barras de espessura única com cantos redondos formam uma figura limpa. Serve de padrão de acabamento.

### A16 - Font Awesome Free
- Página: https://fontawesome.com
- Imagens abertas: https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/person-running.svg e `dumbbell.svg`
- Autor: Fonticons, Inc. Licença: ícones CC BY 4.0, lida em `LICENSE.txt` ("Icons: CC BY 4.0 License"). Serve com crédito.
- Família: pictograma chapado. Realismo 2. Imagem vista: sim.
- **O que se vê (fato):** corredor em silhueta cheia, cabeça circular maior que nos outros conjuntos, corpo inclinado, braço e perna em formas arredondadas e grossas. Halter cheio ao lado.
- **Bom:** a figura mais "robusta" do grupo; o peso visual maior dá ideia de força.
- **Ruim:** é uma só silhueta de corrida; sem mão, pé nem rosto; precisa de crédito.
- **Princípio (opinião):** membros mais grossos passam sensação de corpo treinado sem ter de desenhar músculo.

### A17 - Twemoji (pessoa levantando peso)
- Página: https://github.com/jdecked/twemoji
- Imagem aberta: https://raw.githubusercontent.com/jdecked/twemoji/main/assets/svg/1f3cb.svg
- Autor: Twitter/X e a comunidade (fork jdecked). Licença: gráficos em CC BY 4.0, lida no `LICENSE-GRAPHICS`. Serve com crédito.
- Família: chapado vetorial. Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** pessoa de frente com barra sobre a cabeça, cabeça redonda com rosto mínimo e cabelo, camisa laranja e pernas amarelas, mãos em círculo, pés pequenos. Barra cinza com anilhas escuras.
- **Bom:** a leitura de "levantamento" é imediata e a cor da roupa (laranja) separa bem do fundo; tem equipamento junto.
- **Ruim:** rosto e cabelo de personagem; proporção de emoji (cabeça grande); pose rígida de frente.
- **Princípio (opinião):** equipamento em cinza neutro e corpo em cor quente é uma boa hierarquia. O foco vai ao corpo.

### A18 - Health Icons
- Página: https://healthicons.org
- Imagens abertas: https://raw.githubusercontent.com/resolvetosavelives/healthicons/main/public/icons/svg/outline/exercise/weights.svg, `exercise.svg`, `running.svg`, `people/exercise-yoga.svg`, `body/skeleton.svg`, `body/body.svg` (mesma base)
- Autor: Resolve to Save Lives. Licença: CC0, lida em https://healthicons.org/licenses ("Icons license CC0"); o código do site é MIT. Serve.
- Família: pictograma de traço. Realismo 2. Imagem vista: sim.
- **O que se vê (fato):** traço de espessura única, cabeça redonda sem rosto, corpo em formas de contorno. O de "weights" mostra pessoa de frente com a barra sobre os ombros e anilhas grandes. O "skeleton" é esqueleto simples com crânio.
- **Bom:** CC0 de verdade e inclui figura com barra; o esqueleto mostra um modo diferente de falar de articulação.
- **Ruim:** só traço, nenhuma cor; esqueleto com crânio lembra morte (não combina com app).
- **Princípio (opinião):** pessoa com a barra e anilha em escala certa já comunica "musculação". Detalhes mínimos bastam.

### A19 - OpenMoji
- Página: https://openmoji.org
- Imagem aberta: https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F3CB.svg
- Autor: HfG Schwäbisch Gmünd e colaboradores. Licença: CC BY-SA 4.0, lida no `LICENSE.txt` do repo. **Não serve.** Só como referência de princípio.
- Família: chapado com contorno preto. Realismo 3. Imagem vista: sim.
- **O que se vê (fato):** pessoa amarela de frente com barra em cima; contorno preto de espessura única; cabeça redonda sem rosto; corpo em cápsulas; barra e anilhas em cinza escuro.
- **Bom:** é o que mais se parece com o boneco atual (cápsulas, contorno escuro, cabeça redonda lisa), mas com uma cor de corpo viva em vez de cinza. Mostra o efeito da troca de cor.
- **Ruim:** a pose é parada e simétrica; a cor amarela vira "emoji".
- **Princípio (opinião):** o mesmo desenho do boneco atual, com uma cor de corpo definida e uma segunda cor para o destaque, já muda muito a impressão.

## As 5 mais fortes

1. **A04 MuscleMap vetor** (MIT): silhueta única com forma própria para cada músculo; mostra o destaque de músculo sem pele nem textura, e a comparação com A05 prova por que o realismo foi recusado.
2. **A12 Zdog** (código MIT): cápsulas com volume e sombra por tom, feitas por código; é o salto natural do boneco atual.
3. **A15 Material Symbols** (Apache 2.0): referência de acabamento: barras de espessura única, cantos redondos e respiro entre cabeça e tronco.
4. **A07 Open Peeps** (CC0): o melhor traço de contorno grosso de pessoa vestida, com cor guardada só para o destaque.
5. **A03 react-body-highlighter** (MIT): mostra destaque em dois níveis com músculo em polígonos, ao lado da figura da pose.

(Fora do top 5 mas úteis: A17/A19 pela troca de cor do corpo; A06 pela cor quente de "madeira" e as juntas em bola.)

## O que não consegui abrir ou conferir

- **Wikimedia Commons** (pictogramas de Aicher 1972, DOT/AIGA): a API devolveu "too many requests"; não achei nem abri imagem. Nos pictogramas DOT/AIGA, a Wikipedia diz que são domínio público (lido via busca, não abri o arquivo na Commons). E o conjunto DOT não tem figura de exercício. NÃO VERIFICADO.
- **Everkinetic** (https://github.com/everkinetic/data, licença CC BY-SA 4.0 lida no `LICENSE.md`): a imagem do servidor deles não resolveu (host sem DNS aqui) e o caminho `_images/web/...` deu 404. As imagens do wger em A02 têm o mesmo estilo, mas não confirmei que sejam as mesmas.
- **exercemus/exercises** (MIT para código, imagens com licença por exercício, segundo a página): no JSON baixado, nenhum exercício trazia imagem; a pasta `images/` não consegui abrir. Sem imagem vista.
- **unDraw** (https://undraw.co/license): li a licença (uso grátis sem crédito, mas a página diz que não vale para "centro do produto", venda ou uso em app). Não abri uma imagem de pessoa. NÃO VERIFICADO se serve para o app.
- **Open Doodles** (CC0, lido na página): as imagens que baixei eram arte de interface, sem figura humana, então descartei.
- **MakeHuman** (https://github.com/makehumancommunity/makehuman): li o `LICENSE.md` (código AGPL, assets CC0), mas não achei captura de tela para abrir. A página makehuman.org/license.php só mostrava "domínio à venda". Sem imagem vista.
- **OpenGameArt** (403), **UniVRM/VRM** (li só o README, sem imagem), **Mixamo** (fechado, nem tentei), **Noto Emoji** (caminho dos SVG não achado; só li a licença OFL), **MediaPipe Pose** (imagem dos 33 pontos: 404), **react-native-body-highlighter** (README sem imagem), **body-highlighter de lahaxearnaud** (README sem imagem; o `LICENSE` diz MIT, "Copyright 2020 GV79", parece cópia do outro repo).
- **three.js Xbot/Michelle e mannequin de glTF CC0:** não tentei renderizar (WebGL no Chromium headless é incerto).
- **Autoria de muitos SVGs de ícone** (quem desenhou cada pose): não conferi, só a licença do conjunto.
- Minha leitura de "Serve para o app" é técnica, não parecer jurídico.

# Lote B1 · Rosca com barra W (`rosca-barra-w`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés na largura do quadril, a barra W nas duas mãos, segura no meio das partes inclinadas de fora; o braço fica parado ao lado do tronco e só o antebraço sobe, até a barra chegar perto dos ombros. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-barra-w.md`. Cartão do app: `src/conteudo/exercicios/rosca-barra-w.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-barra-w.json`.
- Animação: `src/engine/novo/exercicios/rosca-barra-w.ts`. É a rosca na polia com barra reta aprovada (`rosca-polia.ts`) sem a coluna, com o corpo em pé do núcleo `polia-bracos.ts` (`montarEmPe`) e o braço do núcleo das roscas (`bracoDaRosca`). Regras medidas novas: `src/engine/novo/regras/barras-especiais.ts`.
- A peça: `src/engine/novo/pecas-de-cena/barra-w.ts`, com as medidas em `dados/objetos/barra-w.json` (folha: `docs/revisoes/animacoes-restantes/pecas/folha-barra-w.png`).
- Quadros grandes: `../quadros/rosca-barra-w.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. O que ela não dá saiu das roscas aprovadas parecidas (selo `desenho`, fonte `aprovado`): o joelho a 5° e os tempos da rosca alternada, o braço 8° à frente da linha do tronco e os erros da rosca na polia com barra reta. Duas coisas não são escolhidas, saem da conta:

- **A pegada inclinada.** A mão gira com a parte inclinada de fora da barra: o polegar sai 90° − 23° = 67° da posição neutra (na barra reta são 90°). Os 23° são o ângulo da curva da peça (`barraW.anguloFora`), sem fonte de fabricante (ver a peça, abaixo).
- **A barra sai das mãos.** A linha entre os centros das duas pegadas é paralela à das mangas; o plano da curva é o que contém a linha da palma; o centro da barra fica a meio caminho, deslocado no plano da curva. A curva gira junto com o antebraço. A conta do polegar é feita no referencial da dobradiça do cotovelo (a frente do antebraço no plano do braço): com o polegar das outras roscas (`polegarDaPegada`), que se apoia no plano entre o braço e o antebraço, a linha da palma girava de 7° a 29° em relação à linha da barra durante a subida, e a barra não cabia nas mãos.

**A largura da pegada (37 cm) é a mesma da barra reta da rosca na polia** (correção de 04/11/2026: 36–38 cm, a largura dos ombros). Com as mãos a 43 cm (a primeira tentativa), o antebraço tinha de abrir 7° para fora, a conta de pronação do esqueleto (que mede o giro a partir do plano entre o braço e o antebraço) dava 47° embaixo, e a regra da palma para cima falhava; com o braço aberto 6° para o lado (como na rosca alternada), as mãos mudavam de distância durante a subida (6 cm), o que uma barra rígida não deixa. Por isso a curva da peça foi posta onde a mão cai com o braço junto do tronco.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, tronco reto | consenso | a bola de cada pé a 9 cm do meio; o peito na vertical; a base do pescoço anda 0 cm no ciclo; os pés não saem do lugar (0 cm) | sim |
| Barra W com anilhas iguais dos dois lados | consenso | uma anilha de 5 kg de cada lado, com a presilha; 22 kg com a barra, que entram no equilíbrio (o centro de massa fica sempre sobre o apoio dos pés) | sim |
| Pegada nas partes inclinadas da barra | consenso | cada mão no meio da parte inclinada de fora: o centro da pegada a 0 cm do eixo dela e a 0 cm do meio; a linha da palma a 0° da linha da parte inclinada; as mãos sempre a 37,0 cm uma da outra | sim |
| Palmas para cima | consenso | o antebraço supinado de 66,4° a 67,1° (90° = palma toda para cima; o que falta é a inclinação da barra W) | sim |
| Cotovelos ao lado do corpo, parados | consenso | o cotovelo anda 0 cm enquanto dobra; o braço fica 8° à frente da linha do tronco e 0° aberto para o lado (a regra das roscas aceita até 10° e 20°) | sim |
| Início: braços quase estendidos | consenso | embaixo, o cotovelo dobra 13,9° (o mínimo da ficha é 10°; os 3,9° a mais são o que a barra pede para passar 0,5 cm à frente das coxas) | sim |
| Dobra os cotovelos até a barra chegar perto dos ombros | consenso | em cima, o cotovelo dobra 132°; o centro da pegada fica a 26,3 cm do centro do ombro, 4,4 cm abaixo dele | sim |
| A barra passa à frente das coxas e do tronco | desenho | a menor folga entre a barra e a pele (fora as mãos) é 3,4 cm, no antebraço; das coxas, 0,5 cm embaixo | sim |
| Subida; descida em ~2 s | consenso | 1,1 s subindo (a da rosca alternada aprovada), 2,2 s descendo; pausas de 0,4 s embaixo e em cima; o maior salto de velocidade é 5,9% do pico (limite 15%) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`joelho`, `cervical`, `cabeca`, `braco.aFrente`, `escapula.prot`, `barra.folga`, `anilhas`). (2) O antebraço aparece como "só ajuda a firmar", fora da lista do conteúdo (o mesmo das outras roscas aprovadas: correção de 04/11).

## As vistas

- **De lado** (a que o app abre, como na rosca na polia aprovada): mostra o cotovelo parado e o antebraço subindo. A curva da barra não se vê de lado; a anilha de 5 kg tapa a mão embaixo.
- **De três quartos** (segunda vista): mostra a curva em W e as duas mãos nas partes inclinadas. O rótulo "pegada nas partes inclinadas" aponta para a mão esquerda, a de longe: a direita fica atrás da anilha de perto nesse ângulo.
- De frente, a curva se lê muito bem embaixo (está nos quadros grandes), mas o antebraço vem na direção de quem olha e a subida não se lê.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o tronco | de lado | o tronco começa 10° à frente e é jogado 14° para trás, com a lombar arqueada 12° em cima (os números da rosca na polia aprovada); o quadril fica no lugar |
| Cotovelos para a frente | de lado | no topo, o braço sobe 48° à frente da linha do tronco (8° + 40°): o cotovelo sai do lado do corpo |
| Descida curta | de lado | embaixo, o cotovelo para dobrado 55° (o certo: 13,9°) |

Nenhum erro do cartão é só de ritmo: os três têm consequência visível e foram desenhados.

## O equipamento

- **Barra W:** a peça nova, com as medidas da Eleiko (131,6 cm, mangas de 5 cm com 23 cm carregáveis, rebordo de 2 cm, 12 kg) e a pegada de 2,85 cm da Rogue. A curva (23° e 34°, onde ficam as dobras) é de desenho: nenhuma página pública de fabricante dá os ângulos.
- **Anilhas e presilhas:** as da barra longa (tabela de objetos), uma de 5 kg de cada lado.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das correções das roscas: o antebraço como "só ajuda" (04/11) e a largura das mãos numa barra de largura fixa (36–38 cm, 04/11, da rosca na polia).

## O que não ficou bom

- **De lado, a barra W não se distingue de uma barra reta:** a curva fica no plano que gira com o antebraço e, de lado, some atrás da anilha. Quem quer ver a pegada inclinada precisa da segunda vista.
- **A anilha de 5 kg tapa a mão de perto, de lado, embaixo**, como numa foto de rosca com barra; não troquei a anilha porque a de 45 cm taparia mais.
- **As juntas da curva** são trechos retos que passam um pouco da dobra (cilindros sobrepostos): de perto, numa dobra se vê um pequeno degrau. Na cena, no tamanho do celular, não aparece.
- **A curva da peça foi ajustada pela animação** (as dobras onde a mão cai com o braço junto do tronco); como os números da curva já eram de desenho, nenhuma medida de fabricante mudou, mas a peça e a rosca ficam presas uma à outra até alguém achar a medida.

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **no começo do erro "Balançar o tronco"**, o tronco começa 10° inclinado à frente e os braços vão com ele: com o cotovelo do movimento certo embaixo (13,9°), **a barra entrava 1,3 cm nas coxas** (1,4 cm pela checagem da pintura).

**A mudança.**

- Nesse erro, embaixo, o cotovelo dobra o que a barra precisa para passar à mesma folga das coxas que no movimento certo (`barra.folga`, 0,5 cm): 18,3°, calibrado e guardado no preparo (`rosca-barra-w:balanco-embaixo`). Daí ele sobe como antes.
- O ciclo e os outros dois erros não mudam.

| medido (homem) | antes | depois |
|---|---|---|
| a barra entra nas coxas (erro "Balançar o tronco", começo) | 1,3 cm | 0 cm |
| cotovelo embaixo, no erro | 13,9° | 18,3° |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (1,3 cm, na coxa direita, no erro "Balançar o tronco"); no de agora, passa (o peso não entra no corpo). O antes e depois está em `correcao-das-antigas/rosca-barra-w-peso.png`; os quadros grandes foram regravados (`quadros/rosca-barra-w.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **1 falha e 2 avisos** (antes: 2 falhas e 2 avisos, entre elas a de pesos).

**O que ainda não ficou bom.**
- A falha que sobra é de antes: de três quartos, no começo do erro "Balançar o tronco", a coxa direita é pintada por cima de um pedaço da barra, que está na frente dela (2,3 cm², em 3 quadros). A barra não entra mais na coxa, mas de três quartos ainda pode parecer encostada nela. Não corrigi a ordem de pintura.

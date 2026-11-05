# Auditoria independente do boneco (estilo A), 04/11/2026

Pedido do Gustavo, ao ver a folha da rosca martelo: "o boneco para esse tipo de exercício está ficando ruim, [...] acho
que essas divisões do corpo não tão ficando tão boas". Antes, ele já tinha apontado "a clareza do movimento" e "a
visualização do treino e do erro".

**Nada mudou no repositório.** Tudo o que está aqui foi gerado numa cópia, nesta pasta.

## Em poucas linhas
O esqueleto, as poses e os músculos estão bons. O que incomoda é o **acabamento do corpo**, e isso tem conserto
barato. São quatro coisas, nesta ordem:
1. De lado, **o braço tem a mesma cor do tronco** e some dentro dele, justamente nos exercícios em que o braço é o que se move.
2. **Não há mão.** O halter fica por cima de um toco, então "polegar para cima" e "palmas para dentro" não aparecem no desenho.
3. **As emendas aparecem.** O tronco é feito de 6 fatias, e na folha elas viram listras. Cada pedaço de braço e de perna é uma "pílula" com contorno próprio: a coxa fica colada no quadril como uma pílula sobre uma caixa. Os pés são palitos.
4. **Há bolinhas demais.** São até 10 juntas marcadas, na mesma cor verde das dicas, todas com o mesmo peso. O boneco fica com cara de manequim articulado, e o olho não sabe qual junta importa.

No modo Erros, o fantasma verde é um boneco de palitos inteiro desenhado por cima do corpo vermelho, inclusive onde os
dois são iguais. Isso polui exatamente o que deveria chamar a atenção.

---

## Como olhei
- Folhas de contatos de 12 exercícios no estilo A (`folhas/`), do jeito que o Gustavo as vê.
- Quadros ampliados (2×) para ver os detalhes (`zoom/`), e o mesmo quadro no estilo Clássico para comparar.
- Código: `src/engine/estilo/corpo.ts` (corpo), `index.ts` (cena, Erros e Trajetória), `musculos.ts`, `src/engine/desenho.ts`, `esqueleto.ts` e `src/styles.css`.
- Protótipo numa cópia de `src/` (`proto/`), com cada mudança atrás de uma chave, para ter o antes e o depois com o mesmo código (`prototipo/`).
- **Não olhei:** o tema escuro, um celular de verdade e a miniatura do cartão. Não fiz pesquisa nova na web. As referências de estilo abaixo são prática comum de ilustração de exercício (guias de técnica, livros de anatomia do exercício, apps de treino), sem estudo que as teste. Pelo método do projeto, contam como **consenso de prática / opinião**.

---

## 1. O que incomoda, do mais grave ao menos grave

### 1.1 De lado, o braço some no tronco (grave: roscas, tríceps, elevação, remada, supino)
- **O que se vê:** na rosca martelo de lado (folha, linha "lateral: técnica", todos os quadros), braço e tronco têm a mesma cor cinza-claro (`--ea-pele`). Só um contorno de 1,3 cm os separa. Em "Embaixo", o braço cobre quase metade da largura do tronco de perfil, e não dá para ver onde acaba o tronco e começa o braço. Ampliado: `zoom/rm-lat-crop.png` e `zoom/rm-lat-rest-crop.png`.
- **Comparação:** no Clássico (`zoom/rm-atual.png`), o braço é escuro sobre um tronco claro e se lê de longe. O estilo A ganhou volume, mas perdeu esse contraste.
- **Por que atrapalha:** na rosca, a dica é "cotovelo parado", e o que se precisa ver é **o braço em relação ao tronco**. Se os dois se fundem, o olho só pega o halter subindo. O mesmo vale para a remada (o cotovelo passa por cima das costas, `zoom/remada2.png`) e para o tríceps francês (o braço passa na frente da cabeça, `zoom/triceps.png`).

### 1.2 Não há mão (grave nos exercícios com pegada)
- **O que se vê:** a "mão" é um toco de 5,5 cm, mais fino que o antebraço (`ESP.mao` em `corpo.ts`). O halter direito é desenhado por cima do corpo (`layer: 1.4` em `exercicios/revisao/rosca-martelo.ts`), então o cabo atravessa o toco. De frente, o halter da pegada neutra vira um **borrão preto** onde deveria estar a mão (folha, "frontal: técnica", "Topo" e "Direito sobe").
- **Por que atrapalha:** a rosca martelo só difere da rosca comum pela pegada, e o desenho não mostra pegada nenhuma. As dicas "polegar para cima" e "palmas para dentro" ficam sem nada no desenho que as confirme. Em toda ilustração de técnica que conheço, a mão (mesmo uma luva sem dedos) é o que diz "segura assim".

### 1.3 As "divisões do corpo": emendas, pílulas e listras (o que o Gustavo descreveu)
O corpo é montado em pedaços independentes, e as junções aparecem:
- **Tronco listrado.** O tronco são 6 fatias (`PELVE` e `TORAX`, `aneisTronco`), cada uma um polígono separado, por cima de um contorno escuro preenchido. Na emenda entre duas fatias, o contorno escuro "vaza" numa linha fina. Na folha, o tronco ganha **listras horizontais**, como uma armadura de placas (`zoom/sheet-frontal-torso.png` e `zoom/sheet-lateral-torso.png`). Ampliado, isso some, mas o Gustavo vê a folha, não o zoom.
- **Bicos no contorno do tronco.** O contorno é a soma das fatias, então tem quinas: o "bumbum" é um canto vivo atrás da pelve, e o peito tem um degrau (`zoom/rm-lat-crop.png`, `zoom/remada2.png`). De frente, o tronco parece um vaso com a boca estreita.
- **Pílula sobre caixa.** Cada segmento de braço e de perna é uma linha grossa de pontas redondas, com contorno próprio. A coxa começa com uma tampa redonda **por cima** da pelve, então o quadril parece uma pílula colada numa caixa (de lado, em todos os exercícios em pé; na ponte de glúteo, `zoom/ponte.png`, é justo a junta que a dica pede para olhar: "ombro, quadril e joelho em linha"). No joelho e no cotovelo, a ponta da coxa ou do braço sobra para fora da canela ou do antebraço (um "calombo").
- **Espessura constante.** Braço, antebraço, coxa e canela têm a mesma largura do começo ao fim, como canos. Não há coxa larga em cima e fina no joelho, nem antebraço que afina no punho. Isso reforça o ar de manequim.
- **Pescoço e pés.** O pescoço é um tubo com contorno, separado do tronco. O pé são dois tocos de 5 cm (calcanhar → tornozelo → ponta), com um "dente" embaixo do tornozelo, e parece um esqui. A dica "calcanhar no chão" pede um pé que se leia como pé.

### 1.4 Juntas demais, na cor das dicas (médio)
- **O que se vê:** até 10 bolinhas por boneco (ombro, cotovelo, quadril, joelho e tornozelo dos dois lados, quando de frente), todas iguais. A cor `--joint` é **a mesma** de `--guide` (`#0a7c72` no tema claro, em `src/styles.css`), então as bolinhas parecem parte da dica. Na rosca de lado, a linha tracejada de "cotovelo parado" passa por duas bolinhas e se confunde com elas.
- **Encurtamento:** quando o membro aponta para quem olha, as bolinhas de cima e de baixo ficam próximas, mas não a ponto de virar uma só. No agachamento de frente, cada coxa vira um ovo com duas bolinhas (`zoom/agach.png`, quadro da direita).
- **Por que atrapalha:** marca tudo e não destaca nada, e dá o aspecto de boneco de madeira articulado. Ressalva: "juntas marcadas" foi uma escolha do Gustavo no R4 (caminho A). A proposta abaixo não as tira; ela as **reduz à junta que importa**.

### 1.5 O modo Erros (médio a grave para "visualização do erro")
- **O que se vê:** a figura que erra aparece cheia, em rosa com contorno vermelho, e o certo vem por cima como um **boneco de palitos verde inteiro**, de 3,2 cm de espessura (`fantasma` em `estilo/index.ts`, que chama o `body()` do Clássico). Onde os dois são iguais (pernas e tronco na rosca, por exemplo), a linha verde corre pelo meio do corpo rosa e não ensina nada. Exemplos: rosca martelo "cotovelo", remada "arredondar" (`prototipo/remada-unilateral-sem-banco.png`, linha HOJE) e supino "cot" de cima.
- **Cor:** vermelho `--err` × verde `--ghost` têm só **1,4:1** de contraste de claridade (calculei pela fórmula da WCAG). Para quem não distingue vermelho de verde, sobra só a diferença de forma, cheio × palito. O `design.md` já tinha marcado vermelho × verde como problema de daltonismo (Okabe e Ito; consenso).
- **Dois desenhos diferentes** (volume para o errado, palito para o certo) obrigam a pessoa a comparar coisas de tipos diferentes.

### 1.6 O ombro não tem forma (médio)
- De frente, o braço pende do **canto** do tronco, com uma fresta (`zoom/elev.png`, quadro do meio). Não há o arredondado do deltoide, que é justamente o músculo da elevação lateral e do desenvolvimento.
- De lado, inclinado (remada), o braço parece sair do pescoço (`zoom/remada2.png`): o topo do tronco afina até o pescoço e não há volume de ombro.

### 1.7 Vista de lado com braço apontando para a câmera (médio; parte é do corpo, parte é da escolha da vista)
- Na elevação lateral de lado (`zoom/elev.png`), o braço que vai **para o lado** aparece indo **para a frente**, só mais curto. O erro "frontal" (subir à frente) desenhado de lado fica quase igual ao certo. Um boneco sem pistas de profundidade (sem sombra, sem afinar, com a mesma espessura) não tem como mostrar "vem na minha direção".
- De frente, a rosca no topo vira dois borrões pretos (o antebraço aponta para quem olha).

### 1.8 Peças que flutuam ou somem (menor, mas confunde)
- Na rosca de lado, o halter do braço de longe aparece como duas placas pretas dos dois lados da coxa, sem mão nem braço visíveis (`zoom/rm-lat-crop.png`).
- Na remada de lado, o rótulo "mão livre na coxa" aponta para uma mão que não aparece: ela está atrás do tronco.

### 1.9 Detalhes menores
- O contorno da cabeça é mais grosso que o resto (`ow*1.6` inteiro visível, contra 1,3 nos membros), e a cabeça puxa o olho. O "nariz" é o único sinal de para onde ela olha. É aceitável.
- Na folha, o boneco tem uns 140 px de altura. Qualquer detalhe menor que 2 px (as emendas, as bolinhas, o contorno de longe) vira ruído.

---

## 2. Propostas, da mais barata à mais cara

**Risco comum a todas:** o corpo é um só para as 49 animações. Qualquer mudança em `corpo.ts` ou em `estilo/index.ts`
muda o SVG de **todos** os quadros, e a linha de base `tests/visual/linha-de-base/estilo-a.json` falha inteira, com
nova aprovação folha a folha. **Atenção:** essa linha de base guarda o hash do SVG, não a imagem. Mudanças **só de
CSS** (cores) não a quebram, e por isso também não são protegidas por ela: precisam de aprovação visual mesmo com o
teste verde.

**Como fazer com segurança [opinião]:** repetir o caminho do R4. O corpo novo entra como um estilo paralelo
(`'a2'`, ao lado de `'a'` e `'b'` em `estilo/index.ts`), o Gustavo aprova primeiro 6 folhas-piloto (rosca martelo,
remada unilateral, agachamento, ponte, supino e flexão), depois o lote inteiro, e só então o `a2` vira o padrão e
ganha a linha de base. O `estilo-a.json` atual fica intocado até lá.

| # | Proposta | Resolve | Onde entra | Custo | Risco |
|---:|---|---|---|---|---|
| 1 | **Juntas em outra cor** (cinza-escuro neutro), separada de `--guide` | 1.4, em parte | `src/styles.css` (`--joint`, `.ea-jt`) | horas | baixo; não muda o hash (veja acima) |
| 2 | **Dois tons:** tronco um pouco mais claro que os membros | 1.1 | `src/styles.css` (`.ea-pele-t` × `.ea-pele-l`) | horas | baixo; perna de longe e tronco ficam parecidos e pedem um ajuste no tom de longe; o contraste do músculo sobre a pele precisa ser medido de novo |
| 3 | **Tronco num só `<path>`** (as 6 fatias juntas): sem listras | 1.3 | `corpoNovo()`, nos dois `for (const h of cascas)` | horas | muda todos os quadros (só o tronco) |
| 4 | **A pelve cobre o começo da coxa de perto** (recorte com `clipPath`): a coxa "sai" do quadril, sem pílula | 1.3 | `membro()` em `corpo.ts` | 1 dia | muda todos; o id do `clipPath` precisa ser único e determinístico (no protótipo, um hash da forma) |
| 5 | **Folga da cor do fundo em volta do braço de perto**, de lado: o braço se separa do tronco | 1.1 | `membro()` (o B já faz isso com `eb-folga`) | horas | come uma faixa fina do músculo do tronco colado ao braço (o peitoral na flexão embaixo); ajustar a largura |
| 6 | **Só a junta-chave marcada** (cotovelo nas roscas e remadas, joelho no agachamento, quadril na ponte): um campo novo e opcional no exercício, `juntas`, que mantém todas as bolinhas quando não é preenchido | 1.4 | `corpoNovo()` + os dados de cada exercício | 1 dia + dados | muda a decisão "juntas marcadas" do R4: precisa do sim do Gustavo |
| 7 | **Mão em luva** (oval mais largo que o punho, que passa um pouco do ponto de pegada) **por cima do cabo**, de lado | 1.2 | `corpoNovo()`/`membro()`; a camada do halter em cada exercício | 1 a 2 dias | de frente, a mão continua atrás do disco (no protótipo só vai por cima de lado); em barra e pegador, conferir caso a caso |
| 8 | **Fantasma só no que muda:** o verde aparece só na cadeia (tronco, cada braço, cada perna) em que o certo e o errado diferem mais de 3 cm | 1.5 | `cenaEstilo()`, modo `err`, em `estilo/index.ts` | 1 dia | num instante em que os dois coincidem, o fantasma some (rosca "curta" no topo): escolher bem o tempo do quadro de erro |
| 9 | **Cor do fantasma** que não dependa de vermelho × verde (por exemplo, o certo em contorno escuro tracejado ou em azul) | 1.5 | `src/styles.css` (`.gh`) e a legenda | horas | muda a legenda do app e a convenção "verde = certo" |
| 10 | **Ombro com volume** (um arredondado de deltoide no começo do braço) | 1.6 | `corpoNovo()` | 1 dia | mexe com o lugar dos músculos do ombro (`deltAnt`/`deltLat` em `musculos.ts`) |
| 11 | **Membros que afinam** (coxa larga no quadril e fina no joelho, antebraço fino no punho) e **pé em cunha** | 1.3 | `membro()`: trocar a linha grossa por um "cone" (dois círculos ligados pelas tangentes) | 2 a 3 dias | some a marca do joelho (pede um leve volume ali); os músculos que passam da borda do membro mais fino precisam de ajuste |
| 12 | **Rever a vista de alguns exercícios:** elevação lateral sem a vista de lado (ou de lado só para o erro de tronco); rosca de frente só com a mão visível | 1.7 | dados de cada exercício (`views`, `errors`) | por exercício | cada animação mudada passa por aprovação |
| 13 | **Vista três-quartos** (nova vista no motor) | 1.7 | `VIEWS` em `desenho.ts` + os rótulos por vista | 1 a 2 dias + um exercício por vez | **o protótipo não convenceu**: na rosca, a de lado continua mais clara (veja abaixo) |
| 14 | Contorno único do corpo inteiro (união geométrica de todas as partes) ou corpo desenhado à mão | tudo | motor novo | semanas | alto: perde o determinismo simples e o reaproveitamento das poses; **não recomendo** agora |

**O que eu faria [opinião]:** 3, 4, 5, 7 e 8 juntos, como estilo `a2` ("acabamento"), mais 1 e 2 no CSS. É o que o
protótipo mostra como "Proposta 1". Se, depois disso, o Gustavo ainda achar o boneco "de manequim", seguir com 11 e
10. A proposta 6 depende dele, porque desfaz uma decisão do R4.

---

## 3. O protótipo (sem mexer no repositório)

**Como foi feito:** cópia de `src/` em `proto/src/`. Cada mudança fica atrás de uma chave em `CTX.PROTO`; sem chave, a
saída é a mesma do estilo A. Arquivos tocados na cópia: `estilo/corpo.ts` (tronco1, quadril, folga, juntas, mao,
conico), `estilo/index.ts` (fantasmaDif), `desenho.ts` (vista `obliqua`) e `styles.css` (4 classes novas no fim).

**Imagens** (cada uma com 3 blocos: HOJE, PROPOSTA 1 = acabamento, PROPOSTA 2 = acabamento + membros que afinam):
- `prototipo/rosca-martelo.png`: de lado, a mão segura o halter entre os discos e o "polegar para cima" passa a fazer sentido; o braço tem uma borda clara que o separa do tronco; só o cotovelo marcado; no erro "cotovelo", o verde aparece só no braço.
- `prototipo/remada-unilateral-sem-banco.png`: no erro "arredondar", o verde vira **só a linha das costas e a cabeça**, o que deixa o erro muito mais claro que o boneco verde inteiro de hoje.
- `prototipo/ponte-gluteo.png`: a coxa sai do quadril, e tronco e coxa formam uma linha contínua (é o que a dica "ombro, quadril e joelho em linha" pede).
- `prototipo/agachamento-peso-corpo.png`, `supino-reto.png`, `flexao.png`, `triceps-frances-halter.png`, `elevacao-halteres.png`: os mesmos efeitos em outros corpos e vistas.
- `prototipo/folha-rosca-martelo-proposta1.png` e `folha-remada-unilateral-sem-banco-proposta1.png`: a folha inteira, no tamanho em que o Gustavo revisa. `prototipo/folha-rosca-martelo-lateral-hoje-x-proposta1.png`: hoje e proposta 1 lado a lado, no tamanho real da folha.
- `prototipo/variante-tom-tronco-claro.png`: a proposta 1 com o tronco mais claro que os membros (proposta 2 da tabela). É o que mais devolve a leitura "braço × tronco" no tamanho pequeno.
- `prototipo/rosca-martelo-vista-3-4.png`: a vista três-quartos. Mostra os dois braços e dá profundidade, mas o antebraço encurta e o halter cobre a mão; para a rosca, **a de lado melhorada é melhor**.

**Limitações do protótipo (honestas):**
- No tamanho da folha, as mudanças de acabamento são **sutis**. O que mais muda a leitura de longe é o tom (variante de dois tons) e a mão.
- A mão vai por cima do equipamento só de lado. De frente, o disco do halter ainda a cobre.
- A folga em volta do braço come um pouco do peitoral colado ao braço na flexão (modo Músculos, embaixo).
- Na versão "que afina", o joelho perde a marca.
- De frente, a pelve cobrindo as coxas faz o quadril parecer um short. É mais limpo que as pílulas, mas é um gosto a confirmar.
- Os valores (tons, larguras, o limite de 3 cm do fantasma) são de olho; não medi contraste nem testei o tema escuro.
- Nenhum teste do repositório rodou na cópia, e a cópia não serve como código final.

---

## 4. O que NÃO mudar (está bom)
- **O esqueleto, as poses e a cinemática** (IK = 0 em todas as folhas que gerei). O problema é o desenho por cima, não o movimento.
- **Os músculos:** vermelho e laranja sólidos, com borda escura, forma anatômica simplificada e a regra de só mostrar a face virada para quem olha. Foi o que o Gustavo mais elogiou.
- **O lado de longe mais claro** (braço e perna de longe em tom pálido e contorno leve). É a melhor pista de profundidade que o boneco tem; a remada de lado se lê por causa dela.
- **O contorno escuro** do estilo A. Ele dá forma ao corpo; a proposta é tirar as emendas, não o contorno.
- **A vista de lado como principal** nas roscas, no tríceps e na remada. É a vista certa para "cotovelo parado"; ela só precisa separar o braço do tronco.
- **O enquadramento perto do corpo** no modo Músculos, a linha discreta da coluna e as dicas com linha tracejada.
- **O determinismo:** tudo o que proponho continua sendo geometria calculada a partir do esqueleto, sem desenho à mão e sem aleatoriedade.

---

## Arquivos gerados (todos nesta pasta)
- `relatorio.md`: este relatório
- `folhas/*.png`: as 12 folhas de contatos de hoje (estilo A)
- `zoom/*.png`: quadros ampliados usados nos exemplos
- `prototipo/*.png`: antes e depois, folhas com a proposta 1, variante de dois tons e vista três-quartos
- `proto/`: a cópia de `src/` com o protótipo (`proto/src/engine/estilo/corpo.ts` é o arquivo principal)
- `render.mjs`, `antes-depois.sh`: os scripts que geraram as imagens (`PROTO='{"tronco1":1,...}' node render.mjs <raiz> <id> <saída> a <vista:modo:fração[:erro]>...`)

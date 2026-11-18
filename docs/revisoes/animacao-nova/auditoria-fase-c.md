# Auditoria das animações da fase C (e das da fase B citadas): contato, proporção e detalhe

De 18/11/2026, sobre o commit `a2a2aad`. Feita com olhos novos depois que o Gustavo achou, na `rosca-scott`, o braço de longe fora da almofada na vista de três quartos ("tome cuidado com as proporções e detalhes"). A `rosca-scott` está sendo corrigida por outro agente e ficou fora da auditoria (só serviu para calibrar o método, abaixo). **Nada foi corrigido aqui**: só achado, medido e relatado.

Auditadas: as 22 de máquina e banco aprovadas na fase C (`cadeira-flexora`, `cadeira-extensora`, `aducao-maquina`, `abducao-maquina`, `leg-press`, `mesa-flexora`, `hack`, `puxada-frente`, `supino-maquina`, `remada-articulada`, `desenvolvimento-maquina`, `voador`, `remada-baixa-estacao`, `voador-invertido`, `barra-fixa-graviton`, `mergulho-graviton`, `rosca-maquina`, `panturrilha-sentada`, `panturrilha-em-pe-maquina`, `triceps-maquina`, `abdominal-declinado`, `hiperextensao`), as cinco da fase B (`agachamento-barra`, `supino-barra`, `desenvolvimento-barra`, `agachamento-smith`, `supino-smith`) e as duas em revisão (`panturrilha-leg-press`, `coice-maquina`). Em cada uma: cada vista declarada em `vistas`, no começo, no meio e no fim da primeira fase com movimento, e cada erro na vista dele, no instante dele.

## Resumo

| | exercício | vista e instante | o que | medida |
|---|---|---|---|---|
| **grave** | `cadeira-flexora` | três quartos, o ciclo todo | o rolo, que fica **atrás** das canelas, é pintado **na frente** das pernas: lê-se como o rolo da extensora | começo: 7 de 20 anéis do pé direito e 6 de 20 do esquerdo pintados por baixo do rolo sem o rolo estar na frente; fim: o eixo do rolo 11,5 cm atrás do tornozelo e mesmo assim por cima da canela de perto |
| **grave** | `mergulho-graviton` | três quartos de trás, meio e fim; erro "ombros encolhidos" | a canela e o pé **de longe**, deitados na almofada, somem embaixo da ponta dela (o mesmo tipo do braço da rosca Scott) | fim: 7 de 13 anéis da canela esquerda e 7 de 20 do pé; a canela encosta (−0,4 cm) e fica dentro da largura |
| **grave** | `voador-invertido` | de cima, todos os quadros | o apoio do peito é pintado por cima da cabeça: a metade de baixo da cabeça some | o queixo fica 3,1 cm **acima** da borda de cima do apoio e 1,3 cm à frente da face dele; 4 de 17 anéis da cabeça pintados por baixo |
| médio | `cadeira-extensora`, `cadeira-flexora` | lateral, erro "Joelho fora do eixo" | o encosto passa a ser pintado por cima das costas | extensora: 7 de 13 anéis do tronco; flexora: 2 do tronco e 2 de cada coxa; o tronco não entra no encosto |
| médio | `abdominal-declinado` | lateral, erro "Puxar o pescoço" | o estofado do banco pintado sobre a borda de baixo do tronco | 6 de 13 anéis do tronco; o tronco fica 2,4 cm acima do estofado |
| médio | `remada-articulada` | lateral, o ciclo todo | o rótulo "peito na almofada" aponta para a base da nuca (C7), nas costas | o ponto do rótulo fica 24 cm acima e 16 cm atrás da face do apoio do peito |
| médio | `cadeira-flexora`, `cadeira-extensora` | lateral, erros "Rolo da coxa solto" e "Tirar o quadril do banco" | as duas mãos sobem da alça | centro da mão a 4,6 cm (flexora) e 4,8 cm (extensora) do centro da alça (4 cm acima), contra 0 na técnica |

Os achados pequenos estão nas tabelas por exercício. Em 13 das 29 animações não achei nada; em outras 10, só achados pequenos; as tabelas dizem o que foi medido em cada uma.

## Como foi medido

Os rascunhos ficaram em `.rascunho/` (não versionados). Corpo: o homem da tabela. Três medidas, todas no motor (o mesmo `ex.quadro` e o mesmo `svgDaCena` do app):

1. **Pintura (o corpo embaixo de um estofado onde ele está na frente).** Cada quadro é desenhado a 1200 × 900 px. Para cada anel do Boneco (braço, antebraço, coxa, canela, pé, tronco, pelve, cabeça), toma-se o ponto do anel mais perto da câmera (um pouco para dentro, para fugir do traço), projetado em pixels, e anda-se dele até a câmera em passos de 0,5 cm perguntando se o raio atravessa alguma caixa ou rolo de estofado da conferência (`q.prims`, classes `estofado`/`plataforma`). Se o pixel é roxo (a cor do estofado) **e** o raio não atravessa estofado nenhum, o estofado foi pintado por cima de uma parte do corpo que está na frente dele: é o erro. Contagem: "anéis pintados por baixo" de cada parte, com o lado.
2. **Contato com as caixas e rolos.** Para cada estofado e cada parte (com o lado), na pele desenhada (24 a 36 pontos por anel): a menor altura da pele sobre a face (negativo = afunda), quanto a pele na altura da face passa da borda lateral e do comprimento, quanto a pele entra na caixa, e a diferença entre o lado direito e o esquerdo. Rolos: folga até a superfície e onde, ao longo do rolo, a perna encosta.
3. **Mãos, pés, barra e rótulos.** O centro da mão (`pegada`) contra as marcas dos pegadores (`pegador*`, `alca*`, `barra.*`) em 41 quadros do ciclo e 11 de cada erro; a sola contra a plataforma ou o degrau; o eixo da barra contra a pele das costas (agachamentos) e contra as mãos; o ponto de cada rótulo da ficha contra o que o texto diz.

**Calibragem (a `rosca-scott`, fora da auditoria):** a medida 1 acha, sem saber de antemão, o erro que o Gustavo apontou: de três quartos, no começo e no fim, 6 de 11 anéis do braço esquerdo (o de longe) e 5 de 11 do antebraço esquerdo pintados por baixo da almofada sem ela estar na frente ([00-calibragem-rosca-scott.png](auditoria-fase-c/00-calibragem-rosca-scott.png)). De lado, ela não acha nada. Também testei a `rosca-maquina`, em que olhando pequeno parecia haver o mesmo erro: a medida diz que não há, e o quadro grande confirma (o braço de perto fica por cima do apoio).

**Limites:** a medida 1 só vê estofado (roxo); uma alavanca ou um tubo cinza pintado na ordem errada passa. Ela mede as caixas da conferência; um estofado desenhado num lugar diferente da caixa dele também aparece como erro (não achei nenhum). A medida 2 usa a pele desenhada com mais pontos que a conferência automática (que usa 12 por anel): por isso acha entradas um pouco maiores que as dela (ex.: `hack`, 3,1 cm contra 2,1).

## Por exercício

### `cadeira-flexora` (lateral, três quartos)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| três quartos: começo, meio e fim | direito (de perto); no começo, os dois pés | o rolo de baixo, que encosta **atrás** do tornozelo, é pintado **na frente** das pernas em todo o ciclo ([01](auditoria-fase-c/01-cadeira-flexora-quina-rolo-na-frente.png)) | começo: 7 de 20 anéis do pé direito e 6 de 20 do esquerdo por baixo do rolo, que está 12,7 cm abaixo do centro do tornozelo (encosta atrás do calcanhar, folga 0,0 cm); meio: 3 de 13 anéis da canela direita; fim: o eixo do rolo fica 11,5 cm atrás do tornozelo (y 30,2 × 23,5 cm; z −15,3 × −3,8 cm) e o rolo cobre o meio da canela de perto | o rolo de 44 cm, que passa por baixo das duas pernas, é desenhado com a alavanca (do lado de fora da perna de perto) e entra inteiro na ordem de pintura; já no começo o centro dele sai mais perto da câmera (37,3) que o meio da canela de perto (37,0) | **grave** |
| lateral, erro "Joelho fora do eixo" | — | o encosto pintado por cima das costas e das coxas ([04](auditoria-fase-c/04-cadeiras-erro-eixo-encosto-sobre-as-costas.png)) | 2 de 13 anéis do tronco e 2 de 11 de cada coxa | de lado, o encosto e o tronco têm a mesma profundidade (0,0, os dois no meio); a ordem vira quando o encosto recua 6 cm no erro | médio |
| lateral, erro "Rolo da coxa solto" (u=1) | as duas mãos | a mão sobe da alça | centro da mão a 4,6 cm do centro da alça (4,0 cm acima, 2,1 cm à frente); na técnica, 0 | no erro o quadril sobe e as mãos acompanham o tronco em vez de ficarem na alça | médio |
| lateral, erro "Joelho fora do eixo" | as duas canelas | a canela entra no assento | 2,8 cm (a tolerância da conferência é 2,5) | o joelho 6 cm atrás do eixo leva a canela para dentro da borda da frente do assento | pequeno |

Medido e certo: glúteo no assento (−1,0 cm), trava sobre as coxas (0,0), lombar no encosto (0,0) e o tronco de cima 3,9 cm à frente dele (de propósito, documentado), rolo encostado nos dois pés (0,0) e dentro do comprimento (de 12,3 a 15,0 e de 29,0 a 31,7 cm, num rolo de 44), mãos nas alças (0) no ciclo.

### `cadeira-extensora` (lateral, três quartos)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| lateral, erro "Joelho fora do eixo" (u=1) | — | o encosto pintado por cima das costas ([04](auditoria-fase-c/04-cadeiras-erro-eixo-encosto-sobre-as-costas.png)) | 7 de 13 anéis do tronco; o tronco encosta (0,0) sem entrar | a mesma da flexora: empate de profundidade de lado | médio |
| lateral, erro "Tirar o quadril do banco" (u=1) | as duas mãos | a mão sobe da alça | 4,8 cm do centro da alça | as mãos acompanham o tronco | médio |
| três quartos, fim (u=1) | direito (de perto) | o rolo pintado sobre o peito do pé ([07](auditoria-fase-c/07-pequenos.png)) | 5 de 20 anéis do pé direito; as pontas dos pés ficam 16 cm à frente do rolo | a mesma ordem por peça inteira do rolo | pequeno |
| lateral, erro "Joelho fora do eixo" | os dois pés | o pé entra no rolo | 3,6 cm | o rolo escorrega pela canela até o pé (é o erro), mas entra nele | pequeno |

Medido e certo: costas no encosto (0,0), rolo na frente das canelas (−0,4) e dentro do comprimento nos dois lados, glúteo no assento, mãos nas alças no ciclo.

### `aducao-maquina` (frontal, de cima)

Nada encontrado. As almofadas encostam do lado de **dentro** dos joelhos (coxa −0,2 cm, canela 0,5 cm), centradas no joelho; glúteo no assento; costas no encosto (passa 0,8 cm da borda de cada lado); a medida 1 não acha nada.

### `abducao-maquina` (frontal, de cima, lateral)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| frontal, erros "Abrir pouco" (u=1) e "Soltar a volta" (u=0) | os dois | o assento pintado sobre a canela (1 anel de cada) e a almofada sobre o punho (2 anéis de cada) | 1 a 2 anéis | ordem de pintura nos quadros de erro | pequeno |

Medido e certo: as almofadas encostam do lado de **fora** dos joelhos (coxa 0,1 cm, canela 1,1 cm) em todo o ciclo; glúteo, costas e mãos.

### `leg-press` (lateral, de cima)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| de cima, todos os quadros | os dois | o encosto pintado sobre a raiz dos braços ([07](auditoria-fase-c/07-pequenos.png)) | 2 de 11 anéis de cada braço (junto do ombro) | ordem de pintura do encosto com os braços ao lado dele | pequeno |

Medido e certo: glúteo no assento (−1,0) e no fim do encosto (−1,0), costas no encosto (−1,0), as duas solas na plataforma (0,0), dentro da largura (a 17 cm do meio, numa chapa de 72), braços ao lado do encosto. No erro "Quadril descola", a bacia sai 7 cm do assento (é o erro).

### `mesa-flexora` (lateral, de cima)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| de cima, fim (u=1) | os dois | o rolo pintado sobre os calcanhares ([07](auditoria-fase-c/07-pequenos.png)) | 6 de 20 anéis de cada pé; o calcanhar fica 1,8 cm acima da superfície do rolo | ordem de pintura do rolo inteiro | pequeno |

Medido e certo: quadril (−0,2 e −0,8) e coxas (−1,0) no banco, peito no apoio da frente (−0,6), rolo nos dois pés (−0,4) e dentro do comprimento, mãos nas alças.

### `hack` (lateral, frontal)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| o ciclo todo | os dois braços | o braço entra no encosto, junto da axila | 3,1 cm (a conferência mede 2,1 com menos pontos) | os cotovelos vão 11 cm para trás do ombro, por fora do encosto, e o braço passa pela borda dele | pequeno |
| lateral, erros "Descer pouco" e "Lombar descola" | — | 1 a 2 anéis do tronco, do antebraço ou da cabeça por baixo do encosto ou da ombreira | 1 a 2 anéis | ordem de pintura | pequeno |

Medido e certo: costas no encosto (−1,0), ombreiras sobre os ombros (−1,1, dentro da largura), as duas solas na plataforma (0,0), mãos nos pegadores (0). Nota de desenho, não erro de contato: os cotovelos ficam a 42,8 cm do meio do corpo (as mãos a 30,5), bem abertos de frente.

### `puxada-frente` (lateral, três quartos de trás)

Nada encontrado. Glúteo no assento (−1,0), coxas sob os rolos (−0,4; o contato vai de 6,9 a 14,5 cm ao longo de um rolo de 18), mãos na barra (0) no ciclo e nos três erros, o cabo chega à fita da barra. A medida 1 não acha nada nas duas vistas.

### `supino-maquina` (lateral, frontal)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| fim (u=1) | os dois braços | o braço entra no encosto | 2,7 cm (2,2 no começo) | o braço passa pela borda do encosto com o cotovelo para trás | pequeno |
| lateral, erro "Banco na altura errada" (u=0) | os dois | o assento pintado sobre a coxa e a pelve ([07](auditoria-fase-c/07-pequenos.png)) | 4 de 11 anéis da coxa direita, 2 da esquerda, 3 de 13 da pelve; o corpo está sentado (−1,0) | empate de profundidade de lado | pequeno |

Medido e certo: costas (−1,0) e glúteo (−1,0), mãos nos pegadores (0).

### `remada-articulada` (lateral, três quartos de trás)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| lateral, o ciclo todo | — | o rótulo "peito na almofada" aponta para a base da nuca, nas costas ([06](auditoria-fase-c/06-remada-articulada-rotulo-peito-na-almofada.png)) | o ponto (C7, y 117,8, z −5,0) fica 24 cm acima e 16 cm atrás do centro da face do apoio do peito | `rotulos` da ficha de movimento com `ponto: "c7"` | médio |

Medido e certo: peito no apoio (−1,0; a pele vai de −10,9 a 10,9 cm num apoio de 19,4: passa 1,2 cm de cada lado, largura da ficha), glúteo no assento (−1,3), mãos nos pegadores (0), a medida 1 não acha nada.

### `desenvolvimento-maquina` (lateral, frontal)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| fim (u=1) e erro "Arquear a lombar" | os dois braços | o braço entra no encosto | 2,6 cm no fim, 3,2 no erro | o braço passa pela borda do encosto | pequeno |

Medido e certo: costas no encosto (−1,0), glúteo (−1,0), mãos nos pegadores (0); a medida 1 não acha nada.

### `voador` (de cima, frontal)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| de cima, todos os quadros | — | o alto do encosto pintado sobre o alto das costas | 2 de 13 anéis do tronco | ordem de pintura | pequeno |

Medido e certo: costas no encosto (−0,5), glúteo, mãos nos pegadores. O encosto (24 cm) é mais estreito que as costas (passa 6,8 cm de cada lado), mas é a medida da ficha ("long, narrow pad"), não erro.

### `remada-baixa-estacao` (lateral, por trás)

Nada encontrado. Glúteo no banco (−1,0), as duas solas nas chapas (0,0), o cabo chega ao triângulo, as mãos no triângulo; a medida 1 não acha nada.

### `voador-invertido` (por trás, de cima)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| de cima, todos os quadros (e o erro "Abrir pouco") | — (cabeça) | o apoio do peito pintado por cima da cabeça: some a metade de baixo dela ([03](auditoria-fase-c/03-voador-invertido-cima-cabeca-sob-o-apoio.png)) | o ponto da cabeça mais perto do apoio fica 3,1 cm acima da borda de cima e 1,3 cm à frente da face; 4 de 17 anéis da cabeça por baixo; de cima, a cabeça (centro a 133,3 cm do chão) está acima do apoio (centro a 104,2) | a cabeça é desenhada na mesma peça do tronco, que entra na ordem com a altura média do tronco (pelve a C7: 92,2 cm), abaixo do centro do apoio | **grave** |
| lateral (só no erro "Embalar o tronco") | — | o rótulo "peito no encosto" está no C7, nas costas | — | `ponto: "c7"`; a vista lateral não está entre as declaradas, então o rótulo só aparece se essa vista for aberta em modo técnica | pequeno |

Medido e certo: peito no apoio (−0,5, dentro da largura), glúteo no assento (−1,0), mãos nos pegadores (0) no ciclo e nos erros.

### `barra-fixa-graviton` (lateral, três quartos de trás)

Nada encontrado. Canelas na almofada (−0,4 cm, a pele de 1,6 a 10,5 cm do meio, numa almofada de 38), os pés passam da ponta de trás (de propósito), mãos nas alças. A medida 1 não acha nada (olhando pequeno, de três quartos de trás, as pernas parecem ao lado da almofada: no quadro grande estão em cima).

### `mergulho-graviton` (lateral, três quartos de trás)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| três quartos de trás: meio, fim e erro "Ombros encolhidos" | esquerdo (de longe); no erro, também o direito | a canela e o pé deitados na almofada somem embaixo da ponta de trás dela ([02](auditoria-fase-c/02-mergulho-graviton-quinatras-canela-de-longe.png)) | fim: 7 de 13 anéis da canela esquerda e 7 de 20 do pé; meio: 3 e 4; erro: 1 da canela e 10 do pé esquerdos, 3 da canela direita. A canela encosta (−0,4 cm), dentro da largura, e pela profundidade dos centros está mais perto da câmera (30,1) que a almofada (26,0) | a almofada entra na ordem de pintura como um item só, com um ajuste fixo (`dz: 4`, "as canelas ficam por cima dela") que resolve a perna de perto e não a de longe nesta vista | **grave** |
| lateral, erro "Descer demais" (u=1) | os dois | a almofada pintada sobre o joelho | 4 de 13 anéis de cada canela, 1 de cada coxa | o mesmo | pequeno |

Medido e certo: as mãos nas alças (o contato `pegada.R/L` não sai do lugar), canelas na almofada nos dois lados.

### `rosca-maquina` (lateral, três quartos)

Nada encontrado. Os dois braços deitam nas metades do apoio (0,2 cm; passam 0,7 cm da borda de dentro), mãos na barra (0). A medida 1 não acha nada nas duas vistas.

### `triceps-maquina` (lateral, três quartos)

Nada encontrado. Os braços nas metades do apoio (−0,9), o glúteo no assento (−1,0), a lombar no apoio de trás (−0,3), mãos nos pegadores (0); a medida 1 não acha nada.

### `panturrilha-sentada` (lateral, três quartos)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| o ciclo todo | os dois | a almofada não encosta nas coxas e o glúteo não encosta no assento | na pele desenhada, a almofada fica 0,5 cm acima das coxas e o glúteo 0,5 cm acima do assento (o relatório do lote diz que os dois afundam 1 cm) | a conta do "afunda" mede a pele de outro jeito que o desenho | pequeno |
| três quartos, meio e fim | esquerdo (de longe) | a almofada pintada sobre a borda da coxa de longe | 2 de 11 anéis | ordem de pintura | pequeno |

Medido e certo: a bola dos pés na borda do degrau (0,0), mãos no pegador.

### `panturrilha-em-pe-maquina` (lateral, três quartos de trás)

Nada que apareça. Os ombros ficam sob as almofadas (0,3 cm no começo, −0,4 no fim, dentro da largura) e as solas no degrau (0,0). A medida 1 marca 1 a 3 anéis na linha de contato do ombro com a almofada (a borda de uma sobre a outra), o que não aparece.

### `abdominal-declinado` (lateral, três quartos)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| lateral, erro "Puxar o pescoço" (u=1) | — | o estofado do banco pintado sobre a borda de baixo do tronco ([05](auditoria-fase-c/05-abdominal-declinado-erro-pescoco-banco-sobre-o-tronco.png)) | 6 de 13 anéis do tronco; o tronco fica 2,4 cm acima do estofado | de lado, banco e tronco têm a mesma profundidade (0,0): a ordem vira no erro | médio |
| três quartos, o ciclo todo | esquerdo (de longe) | o rolo dos pés pintado sobre o peito do pé de longe | 4 de 20 anéis | ordem de pintura | pequeno |
| três quartos, começo | — | o estofado sobre a nuca | 4 de 17 anéis da cabeça (a cabeça deitada no banco, 0,0) | ordem de pintura | pequeno |

Medido e certo: costas no banco (o banco tem 29,2 cm e as costas passam 4,2 cm de cada lado), canelas e pés nos rolos dos dois lados (−1,0 a −0,2, dentro do comprimento).

### `hiperextensao` (lateral, três quartos)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| fim (u=1) | — | o tronco entra nas almofadas do quadril | 2,5 cm (no limite da tolerância) | a dobra do quadril embaixo | pequeno |

Medido e certo: as solas na chapa (0,0), a frente das coxas nas duas almofadas (0,2 cm); a medida 1 não acha nada (os rolos dos tornozelos não estão entre as caixas da conferência; no desenho, encostam atrás dos tornozelos).

### `agachamento-barra`, `agachamento-smith` (lateral, frontal)

Nada encontrado. A barra encosta na pele das costas (0,0 e −0,3 cm) no ciclo e em todos os erros, as mãos no eixo da barra (0), os pés no chão (a conferência).

### `supino-barra`, `supino-smith` (lateral, de cima)

Nada encontrado. Costas e glúteo no banco, mãos no eixo da barra (0), a barra no peito embaixo (0,0 e 0,5 cm). No `supino-smith`, erro "Banco fora do lugar", a barra fica 1,9 cm acima da pele embaixo (é o erro).

### `desenvolvimento-barra` (frontal, lateral)

Nada encontrado. Mãos no eixo da barra (0) no ciclo e nos três erros; em cima, a barra sobre a cabeça.

### `panturrilha-leg-press` (lateral; em revisão)

Nada encontrado. As solas na chapa (0,0), a bacia no encosto (−1,0), a bola do pé na borda da chapa; a medida 1 não acha nada.

### `coice-maquina` (lateral, três quartos; em revisão)

| vista e instante | lado | o que está errado | medida | causa provável | |
|---|---|---|---|---|---|
| três quartos, meio e fim | esquerdo (a perna de apoio, de longe) | a joelheira pintada sobre a coxa de apoio, junto do joelho ([07](auditoria-fase-c/07-pequenos.png)) | 3 de 11 anéis; o joelho encosta na joelheira (0,0) | ordem de pintura | pequeno |
| lateral, erro "Arquear a lombar" (u=1) | os dois braços | o antebraço, o braço e a mão entram nas almofadas dos braços | 3,2 cm (antebraço), 2,6 (braço), 3,1 (mão) | no erro o tronco desce sobre os apoios | pequeno |

Medido e certo: a sola na plataforma da alavanca (−0,3, como a conferência), mãos nos pegadores, joelho de apoio na joelheira.

# Auditoria das animações das fases A e B (motor novo), 18/11/2026

Auditoria visual e medida, feita do zero, das 42 animações da fase A e das 5 da fase B, procurando erros do tipo que o Gustavo achou na `rosca-scott` da fase C (o braço de longe fora da almofada, de três quartos): contato, proporção e detalhe, nos dois lados do corpo. Nada foi corrigido: este documento só acha, mede e relata. Base: `88fbbb9`.

**Resultado.** As 47 passam hoje na conferência automática (`node scripts/animacao-nova/conferir.mjs <id>`: 0 falha em todas). Mesmo assim, achei **8 graves** (em 8 exercícios, 4 deles com a mesma falha da vista de cima), **10 médios** e um punhado de pequenos. Nenhum deles é pego pela conferência automática: quase todos são de **ordem de pintura** (uma peça pintada por cima de uma parte do corpo que está na frente dela, ou o contrário) ou de **vista de cima** (a cabeça some), que a conferência não mede.

Os recortes estão em [`auditoria-fases-a-b/`](auditoria-fases-a-b/).

## 1. Como foi feito

**Quadros.** Para cada exercício, cada vista que o guia mostra (as de `vistas` mais as vistas dos erros, como `vistasDoGuia` em `src/engine/novo/ponte.ts`), no começo, no meio e no fim da primeira fase com movimento (na caminhada lateral, que tem 16 fases, também em 30%, 45%, 60% e 80% do ciclo), e cada erro na vista e no instante dele. Os quadros saem de `svgDaCena` com o equipamento realista, como no app (440 px por quadro; zoom de 700 a 1000 px onde havia suspeita). Olhei todas as folhas, procurando o braço e a perna de longe.

**Medidas.** Quatro scripts de rascunho (em `.rascunho/` da cópia de trabalho, fora do repositório), sobre o esqueleto e as peças que o motor calcula em cada quadro (`ex.quadro(corpo, u, erro)`, `formaDoBoneco`, `q.prims`, `q.marcas`):

1. **Contato e travessia** (9 instantes do ciclo e cada erro em u = 0; 0,5; 1 e no instante dele): quanto cada parte do corpo, por lado, entra em cada caixa (banco, encosto, assento, colchonete, barra); para cada membro que encosta numa caixa (até 1,5 cm), onde o eixo dele cai em relação à borda da largura; quanto cada peça (halter, kettlebell, barra, corda) e cada fio (cabo, elástico, fita) entra no corpo, fora as mãos; quanto um membro entra em outra parte do corpo (fora as juntas); o ponto mais baixo de cada pé; a junta mais perto de cada marca do quadro (pegada no halter, no pegador, na barra).
2. **Ordem de pintura, medida por pixel** (cada vista do guia, u = 0; 0,5; 1): de cada ponto da pele virado para quem olha, lanço um raio até a câmera; se nada do corpo nem das peças está no caminho, o ponto tem de aparecer. Pinto o quadro com o corpo de perto em vermelho, o de longe em verde e o contorno em azul, e leio o pixel: se ali está outra cor, alguma coisa foi pintada por cima do corpo. O mesmo ao contrário para os fios e para o eixo das peças: o trecho que o corpo esconde não pode aparecer.
3. **Chão e sola:** nenhuma peça abaixo do chão; o elástico que passa no chão fica embaixo de uma sola.
4. **Rótulos:** linhas-guia que se cruzam, em 24 instantes do ciclo de cada vista.

**Limites.** O teste de pintura dá falso alarme de perfil quando dois objetos iguais se sobrepõem na tela (o halter de longe atrás do de perto, as duas fitas da mini-band): esses casos eu conferi a olho e descartei. As medidas usam as peças simples da conferência (`prims`); onde o desenho realista tem partes que elas não têm (as travessas da cadeira, a estrutura das paralelas), a conclusão vem do quadro e da ordem dos itens.

**O que vale para todas, salvo o que a tabela do exercício disser:** os pés que apoiam ficam a 0,0 cm do chão em todo o ciclo; a mão fica a 0,0 cm da pegada do objeto (halter, pegador, barra, estribo); nenhuma peça fica abaixo do chão; nenhuma parte do corpo entra mais de 2,5 cm numa caixa; nenhuma peça entra mais de 1 cm no corpo fora as mãos; o teste de pintura não achou pele coberta além do ruído de borda (até 5 pontos de antisserrilhado, e a mão coberta pela pegada que ela segura).

## 2. Graves e médios

"Lado": R = direito, L = esquerdo; "de perto" e "de longe" são na vista citada.

| # | id | vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|---|---|
| G1 | `coice-elastico` | três quartos de trás, todo o ciclo | os dois | O colchonete é pintado por cima do corpo: cobre os joelhos, as canelas, os pés e as mãos que estão em cima dele. | Item do colchonete com profundidade −8,9, pintado depois de todos os itens do corpo (−43,1 a −19,5). Pele que deveria aparecer e mostra a cor do colchonete (#b2b8bf), em u = 0: coxa R 6 pontos, canela R 9, pé R 17, antebraço R 10, mão R 10, pé L 13, antebraço L 9, mão L 7. O joelho L está sobre o colchonete, dentro das bordas (x = 8,4 de 25; z = −11,4 de 50). | O colchonete é um item só, ordenado pelo centro; de três quartos de trás o centro dele fica mais perto da câmera que o do corpo. | grave | [01](auditoria-fases-a-b/01-coice-elastico-tresquartos-tras-colchonete-por-cima.png) |
| G2 | `coice-caneleira` | três quartos, todo o ciclo | L (perna de apoio, de longe) | O colchonete cobre o joelho e o começo da canela da perna de apoio: a coxa entra embaixo da borda do colchonete e o joelho some. | Pele que deveria aparecer e mostra a cor do colchonete: coxa L 10 pontos, canela L 6 a 8, em u = 0; 0,5; 1. Joelho L sobre o colchonete, dentro das bordas (local [8,4; 5,8; −11,4], meias [25; 0,8; 50]). Ordem: corpo de longe (−15,7) → colchonete (6,5). | A mesma do G1. | grave | [02](auditoria-fases-a-b/02-coice-caneleira-tresquartos-joelho-de-apoio-sob-o-colchonete.png) |
| G3 | `elevacao-lateral-unilateral-elastico` | de cima, todo o ciclo | o meio | A cabeça some: de cima só aparece um calombo na frente dos ombros (o rosto). | Topo da cabeça a 172,1 cm, 11,1 cm acima do topo do tronco (161,0). A cabeça (x ±8,6; z 7,9 a 27,6) fica dentro da silhueta do tronco e dos ombros (x ±18,8; z −7,9 a 19,8), salvo os 7,8 cm da frente. | O Boneco tem um contorno só, por fora; a cabeça não ganha contorno próprio. O `vies.cabeca` que resolve isso (acréscimo de 18/11, usado na fase C) está desligado por padrão e não foi ligado aqui. | grave | [03a](auditoria-fases-a-b/03a-elevacao-lateral-unilateral-elastico-de-cima-sem-cabeca.png) |
| G4 | `abertura-elastico` | de cima (a primeira vista), todo o ciclo | o meio | A cabeça some por completo. | Cabeça x ±8,6, z −4,8 a 15,0, inteira dentro da silhueta do tronco (x ±18,8; z −9,7 a 16,2); topo da cabeça 12,8 cm acima do topo do tronco. | A mesma do G3. | grave | [03b](auditoria-fases-a-b/03b-abertura-elastico-de-cima-sem-cabeca.png) |
| G5 | `elevacao-lateral-unilateral` | de cima, todo o ciclo | o meio | A cabeça some (sobra o calombo do rosto). | Cabeça x −15,9 a 2,8, z 5,7 a 25,3; tronco x −17,8 a 22,6, z −9,8 a 17,8; sai 7,5 cm na frente. Topo da cabeça 10,3 cm acima do tronco. | A mesma do G3. | grave | [03c](auditoria-fases-a-b/03c-elevacao-lateral-unilateral-de-cima-sem-cabeca.png) |
| G6 | `elevacao-lateral-caneleira` | de cima, todo o ciclo | o meio | A cabeça some (sobra o calombo do rosto). | Cabeça x ±8,6, z 6,6 a 26,3; tronco x ±18,8, z −9,2 a 18,5; sai 7,8 cm na frente. Topo da cabeça 11,2 cm acima do tronco. | A mesma do G3. | grave | [03d](auditoria-fases-a-b/03d-elevacao-lateral-caneleira-de-cima-sem-cabeca.png) |
| G7 | `crucifixo-polia-baixo` | lateral, todo o ciclo | os dois cabos | Os cabos terminam no ar: as colunas de polia não aparecem de lado, e o cabo acaba perto do chão, no meio do quadro, sem roldana. | A saída do cabo fica a 23,8 a 25,6 cm do chão e a 85 cm da borda esquerda do quadro (quadro de 266 cm de largura). As duas colunas estão marcadas `cenario: true`. | `equipamento.ts` não desenha a coluna que é cenário quando a vista é de perfil (`if (p.cenario && dePerfil) return`); aqui a coluna é o equipamento do exercício, e o cabo continua indo até ela. | grave | [04](auditoria-fases-a-b/04-crucifixo-polia-baixo-lateral-cabos-terminam-no-ar.png) |
| G8 | `remada-barra` | três quartos de trás, fim da puxada (u = 1) | os dois | A barra, que está na frente da barriga, é pintada por cima do quadril e das coxas: parece passar por trás da pessoa. | 13 pontos do eixo da barra que o corpo esconde (o raio até a câmera atravessa o tronco em 7, a coxa R em 3 e a coxa L em 3) aparecem com a cor do aço (#d1d5dc). | A barra longa é um item só, ordenado pelo centro. | grave | [05](auditoria-fases-a-b/05-remada-barra-tresquartos-tras-barra-por-cima-do-quadril.png) |
| M1 | `crucifixo-halteres` | três quartos, todo o ciclo | R (perna de perto) | A canela e o pé de perto ficam atrás do pé (poste e travessa) do banco, embora estejam na frente dele. | Tornozelo R em z = 61,7 e bola em z = 74,3, de 19 a 32 cm à frente da travessa do pé do banco (z = 42,6); profundidade do tornozelo 51,5 contra 24,3 da travessa (27 cm mais perto da câmera). Pele coberta pela cor da travessa (#34393f): canela R 6 pontos, pé R 7. | Ordem dos itens do banco realista contra a perna. (O app abre os crucifixos de cima; de três quartos é a segunda vista.) | médio | [06](auditoria-fases-a-b/06-crucifixo-halteres-tresquartos-pe-do-banco-sobre-a-perna-de-perto.png) |
| M2 | `mergulho` | lateral, todo o ciclo | os dois (pernas) | As pernas, que ficam entre as paralelas, aparecem na frente da coluna da paralela de perto. | Coluna da paralela R em x = −25,4 (profundidade 25,4); joelho R a 6,2: a coluna está 19 cm mais perto da câmera e a canela (início) e a coxa e a canela (embaixo) cruzam por cima dela. | A estrutura das paralelas vai na camada de cenário (0,4), pintada antes do corpo inteiro. | médio | [07](auditoria-fases-a-b/07-mergulho-lateral-pernas-na-frente-da-coluna-de-perto.png) |
| M3 | `goblet-kettlebell` | lateral, embaixo (u = 1) | R (joelho de perto) | O kettlebell, que fica entre os joelhos, é pintado por cima do joelho de perto. | Centro do kettlebell em x = 0 (profundidade 0, raio 10,4); joelho R em x = −17,6 (profundidade 17,6). Na tela, o centro do joelho fica a 7,6 cm do centro do kettlebell, dentro do raio. Pele da coxa R e da canela R coberta pela cor do ferro (#1c1e22): 7 e 8 pontos. O item do kettlebell empata com o do corpo (d = 0,0) e vem depois. | Empate de profundidade entre o kettlebell e o corpo. | médio | [08](auditoria-fases-a-b/08-goblet-kettlebell-lateral-kettlebell-por-cima-do-joelho.png) |
| M4 | `remada-unilateral-elastico` | três quartos e lateral, todo o ciclo | L (mão de apoio) | A mão de apoio fica dentro da coxa, perto do joelho, em vez de pousar nela: de três quartos só aparece um pedaço da mão solto na frente do joelho. | O centro da pegada L fica a 2,3 cm do eixo da coxa L, a 40% do raio dela (semi-eixos 5,2 a 6,2 cm): uns 3,7 cm para dentro da pele. O antebraço L entra 6,3 cm na coxa (6,4 no erro "gira"). | A posição da mão de apoio não leva em conta o volume da coxa. | médio | [09](auditoria-fases-a-b/09-remada-unilateral-elastico-tresquartos-mao-de-apoio-dentro-da-coxa.png) |
| M5 | `extensao-joelho-mini-band` | três quartos e lateral | rótulos | As linhas-guia de "a perna parada segura" e "estique até o fim" se cruzam: cada rótulo fica ao lado do ponto do outro, e "a perna parada segura" parece apontar para o pé que sobe. | Cruzam em 16 de 24 instantes do ciclo de três quartos e em 8 de 24 de lado. (Os pontos estão certos: `ponta:L` e `ponta:R`.) | A disposição dos rótulos não evita o cruzamento; a regra 15 do guia pede rótulos que não se sobreponham. | médio | [10](auditoria-fases-a-b/10-extensao-joelho-mini-band-tresquartos-linhas-dos-rotulos-cruzadas.png) |
| M6 | `triceps-barra-reta` | lateral, erro "Usar o tronco", u = 1 | o meio | O cabo atravessa a cabeça e o peito do corpo errado. | O cabo entra 7,8 cm na cabeça, 3,7 cm no tronco e 3,6 cm na cintura. | A pose do erro inclina o tronco para a frente sem desviar a cabeça da linha do cabo. | médio | [11](auditoria-fases-a-b/11-triceps-barra-reta-erro-tronco-cabo-atravessa-a-cabeca.png) |
| M7 | `puxada-barra-reta` | três quartos de trás, erro "Puxar pela nuca", u = 1 | o meio | O cabo atravessa a cabeça para chegar à barra atrás da nuca. | O cabo entra 3,9 cm na cabeça e 2,6 cm no pescoço; a fita do engate, 1,6 cm no pescoço. | A pose do erro não adianta a cabeça para dar passagem ao cabo. | médio | [12](auditoria-fases-a-b/12-puxada-barra-reta-erro-nuca-cabo-atravessa-a-cabeca.png) |
| M8 | `rosca-polia-costas` | lateral, erro "Trazer o cotovelo para a frente", u = 1 | R | O cabo atravessa o braço que trabalha. | O cabo entra 4,5 cm no braço R. | A pose do erro leva o braço para a linha do cabo. | médio | [13](auditoria-fases-a-b/13-rosca-polia-costas-erro-cotovelo-cabo-atravessa-o-braco.png) |
| M9 | `rosca-concentrada` | lateral, embaixo (u = 0) | R (canela de perto) | O halter, que pende entre as pernas, é pintado por cima da canela de perto. | A cabeça de perto do halter vai de x = −8,8 a −14,1 (raio 5,1); o tornozelo R fica em x = −32,7: a canela está de 13 a 18 cm mais perto da câmera. 4 pontos do eixo do halter escondidos pela canela R aparecem. | O halter é um item só, que vence a canela na ordem. | médio | [14](auditoria-fases-a-b/14-rosca-concentrada-lateral-halter-na-frente-da-canela.png) |
| M10 | `pull-through` | lateral, começo e meio (u = 0 e 0,5) | R (coxa de perto) | A corda, que passa entre as pernas, é pintada por cima da coxa de perto. | 12 (u = 0) e 14 (u = 0,5) pontos do eixo da corda escondidos pela coxa R aparecem (#2e3237). | A corda é pintada depois da perna de perto. | médio | [15](auditoria-fases-a-b/15-pull-through-lateral-corda-por-cima-da-coxa.png) |

## 3. Por exercício

### Fase A

#### `rosca-scott-banco-inclinado` (lateral, três quartos)
Nada encontrado. É o caso mais parecido com o da fase C, e por isso medi o braço no encosto: o braço R inteiro fica dentro da largura do encosto em todo o ciclo (x de 4,2 a 13,8 cm do meio, meia largura 14,3; 0,5 cm de folga até a borda), amassa 1,0 cm o estofado, e o eixo dele fica 5,3 cm para dentro da borda. O braço L pende fora do banco sem entrar nele. Pés no chão, halter a 0,0 cm da pegada.

#### `crucifixo-halteres` (de cima, três quartos; erros também de frente)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos, todo o ciclo | R | ver M1: canela e pé de perto atrás do pé do banco | 27 cm mais perto da câmera; 6 + 7 pontos cobertos | ordem dos itens do banco | médio | [06](auditoria-fases-a-b/06-crucifixo-halteres-tresquartos-pe-do-banco-sobre-a-perna-de-perto.png) |
| três quartos | rótulo | "cotovelos fixos" aponta para o punho R, não para o cotovelo | `ponto: punho:R` | escolha do ponto | pequeno | |

Medido também: o braço encosta 1,6 cm no estofado com o eixo 2,2 cm além da borda (o ombro na beira do banco, como é). Banco de 30,5 cm de largura para um tronco de 37,6 cm: proporção real.

#### `crucifixo-inverso` (por trás, três quartos de trás)
Nada encontrado. O peito fica a 24,7 a 25,2 cm da ponta do encosto (marca `pontaDoEncosto`) e as coxas passam dos dois lados do encosto (eixo 3,5 cm além da borda da largura).

#### `triceps-testa-halteres` (três quartos, lateral; erros também de cima)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos, todo o ciclo | o meio | o colchonete cobre a borda de baixo do glúteo e das costas | 8 pontos da pelve com a cor do colchonete | a mesma ordem do G1, em escala pequena | pequeno | |
| de cima, erro "Ir até a falha", u = 1 | os dois | a cabeça do halter entra na cabeça | 3,3 cm (escondido de cima) | a pose do erro | pequeno | |
| todas | proporção | o colchonete (100 × 50 cm, medida provisória da tabela) vai só da cabeça ao quadril; as pernas ficam no chão | pés de 46 a 66 cm além da ponta | medida provisória | pequeno | |

#### `crucifixo-inclinado-halteres` (de cima, três quartos; erro também de lado)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos, todo o ciclo | R | a travessa da frente do banco cobre a ponta do pé de perto | pé R a profundidade 40,7, travessa a 21,6 (19 cm mais longe); 9 pontos do pé R com a cor da ponteira (#15171a) | ordem dos itens do banco | pequeno | [16a](auditoria-fases-a-b/16a-crucifixo-inclinado-halteres-tresquartos-pe-do-banco-sobre-o-pe.png) |
| lateral (só no erro), todo o ciclo | R | a travessa de baixo do banco cobre o calcanhar de perto | calcanhar R a profundidade 19,5, travessa até 3,8; 9 pontos (#5c626c) | ordem dos itens do banco | pequeno | [19](auditoria-fases-a-b/19-crucifixo-inclinado-halteres-lateral-travessa-sobre-o-calcanhar.png) |
| três quartos | rótulo | "cotovelos levemente dobrados" aponta para o punho R | `ponto: punho:R` | escolha do ponto | pequeno | |

#### `supino-chao-halteres` (lateral, de cima; erro também de frente)
Nada encontrado. No fim da descida o braço chega ao chão fora do colchonete (que tem 50 cm de largura), como no exercício. O colchonete provisório de 100 cm deixa as pernas no chão (ver `triceps-testa-halteres`).

#### `triceps-elastico-alto` (lateral, por trás)
Nada encontrado. No erro "Jogar o tronco", o elástico passa rente ao peito sem entrar nele mais de 0,8 cm (o limite de alarme da medida). A âncora fica no alto da porta, fora do quadro de lado.

#### `abducao-elastico` (de frente, por trás)
Nada encontrado. A mão L encosta na parede a 0,0 cm (o ponto da mão mais perto da parede fica em x = 72,8, a face da parede). O pé que abre sobe até 6,6 cm (12,3 no erro). A ponta solta do elástico fica no chão, de propósito.

#### `elevacao-lateral-unilateral-elastico` (de frente, de cima; erros também de três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| de cima, todo o ciclo | o meio | ver G3: a cabeça some | topo 11,1 cm acima do tronco, cabeça dentro da silhueta salvo 7,8 cm | `vies.cabeca` desligado | grave | [03a](auditoria-fases-a-b/03a-elevacao-lateral-unilateral-elastico-de-cima-sem-cabeca.png) |

O elástico passa embaixo do pé L (a ponta com o pegador fica no chão, de propósito).

#### `rosca-martelo-elastico` (lateral, de frente)
Nada encontrado. O elástico passa embaixo das solas (até 0,6 cm de folga). O teste de pintura acusou de lado o elástico de longe "por cima" da perna de longe: é o elástico de perto, no mesmo lugar da tela (falso alarme).

#### `coice-elastico` (lateral, três quartos de trás; erro também por trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos de trás, todo o ciclo | os dois | ver G1: o colchonete por cima do corpo | colchonete d = −8,9 depois do corpo; até 17 pontos por parte | colchonete ordenado pelo centro | grave | [01](auditoria-fases-a-b/01-coice-elastico-tresquartos-tras-colchonete-por-cima.png) |
| lateral, todo o ciclo | L (pé de apoio) | o pé de apoio fica além da ponta do colchonete, no ar | tornozelo 3,5 cm além da ponta, bola 17,5, ponta do pé 24,4; o ponto mais baixo do pé fica a 1,7 cm do chão, na altura do colchonete, sem nada embaixo | colchonete de 100 cm (medida provisória) curto para a posição de quatro apoios | pequeno | [18](auditoria-fases-a-b/18-coice-elastico-lateral-pe-de-apoio-alem-do-colchonete.png) |
| por trás (só no erro "Girar o quadril") | os dois | a borda do colchonete cobre os antebraços | 5 a 6 pontos | mesma ordem do G1 | pequeno | |
| lateral, u = 1 | R | o elástico entra no antebraço | 1,9 cm | o elástico vai reto da mão ao pé | pequeno | |

#### `abertura-elastico` (de cima, por trás; erro também de três quartos)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| de cima (a primeira vista), todo o ciclo | o meio | ver G4: a cabeça some por completo | cabeça inteira dentro da silhueta do tronco | `vies.cabeca` desligado | grave | [03b](auditoria-fases-a-b/03b-abertura-elastico-de-cima-sem-cabeca.png) |

#### `remada-curvada-elastico` (lateral, três quartos de trás)
Nada encontrado. Elástico embaixo das solas (0,6 cm); de lado, o elástico de longe coincide na tela com o de perto (falso alarme do teste de pintura).

#### `remada-unilateral-elastico` (lateral, três quartos)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos e lateral, todo o ciclo | L | ver M4: a mão de apoio dentro da coxa | pegada a 2,3 cm do eixo da coxa (40% do raio); antebraço 6,3 cm dentro | posição da mão sem o volume da coxa | médio | [09](auditoria-fases-a-b/09-remada-unilateral-elastico-tresquartos-mao-de-apoio-dentro-da-coxa.png) |

No erro "Pisar só com a ponta do pé", a coxa L entra 5,9 cm no tronco (encolhida contra a barriga; escondido pela pintura): pequeno.

#### `extensao-joelho-mini-band` (três quartos, lateral)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos e lateral | rótulos | ver M5: as linhas-guia se cruzam | 16/24 e 8/24 instantes | disposição dos rótulos | médio | [10](auditoria-fases-a-b/10-extensao-joelho-mini-band-tresquartos-linhas-dos-rotulos-cruzadas.png) |

Medido também: as mãos no assento (1,5 cm de amassado, 15,6 cm para dentro da borda), a coxa de apoio no assento, a faixa a 7,0 cm dos tornozelos. A faixa desenhada como um anel por cima da canela é a leitura certa de uma mini-band (o teste de pintura acusa o trecho de trás, sem efeito visível).

#### `abducao-deitado-mini-band` (de frente, de cima; erro também de três quartos)
Nada encontrado nas vistas do movimento certo. No erro "Rolar o quadril para trás", o braço R entra 8,4 cm no tronco e o antebraço 4,9 cm (a pintura esconde): pequeno. De cima, a perna que abre sobe na direção de quem olha e o movimento quase não se vê; é a escolha da vista, não um erro de desenho.

#### `caminhada-lateral-mini-band` (três quartos, de frente, três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| de frente e três quartos | rótulo | "mini-band sempre esticada" aponta para o joelho L, abaixo da faixa | a faixa fica 8,0 cm acima do centro do joelho; na tela, o ponto cai na coxa, 11 px abaixo da faixa (quadro de 440 px) | `ponto: joelho:L` | pequeno | |

Medido em 4 instantes a mais do ciclo (30%, 45%, 60%, 80%): os pés só saem do chão no passo; a faixa a 8,0 cm dos joelhos.

#### `afundo-tras` (lateral, de frente)
Nada encontrado. O pé de trás sobe até 8,7 cm no passo; halteres a 27,6 cm do chão no ponto mais baixo (erro "Passo curto"). De lado, o halter de longe coincide com o de perto (falso alarme).

#### `crucifixo-invertido-curvado` (três quartos de trás, por trás; erro também de lado)
Nada encontrado. De lado (só no erro), o halter de perto passa na frente do rosto na subida: está mesmo mais perto da câmera.

#### `triceps-frances-unilateral-halter` (lateral, de frente)
Nada encontrado. De frente, no começo, o halter fica atrás da cabeça e não aparece: é a geometria (a cabeça está na frente).

#### `desenvolvimento-unilateral` (de frente, lateral)
Nada encontrado.

#### `agachamento-halteres` (lateral, de frente)
Nada encontrado. Halteres a 2,5 cm do chão no ponto mais baixo (erro "Tronco cai para a frente"); de lado, sobreposição dos dois halteres (falso alarme).

#### `elevacao-lateral-unilateral` (de frente, de cima)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| de cima, todo o ciclo | o meio | ver G5: a cabeça some | topo 10,3 cm acima do tronco, cabeça dentro da silhueta salvo 7,5 cm | `vies.cabeca` desligado | grave | [03c](auditoria-fases-a-b/03c-elevacao-lateral-unilateral-de-cima-sem-cabeca.png) |

A mão L encosta na parede a 0,0 cm.

#### `stiff-unilateral-kettlebell` (lateral, três quartos de trás)
Nada encontrado. Embaixo, de lado, o kettlebell (na mão L, em x = 0) fica corretamente atrás da canela de apoio R (x = −11,7). No começo do ciclo, o antebraço L entra 3,2 cm na cintura (escondido): pequeno.

#### `desenvolvimento-em-pe-halteres` (de frente, lateral)
Nada encontrado.

#### `goblet-kettlebell` (lateral, de frente)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, embaixo | R | ver M3: o kettlebell por cima do joelho de perto | joelho 17,6 cm mais perto da câmera; 7 + 8 pontos cobertos | empate de profundidade | médio | [08](auditoria-fases-a-b/08-goblet-kettlebell-lateral-kettlebell-por-cima-do-joelho.png) |

No erro "Tronco tomba", os antebraços entram 5,5 cm nas coxas e os braços 4,9 cm (pouco visível): pequeno. A marca do kettlebell fica a 6,2 cm da mão porque é o centro do sino, não a alça.

#### `crucifixo-invertido-sentado` (três quartos de trás, de cima)
Nada encontrado. A pelve assenta 1,0 cm no assento; as coxas passam da borda da frente do assento, como devem. De cima, a cabeça aparece (o tronco está deitado sobre as coxas).

#### `rosca-concentrada` (de frente, lateral)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, embaixo | R | ver M9: o halter por cima da canela de perto | canela 13 a 18 cm mais perto da câmera | ordem do halter | médio | [14](auditoria-fases-a-b/14-rosca-concentrada-lateral-halter-na-frente-da-canela.png) |
| lateral | rótulo | "só o cotovelo mexe" aponta para o punho | `ponto: punho` | escolha do ponto | pequeno | |

Medido também: o braço R encosta na coxa R (0,6 cm entre as peles em todo o ciclo); a pelve no assento (1,0 cm). De frente, a cadeira aparece entre as pernas, atrás delas (ordem certa).

#### `elevacao-lateral-deitado` (de frente, de cima; erro também de três quartos)
Nada encontrado. O pé de cima descansa sobre o de baixo (11,4 cm do chão); o halter fica a 0,7 cm do chão no começo.

#### `coice-caneleira` (lateral, três quartos; erro também por trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos, todo o ciclo | L | ver G2: o colchonete cobre o joelho de apoio | 10 + 8 pontos cobertos | colchonete ordenado pelo centro | grave | [02](auditoria-fases-a-b/02-coice-caneleira-tresquartos-joelho-de-apoio-sob-o-colchonete.png) |
| lateral, todo o ciclo | L | o pé de apoio além da ponta do colchonete, 1,7 cm no ar | as mesmas medidas do `coice-elastico` | colchonete curto | pequeno | |

A caneleira fica a 7,4 cm do tornozelo R, na canela.

#### `elevacao-lateral-caneleira` (de frente, de cima; erro também de lado)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| de cima, todo o ciclo | o meio | ver G6: a cabeça some | topo 11,2 cm acima do tronco, cabeça dentro da silhueta salvo 7,8 cm | `vies.cabeca` desligado | grave | [03d](auditoria-fases-a-b/03d-elevacao-lateral-caneleira-de-cima-sem-cabeca.png) |

As caneleiras ficam a 7,4 cm dos punhos, no antebraço.

#### `crucifixo-invertido-caneleira` (três quartos de trás, de cima)
Nada encontrado. Mesmas medidas do sentado com halter; caneleiras a 6,4 cm dos punhos.

#### `puxada-barra-reta` (lateral, três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos de trás, erro "Puxar pela nuca" | o meio | ver M7: o cabo atravessa a cabeça | 3,9 cm na cabeça, 2,6 no pescoço | pose do erro | médio | [12](auditoria-fases-a-b/12-puxada-barra-reta-erro-nuca-cabo-atravessa-a-cabeca.png) |

Ajoelhado: os pés ficam sobre o colchonete (1,7 cm, a espessura dele), dentro das bordas.

#### `triceps-barra-reta` (lateral, por trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, erro "Usar o tronco" | o meio | ver M6: o cabo atravessa a cabeça e o peito | 7,8 cm na cabeça, 3,7 no tronco | pose do erro | médio | [11](auditoria-fases-a-b/11-triceps-barra-reta-erro-tronco-cabo-atravessa-a-cabeca.png) |

#### `rosca-polia-costas` (lateral, três quartos)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, erro "Trazer o cotovelo para a frente" | R | ver M8: o cabo atravessa o braço | 4,5 cm | pose do erro | médio | [13](auditoria-fases-a-b/13-rosca-polia-costas-erro-cotovelo-cabo-atravessa-o-braco.png) |

#### `supino-inclinado-polia` (três quartos, de cima)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos, todo o ciclo | R | a travessa da frente do banco cobre a ponta do pé de perto | o mesmo banco e os mesmos pés do `crucifixo-inclinado-halteres`: 19 cm de diferença de profundidade; 7 pontos (#19181c) e 9 de borda | ordem dos itens do banco | pequeno | [16b](auditoria-fases-a-b/16b-supino-inclinado-polia-tresquartos-pe-do-banco-sobre-o-pe.png) |

No erro "Banco fora do meio", o cabo de longe encosta 1,6 cm no antebraço L: pequeno.

#### `crucifixo-polia-baixo` (de frente, lateral)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, todo o ciclo | os dois cabos | ver G7: os cabos terminam no ar | saída do cabo a 24-26 cm do chão, 85 cm dentro do quadro, sem coluna | coluna marcada como cenário, que não se desenha de perfil | grave | [04](auditoria-fases-a-b/04-crucifixo-polia-baixo-lateral-cabos-terminam-no-ar.png) |
| lateral | rótulos | a vista lateral não tem rótulo de técnica; o único rótulo fora o de frente é de uma vista que não existe mais (`cima`: "cotovelo no mesmo ângulo") | `rotulos` com `vista: 'cima'`, fora de `vistas` | sobra da troca de vista | pequeno | |

#### `pull-through` (lateral, três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, começo e meio | R | ver M10: a corda por cima da coxa de perto | 12 e 14 pontos | ordem da corda | médio | [15](auditoria-fases-a-b/15-pull-through-lateral-corda-por-cima-da-coxa.png) |
| três quartos de trás, começo | o meio | a corda por cima da pelve | 10 pontos | a mesma | pequeno | |
| todas, em pé | os dois | os antebraços entram 6,8 a 6,9 cm na pelve e na cintura, e os braços 5,6 cm no tronco | escondido pela pintura | as mãos no meio, na frente do púbis, sem desviar o antebraço do quadril | pequeno | |

#### `supino-polia` (três quartos de trás, de cima)
Nada encontrado. O braço encosta 1,6 cm no estofado com o eixo 2,2 cm além da borda (a beira do banco, como no crucifixo). No erro "Banco fora do meio", o cabo encosta 1,2 cm no antebraço L: pequeno.

#### `barra-fixa-negativa` (três quartos, por trás)
Nada encontrado de visível. As mãos fecham na barra (1,6 cm de amassado, 0,0 cm da marca). As canelas cruzadas entram 5,2 cm uma na outra perto do fim da descida (u = 0,88), sem efeito visível nas duas vistas: pequeno.

#### `mergulho` (lateral, de frente)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| lateral, todo o ciclo | os dois | ver M2: as pernas na frente da coluna da paralela de perto | coluna 19 cm mais perto da câmera que o joelho | estrutura na camada de cenário | médio | [07](auditoria-fases-a-b/07-mergulho-lateral-pernas-na-frente-da-coluna-de-perto.png) |

As mãos fecham nas paralelas (2,2 cm de amassado, 0,0 cm da marca).

#### `face-pull-suspensao` (três quartos de trás, lateral)
Nada encontrado. As fitas vão da âncora às mãos sem entrar no corpo; de três quartos de trás, a fita de longe passa por cima da cabeça sem cruzá-la.

### Fase B

#### `hip-thrust` (lateral, três quartos)
Nada encontrado. A barra fica a 4,4 a 4,8 cm da pele do quadril (raio da barra mais a almofada); os braços apoiam no banco (2,3 cm de amassado, eixo dentro da largura) e a parte alta das costas encosta na borda (eixo do tronco até 1,8 cm além dela, que é a borda em que se apoia). As anilhas têm 24 cm de diâmetro: embaixo, a barra fica a 45 cm do chão e a anilha a 33 cm, o que é escolha da tabela, não erro de desenho.

#### `terra-romeno-barra` (lateral, três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos de trás, embaixo | L | a barra aparece por cima da canela de longe, que deveria escondê-la | 4 pontos do eixo da barra | a barra é um item só (a mesma do G8) | pequeno | [17](auditoria-fases-a-b/17-terra-romeno-barra-tresquartos-tras-barra-por-cima-da-canela.png) |

A barra passa rente às pernas: 4,6 cm do eixo à pele da coxa em cima, 1,9 cm à canela embaixo (raio da barra 1,4).

#### `remada-barra` (lateral, três quartos de trás)
| vista e instante | lado | o que está errado | medida | causa provável | | imagem |
|---|---|---|---|---|---|---|
| três quartos de trás, fim da puxada | os dois | ver G8: a barra por cima do quadril e das coxas | 13 pontos | a barra é um item só | grave | [05](auditoria-fases-a-b/05-remada-barra-tresquartos-tras-barra-por-cima-do-quadril.png) |

No começo e no meio a ordem está certa (a barra some atrás das pernas).

#### `rosca-barra-w` (lateral, três quartos)
Nada encontrado. As mãos ficam nas partes inclinadas (6,0 cm das dobras); a barra pende a 6,3 cm da pele da coxa.

#### `terra-hexagonal` (três quartos, lateral)
Nada encontrado. As mãos ficam no meio dos cabos da barra (x = −31,8 contra −31,7 do cabo); as anilhas tocam o chão no começo (0,0 cm). De lado, a moldura de longe coincide com a de perto (falso alarme).

## 4. Causas comuns, para quem for corrigir

1. **Peça grande pintada como um item só, pelo centro.** O colchonete (G1, G2), a barra longa (G8, B17) e, em menor grau, as travessas dos bancos (M1, pequenos dos bancos inclinados), o halter (M9), a corda (M10) e o kettlebell (M3, empate). De três quartos o centro da peça pode ficar mais perto da câmera que o do corpo, embora o corpo esteja em cima dela ou na frente dela.
2. **Peça de cenário que é o equipamento do exercício.** As colunas do crucifixo na polia baixa (G7) somem de perfil; a estrutura das paralelas (M2) vai inteira para trás do corpo.
3. **Cabeça de cima.** O contorno único do Boneco engole a cabeça quando ela fica dentro da silhueta dos ombros (G3 a G6). A fase C já tem o remédio (`vies.cabeca`).
4. **Poses de erro que não desviam do cabo** (M6 a M8): a pose errada põe a cabeça ou o braço na linha do cabo.
5. **Contato sem o volume do membro** (M4): a mão de apoio vai a um ponto que fica dentro da coxa.
6. **Rótulos**: só um caso de linhas cruzadas (M5); alguns rótulos de cotovelo apontam para o punho (pequenos).
